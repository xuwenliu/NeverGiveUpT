import React, { useState, useRef, useContext, useEffect } from 'react';
import { Button, message, Form, Input, Popconfirm } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import moment from 'moment';
import { queryCategories, addCategories, removeCategories, updateCategories } from './service';
import { FormattedMessage, useIntl } from 'umi';

const EditableContext = React.createContext();

const Categories = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const actionRef = useRef();
  const intl = useIntl();

  const handleAdd = async (params) => {
    try {
      const res = await addCategories({ ...params });
      if (res.code === 0) {
        message.success(res.msg);
        return true;
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'categories.create_error_tip',
        }),
      );
      return false;
    }
  };

  const handleUpdate = async (params, actionRef) => {
    try {
      const res = await updateCategories({ id: params._id, name: params.name });
      if (res.code === 0) {
        message.success(res.msg);
        if (actionRef.current) {
          actionRef.current.reload();
        }
        return true;
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'categories.update_error_tip',
        }),
      );
      return false;
    }
  };

  const handleRemove = async (params, actionRef) => {
    try {
      const res = await removeCategories({ id: params._id });
      if (res.code === 0) {
        message.success(res.msg);
        if (actionRef.current) {
          actionRef.current.reload();
        }
        return true;
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'categories.remove_error_tip',
        }),
      );
      return false;
    }
  };

  let columns = [
    {
      title: intl.formatMessage({
        id: 'categories.name',
      }),
      dataIndex: 'name',
      editable: true,
      width: '30%',
      formItemProps: {
        placeholder: intl.formatMessage({
          id: 'articles.p_name',
        }),
        autoComplete: 'off',
      },
      rules: [
        {
          required: true,
          message: intl.formatMessage({
            id: 'categories.name_required',
          }),
        },
        {
          pattern: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
          message: intl.formatMessage({
            id: 'categories.name_pattern',
          }),
        },
      ],
    },
    {
      title: intl.formatMessage({
        id: 'common.articlesNum',
      }),
      dataIndex: 'articleNum',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: intl.formatMessage({
        id: 'common.createTime',
      }),
      dataIndex: 'createTime',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => moment(record.createTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: intl.formatMessage({
        id: 'common.updateTime',
      }),
      dataIndex: 'updateTime',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) =>
        record.updateTime === 0
          ? '-'
          : moment(record.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },

    {
      title: intl.formatMessage({
        id: 'common.action',
      }),
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      render: (_, record) => {
        return record.articleNum === 0 && !record.status ? (
          <Popconfirm
            placement="topLeft"
            title={intl.formatMessage(
              {
                id: 'categories.remove_tip',
              },
              {
                name: record.name,
              },
            )}
            onConfirm={() => handleRemove(record, actionRef)}
          >
            <a>
              <DeleteOutlined style={{ color: '#ff4d4f' }} />
            </a>
          </Popconfirm>
        ) : (
          <DeleteOutlined />
        );
      },
    },
  ];
  columns = columns.map((col) => {
    col.align = 'center';
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleUpdate,
      }),
    };
  });

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleUpdate,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
        inputRef.current.oldValue = record.name;
      }
    }, [editing]);

    const toggleEdit = () => {
      if (record.status) {
        return message.info(
          intl.formatMessage({
            id: 'categories.not_update',
          }),
        );
      } else {
        if (record.articleNum > 0) {
          return message.info(
            intl.formatMessage({
              id: 'categories.not_update_have_article',
            }),
          );
        }
      }
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const update = async (e) => {
      try {
        const values = await form.validateFields();
        if (inputRef.current.oldValue !== values.name) {
          handleUpdate({ ...record, ...values }, actionRef);
        }
        toggleEdit();
      } catch (error) {}
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                {
                  id: 'categories.p_input',
                },
                {
                  name: title,
                },
              ),
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={update} onBlur={update} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <PageHeaderWrapper>
      <ProTable
        actionRef={actionRef}
        rowKey="_id"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> <FormattedMessage id="categories.add" />
          </Button>,
        ]}
        request={(params, sorter, filter) => queryCategories({ ...params })}
        columns={columns}
        components={components}
        rowClassName={() => 'editable-row'}
      />

      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
    </PageHeaderWrapper>
  );
};

export default Categories;

import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Switch, Form, Input, Popconfirm } from 'antd';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import { queryTags, addTags, removeTags, updateTags, updateTagsStatus } from './service';
import { connect } from 'umi';

import './index.less';
import moment from 'moment';
const EditableContext = React.createContext();

const handleAdd = async (params) => {
  try {
    const res = await addTags({ ...params });
    if (res.code === 0) {
      message.success(res.msg);
      return true;
    }
  } catch (error) {
    message.error('添加失败请重试！');
    return false;
  }
};

const handleUpdate = async (params, actionRef) => {
  try {
    const res = await updateTags({ id: params._id, name: params.name });
    if (res.code === 0) {
      message.success(res.msg);
      if (actionRef.current) {
        actionRef.current.reload();
      }
      return true;
    }
  } catch (error) {
    message.error('修改失败请重试！');
    return false;
  }
};

const handleRemove = async (params, actionRef) => {
  try {
    const res = await removeTags({ id: params._id });
    if (res.code === 0) {
      message.success(res.msg);
      if (actionRef.current) {
        actionRef.current.reload();
      }
      return true;
    }
  } catch (error) {
    message.error('删除失败请重试！');
    return false;
  }
};

const handleupdateStatus = async (status, params, actionRef) => {
  try {
    const res = await updateTagsStatus({ id: params._id, status });
    if (res.code === 0) {
      message.success(res.msg);
      if (actionRef.current) {
        actionRef.current.reload();
      }
      return true;
    }
  } catch (error) {
    message.error('启用/停用失败请重试！');
    return false;
  }
}

const Tags = (props) => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const actionRef = useRef();

  // useEffect(() => {
  //   const { dispatch } = props;
  //   if (dispatch) {
  //     dispatch({
  //       type: 'tags/queryList',
  //     })
  //   }
  // }, [])

  let columns = [
    {
      title: 'ObjectId',
      dataIndex: '_id',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '标签名称',
      dataIndex: 'name',
      editable: true,
      width: '30%',
      rules: [
        {
          required: true,
          message: '标签名称为必填项',
        },
        {
          pattern: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
          message: '标签格式为: 2-20个_.中文大小写字母',
        }
      ],
    },
    {
      title: '文章数量',
      dataIndex: 'articleNum',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      hideInForm: true,

      render: (_, record) => {
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={record.status}
            onChange={(checked) => handleupdateStatus(checked, record, actionRef)}
          />
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => moment(record.createTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => record.updateTime === 0 ? '-' : moment(record.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return record.articleNum === 0 && !record.status ? (
          <Popconfirm
            placement="topLeft"
            title={`你确定删除标签【${record.name}】吗？`}
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
      if(record.status){
        return message.info('启用状态标签不能修改');
      }else {
        if( record.articleNum > 0){
          return message.info('该标签下有文章不能修改');
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
      if(inputRef.current.oldValue !== values.name){
        handleUpdate({ ...record, ...values }, actionRef);
      }
      toggleEdit();
      } catch (error) {
        console.log('修改失败:', error);
      }
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
              message: `${title}必填`,
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
            <PlusOutlined /> 添加
          </Button>,
        ]}
        request={(params, sorter, filter) => queryTags({ ...params })}
        columns={columns}
        // dataSource={props.list}
        components={components}
        rowClassName={() => 'editable-row'}
      />



      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            console.log('success', success)

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

export default connect(({ tags, loading }) => ({
  list: tags.list,
  queryList: loading.effects['tags/list'],
}))(Tags);


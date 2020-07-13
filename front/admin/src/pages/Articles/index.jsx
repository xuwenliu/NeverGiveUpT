import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  Button,
  Menu,
  message,
  Switch,
  Form,
  InputNumber,
  Popconfirm,
  Avatar,
  Tooltip,
  Badge,
  Tag,
  Select,
} from 'antd';
import {
  CloudDownloadOutlined,
  CloudUploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  ToTopOutlined,
} from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';

import { history } from 'umi';
import { randomColor } from '@/utils/utils';
import {
  queryArticles,
  updateArticlesStatus,
  updateArticlesPublishStatus,
  removeArticles,
  updateSort,
} from './service';
import { queryCategories } from '@/pages/Categories/service';
import { queryTags } from '@/pages/Tags/service';
import moment from 'moment';
const { Option } = Select;

import './index.less';

const Articles = () => {
  const actionRef = useRef();
  const EditableContext = React.createContext();
  const [categories, setCategories] = useState({});
  const [tags, setTags] = useState(['全部']);

  const loadTagsOrCategories = async (func) => {
    const res = await func();
    if (res.data) {
      let data = res.data.map((item) => item.name);
      if (func === queryCategories) {
        data = ['全部', ...data];
      }
      const obj = {};
      data.forEach((item) => {
        obj[item] = {
          text: item,
        };
      });
      if (func === queryTags) {
        setTags(obj);
      } else {
        setCategories(obj);
      }
    }
  };

  useEffect(() => {
    loadTagsOrCategories(queryTags);
    loadTagsOrCategories(queryCategories);
  }, []);

  /**
   *
   * @param {*} type 类型 1=添加 2=修改 3=预览
   * @param {*} id 修改和预览的文章id
   */
  const goEdit = (type, id) => {
    history.push(`/articles/${type}/${id ? id : 0}`);
  };

  const handleUpdateStatus = async (status, params, actionRef) => {
    try {
      const res = await updateArticlesStatus({ id: params._id, status: status ? 1 : 2 });
      if (res.code === 0) {
        message.success(res.msg);
        if (actionRef.current) {
          actionRef.current.reload();
        }
        return true;
      }
    } catch (error) {
      message.error('启用/停用文章失败请重试！');
      return false;
    }
  };

  const handlePublish = async (params, actionRef) => {
    try {
      const res = await updateArticlesPublishStatus({
        id: params._id,
        publishStatus: params.publishStatus === 1 ? 2 : 1,
      });
      if (res.code === 0) {
        message.success(res.msg);
        if (actionRef.current) {
          actionRef.current.reload();
        }
        return true;
      }
    } catch (error) {
      message.error('发布/取消发布文章失败请重试！');
      return false;
    }
  };

  const handleRemove = async (params, actionRef) => {
    try {
      const res = await removeArticles({
        id: params._id,
      });
      if (res.code === 0) {
        message.success(res.msg);
        if (actionRef.current) {
          actionRef.current.reload();
        }
        return true;
      }
    } catch (error) {
      message.error('删除文章失败请重试！');
      return false;
    }
  };

  const handleUpdateSort = async (params, actionRef) => {
    try {
      let postData = { id: params._id, sort: params.sort * 1, top: params.top };
      const res = await updateSort(postData);
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

  let columns = [
    {
      title: '标题',
      dataIndex: 'title',
      formItemProps: {
        placeholder: '请输入文章标题',
        autoComplete: 'off',
      },
      width: 100,
      fixed: 'left',
      render: (_, record) => {
        return (
          <Tooltip title={record.title}>
            <span>{record.title.slice(0, 10)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '封面',
      dataIndex: 'cover',
      hideInSearch: true,
      hideInForm: true,
      width: 100,
      render: (_, record) => {
        return <Avatar shape="square" src={record.cover} />;
      },
    },
    {
      title: '简介',
      dataIndex: 'introduction',
      hideInSearch: true,
      hideInForm: true,
      width: 100,
      render: (_, record) => {
        return (
          <Tooltip title={record.introduction}>
            <span>{record.introduction.slice(0, 10)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '分类',
      dataIndex: 'categories',
      width: 100,
      valueEnum: {
        ...categories,
      },
      initialValue: '全部',
      formItemProps: {
        placeholder: '请选择分类',
      },
    },
    {
      title: '标签',
      dataIndex: 'tags',
      width: 200,
      formItemProps: {
        placeholder: '请选择标签',
        mode: 'tags',
      },
      valueEnum: {
        ...tags,
      },
      renderFormItem: (_, { type, defaultRender, value, onChange, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        if (value) {
          value = value.join(',');
        }
        return defaultRender(_);
      },
      render: (_, record) => {
        if (record.tags.length > 0) {
          let result = [];
          for (let i = 0; i < record.tags.length; i += 3) {
            result.push(record.tags.slice(i, i + 3));
          }
          return result.map((item, index) => {
            return (
              <div style={{ marginBottom: 10 }} key={index}>
                {item.map((sub) => (
                  <Tag key={sub} color={randomColor()}>
                    {sub}
                  </Tag>
                ))}
              </div>
            );
          });
        }
      },
    },
    {
      title: '查看/评论/点赞/收藏',
      dataIndex: 'views',
      width: 200,
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => {
        return `${record.views}/${record.comment}/${record.like}/${record.collect}`;
      },
    },
    {
      title: '文章状态',
      dataIndex: 'status',
      hideInSearch: true,
      hideInForm: true,
      width: 100,
      render: (_, record) => {
        return (
          <Switch
            checkedChildren="启用"
            unCheckedChildren="停用"
            checked={record.status === 1}
            onChange={(checked) => handleUpdateStatus(checked, record, actionRef)}
          />
        );
      },
    },
    {
      title: '发布状态',
      dataIndex: 'publishStatus',
      hideInSearch: true,
      hideInForm: true,
      width: 100,
      render: (_, record) => {
        const text = record.publishStatus === 1 ? '已发布' : '未发布';
        return <Badge status={record.publishStatus === 1 ? 'success' : 'error'} text={text} />;
      },
    },
    {
      title: '权重',
      dataIndex: 'sort',
      hideInSearch: true,
      hideInForm: true,
      width: 100,
      editable: true,
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      hideInForm: true,
      width: 200,
      render: (_, record) => moment(record.createTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 200,
      render: (_, record) =>
        record.updateTime === 0
          ? '-'
          : moment(record.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      fixed: 'right',
      render: (_, record) => {
        return (
          <>
            {/* 发布和下线 */}
            <Popconfirm
              placement="topLeft"
              title={`你确定${record.publishStatus === 1 ? '取消发布' : '发布'}【${
                record.title
              }】吗？`}
              onConfirm={() => handlePublish(record, actionRef)}
            >
              <a style={{ marginRight: 10 }}>
                {record.publishStatus === 1 ? (
                  <CloudDownloadOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />
                ) : (
                  <CloudUploadOutlined style={{ fontSize: 20 }} />
                )}
              </a>
            </Popconfirm>

            {/* 预览 */}
            <a style={{ marginRight: 10 }}>
              <EyeOutlined
                style={{ color: '#52c41a', fontSize: 20 }}
                onClick={() => goEdit(3, record._id)}
              />
            </a>

            {/* 修改 */}
            {record.publishStatus === 2 && (
              <a style={{ marginRight: 10 }}>
                <EditOutlined style={{ fontSize: 20 }} onClick={() => goEdit(2, record._id)} />
              </a>
            )}

            {/* 删除 */}
            {record.publishStatus === 2 && (
              <Popconfirm
                placement="topLeft"
                title={`你确定删除文章【${record.title}】吗？`}
                onConfirm={() => handleRemove(record, actionRef)}
              >
                <a>
                  <DeleteOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />
                </a>
              </Popconfirm>
            )}
          </>
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
        handleUpdateSort,
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
    handleUpdateSort,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
        inputRef.current.oldValue = record.sort;
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const update = async (e) => {
      try {
        const values = await form.validateFields();
        if (inputRef.current.oldValue !== values.sort) {
          handleUpdateSort({ ...record, ...values }, actionRef);
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
          <InputNumber ref={inputRef} onPressEnter={update} onBlur={update} />
        </Form.Item>
      ) : (
        <>
          <div
            className="editable-cell-value-wrap"
            style={{
              paddingRight: 24,
            }}
            onClick={toggleEdit}
          >
            {children}
          </div>
          <ToTopOutlined
            onClick={() => handleUpdateSort({ ...record, top: true }, actionRef)}
            className="to-top"
          />
        </>
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
          <Button type="primary" onClick={() => goEdit(1)}>
            <PlusOutlined /> 新建文章
          </Button>,
        ]}
        request={(params, sorter, filter) => queryArticles({ ...params })}
        columns={columns}
        scroll={{ x: 1300 }}
        components={components}
        rowClassName={() => 'editable-row'}
      />
    </PageHeaderWrapper>
  );
};

export default Articles;

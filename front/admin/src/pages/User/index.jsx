import React, { useRef } from 'react';
import { Tooltip, message, Popconfirm, Avatar } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { queryUser, removeUser } from './service';

const handleRemove = async (params, actionRef) => {
  try {
    const res = await removeUser({ id: params._id });
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

const User = (props) => {
  const actionRef = useRef();

  let columns = [
    // {
    //   title: 'ObjectId',
    //   dataIndex: '_id',
    //   hideInSearch: true,
    //   hideInForm: true,
    // },
    {
      title: '昵称',
      dataIndex: 'nickName',
      formItemProps: {
        placeholder: '请输入昵称',
        autoComplete: 'off',
      },
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => {
        return <Avatar shape="square" src={record.avatar} />;
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '简介',
      dataIndex: 'introduction',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => {
        if (record.introduction.length > 20) {
          return (
            <Tooltip title={record.introduction}>
              <span>{record.introduction.slice(0, 20)}...</span>
            </Tooltip>
          );
        }
        return record.introduction;
      },
    },
    {
      title: '登录时间',
      dataIndex: 'loginTime',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) =>
        record.loginTime === 0
          ? '-'
          : moment(record.loginTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) =>
        record.registerTime === 0
          ? '-'
          : moment(record.registerTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      render: (_, record) => {
        return (
          <Popconfirm
            actionRef={actionRef}
            placement="topLeft"
            title={`你确定删除用户【${record.nickName}】吗？`}
            onConfirm={() => handleRemove(record, actionRef)}
          >
            <a>
              <DeleteOutlined style={{ color: '#ff4d4f' }} />
            </a>
          </Popconfirm>
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

  return (
    <PageHeaderWrapper>
      <ProTable
        rowKey="_id"
        request={(params, sorter, filter) => queryUser({ ...params })}
        columns={columns}
        rowClassName={() => 'editable-row'}
      />
    </PageHeaderWrapper>
  );
};

export default User;

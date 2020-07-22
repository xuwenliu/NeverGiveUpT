import React, { useRef } from 'react';
import { Tooltip, message, Popconfirm, Avatar } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { useIntl } from 'umi';

import moment from 'moment';
import { queryUser, removeUser } from './service';

const User = () => {
  const actionRef = useRef();
  const intl = useIntl();

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
      message.error(
        intl.formatMessage({
          id: 'user.update_error_tip',
        }),
      );
      return false;
    }
  };

  let columns = [
    {
      title: intl.formatMessage({
        id: 'user.nickName',
      }),
      dataIndex: 'nickName',
      formItemProps: {
        placeholder: intl.formatMessage({
          id: 'user.p_nickName',
        }),
        autoComplete: 'off',
      },
    },
    {
      title: intl.formatMessage({
        id: 'common.avatar',
      }),
      dataIndex: 'avatar',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => {
        return <Avatar shape="square" src={record.avatar} />;
      },
    },
    {
      title: intl.formatMessage({
        id: 'user.email',
      }),
      dataIndex: 'email',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: intl.formatMessage({
        id: 'common.introduction',
      }),
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
      title: intl.formatMessage({
        id: 'common.loginTime',
      }),
      dataIndex: 'loginTime',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) =>
        record.loginTime === 0
          ? '-'
          : moment(record.loginTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: intl.formatMessage({
        id: 'common.registerTime',
      }),
      dataIndex: 'registerTime',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) =>
        record.registerTime === 0
          ? '-'
          : moment(record.registerTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },

    {
      title: intl.formatMessage({
        id: 'common.action',
      }),
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      render: (_, record) => {
        return (
          <Popconfirm
            actionRef={actionRef}
            placement="topLeft"
            title={intl.formatMessage(
              {
                id: 'user.remove_tip',
              },
              {
                name: record.nickName,
              },
            )}
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

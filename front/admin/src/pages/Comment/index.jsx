import React, { useState, useRef } from 'react';
import { message, Popconfirm, Tooltip, Badge, Button, Modal, Radio } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';

import { queryComment, updateCommentStatus, removeComment } from './service';
import moment from 'moment';

const Comment = () => {
  const actionRef = useRef();
  const [params, setParams] = useState({
    visible: false,
    auditStatus: '',
    _id: '',
  });

  const handleUpdateStatus = async (actionRef) => {
    try {
      const res = await updateCommentStatus({ id: params._id, auditStatus: params.auditStatus });
      if (res.code === 0) {
        setParams((preState) => {
          return {
            ...preState,
            visible: false,
          };
        });
        message.success(res.msg);
        if (actionRef.current) {
          actionRef.current.reload();
        }
        return true;
      }
    } catch (error) {
      message.error('审核失败请重试！');
      return false;
    }
  };

  const handleRemove = async (params, actionRef) => {
    try {
      const res = await removeComment({
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
      message.error('删除评论失败请重试！');
      return false;
    }
  };

  const showAuditModal = (record) => {
    setParams((preState) => {
      return {
        ...preState,
        visible: true,
        auditStatus: record.auditStatus,
        _id: record._id,
      };
    });
  };

  let columns = [
    {
      title: '文章标题',
      dataIndex: 'articleTitle',
      fixed: 'left',
      formItemProps: {
        placeholder: '请输入文章标题',
        autoComplete: 'off',
      },
      render: (_, record) => {
        return (
          <Tooltip title={record.articleTitle}>
            <span>{record.articleTitle.slice(0, 10)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <Tooltip title={record.nickName}>
            <span>{record.nickName.slice(0, 10)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '当前回复内容',
      dataIndex: 'currentReplayContent',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <Tooltip title={record.currentReplayContent}>
            <span>{record.currentReplayContent.slice(0, 10)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '目标回复ID',
      dataIndex: 'targetReplayId',
      hideInSearch: true,
      width: 250,
    },
    {
      title: '目标回复内容',
      dataIndex: 'targetReplayContent',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <Tooltip title={record.targetReplayContent}>
            <span>{record.targetReplayContent.slice(0, 10)}</span>
          </Tooltip>
        );
      },
    },

    {
      title: '审核状态',
      dataIndex: 'auditStatus',
      initialValue: '0',
      valueEnum: {
        0: {
          text: '全部',
        },
        1: {
          text: '通过',
        },
        2: {
          text: '驳回',
        },
        3: {
          text: '未审核',
        },
      },
      render: (_, record) => {
        record.auditStatus *= 1;
        const map = new Map([
          [1, ['success', '通过']],
          [2, ['error', '驳回']],
          [3, ['default', '未审核']],
        ]);
        return (
          <Badge status={map.get(record.auditStatus)[0]} text={map.get(record.auditStatus)[1]} />
        );
      },
    },

    {
      title: '评论时间',
      dataIndex: 'commentTime',
      width: 200,
      hideInSearch: true,
      render: (_, record) => moment(record.commentTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },

    {
      title: '审核时间',
      dataIndex: 'auditTime',
      width: 200,
      hideInSearch: true,
      render: (_, record) =>
        record.auditTime === 0
          ? '-'
          : moment(record.auditTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (_, record) => {
        return (
          <>
            {/* 删除 */}
            <Popconfirm
              placement="topLeft"
              title={`你确定删除文章【${record.articleTitle}】的评论吗？`}
              onConfirm={() => handleRemove(record, actionRef)}
            >
              <a>
                <DeleteOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />
              </a>
            </Popconfirm>
            <Button
              onClick={() => showAuditModal(record)}
              style={{ marginLeft: 10 }}
              type="primary"
              size="small"
            >
              审核
            </Button>
          </>
        );
      },
    },
  ];
  columns = columns.map((col) => {
    col.align = 'center';
    return col;
  });

  return (
    <PageHeaderWrapper>
      <ProTable
        rowKey="_id"
        actionRef={actionRef}
        request={(params, sorter, filter) => queryComment({ ...params })}
        columns={columns}
        scroll={{ x: 1800 }}
      />
      <Modal
        title="审核"
        visible={params.visible}
        onOk={() => handleUpdateStatus(actionRef)}
        onCancel={() =>
          setParams((preState) => {
            return {
              ...preState,
              visible: false,
            };
          })
        }
      >
        <Radio.Group
          value={params.auditStatus}
          onChange={(e) =>
            setParams((preState) => {
              return {
                ...preState,
                auditStatus: e.target.value,
              };
            })
          }
        >
          <Radio value={1}>通过</Radio>
          <Radio value={2}>驳回</Radio>
        </Radio.Group>
      </Modal>
    </PageHeaderWrapper>
  );
};

export default Comment;

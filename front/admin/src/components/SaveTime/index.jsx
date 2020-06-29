import React from 'react';
import { Alert, Button } from 'antd';
import { SaveOutlined, RedoOutlined } from '@ant-design/icons';
import moment from 'moment';
import './index.less';

const SaveTime = (props) => {
  const { time, onSave, onRefresh } = props;
  const timeMessage = '最后保存时间:' + moment(time * 1000).format('YYYY-MM-DD HH:mm:ss');
  const message = time ? timeMessage : '暂无操作';
  return (
    <div className="save-time">
      <Alert message={message} />
      <Button
        onClick={onRefresh}
        className="refresh-btn"
        size="small"
        type="primary"
        icon={<RedoOutlined />}
      >
        刷新
      </Button>
      <Button
        onClick={onSave}
        className="save-time-btn"
        size="small"
        type="primary"
        icon={<SaveOutlined />}
      >
        保存
      </Button>
    </div>
  );
};

export default SaveTime;

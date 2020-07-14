import React from 'react';
import { Alert, Button, Affix } from 'antd';
import { SaveOutlined, RedoOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import './index.less';

const SaveTime = (props) => {
  const { time, onSave, onRefresh, onBack } = props;
  const timeMessage = '最后保存时间:' + moment(time * 1000).format('YYYY-MM-DD HH:mm:ss');
  const message = time ? timeMessage : '暂无操作';
  return (
    <Affix offsetTop={10} style={{ position: 'relative', width: '100%', zIndex: 9999 }}>
      <div className="save-time">
        <Alert type="success" message={message} />
        {onRefresh && (
          <Button
            onClick={onRefresh}
            className="refresh-btn"
            size="small"
            type="primary"
            icon={<RedoOutlined />}
          >
            刷新
          </Button>
        )}
        {onSave && (
          <Button
            onClick={onSave}
            className="save-time-btn"
            size="small"
            type="primary"
            icon={<SaveOutlined />}
          >
            保存
          </Button>
        )}

        {onBack && (
          <Button
            onClick={onBack}
            className="save-time-btn"
            size="small"
            type="primary"
            danger
            icon={<DoubleLeftOutlined />}
          >
            返回
          </Button>
        )}
      </div>
    </Affix>
  );
};

export default SaveTime;

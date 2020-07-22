import React from 'react';
import { Alert, Button, Affix } from 'antd';
import { SaveOutlined, RedoOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import './index.less';
import { FormattedMessage, useIntl } from 'umi';

const SaveTime = (props) => {
  const intl = useIntl();

  const { time, onSave, onRefresh, onBack } = props;
  const timeMessage =
    intl.formatMessage({
      id: 'component.saveTime.saveTime',
    }) + moment(time * 1000).format('YYYY-MM-DD HH:mm:ss');
  const message = time
    ? timeMessage
    : intl.formatMessage({
        id: 'component.saveTime.noAction',
      });
  return (
    <Affix offsetTop={10} style={{ position: 'relative', width: '100%', zIndex: 10 }}>
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
            <FormattedMessage id="component.saveTime.refresh" />
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
            <FormattedMessage id="component.saveTime.save" />
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
            <FormattedMessage id="component.saveTime.return" />
          </Button>
        )}
      </div>
    </Affix>
  );
};

export default SaveTime;

import React from 'react';
import { Modal } from 'antd';
import { useIntl } from 'umi';

const CreateForm = (props) => {
  const intl = useIntl();
  const { modalVisible, onCancel } = props;
  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({
        id: 'tags.add',
      })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;

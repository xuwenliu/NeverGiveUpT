import React, { useState } from 'react';
import { Upload, message, Input, Select, Row, Col } from 'antd';
import {
  LoadingOutlined,
  PlusOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
} from '@ant-design/icons';
import { upload } from './service';

import './UploadImageItem.less';

const Option = Select.Option;

const UploadImageItem = (props) => {
  const {
    onRemove,
    onAdd,
    url,
    link,
    icon,
    hideIcon = false,
    showReduce = true,
    showAdd = true,
  } = props;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(url || '');
  const [linkUrl, setLink] = useState(link || '');
  const [iconName, setIcon] = useState(icon || '');

  const beforeUpload = async (file) => {
    setLoading(true);
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif';
    if (!isJpgOrPng) {
      message.error('请上传jpg、jpeg、png、gif格式图片');
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片不能超过2MB');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    const res = await upload(formData);
    if (res) {
      setImageUrl(res[0].url);
      setLoading(false);
    }
    return false;
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  const handleChangeIcon = (e) => {
    setIcon(e.target.value);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">选择图片</div>
    </div>
  );

  const selectBefore = (
    <Select defaultValue="https://" className="select-before">
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <div>
      <Row>
        <Col>
          <Upload
            name="file"
            listType="picture-card"
            className="uploader"
            beforeUpload={beforeUpload}
            showUploadList={false}
          >
            {imageUrl ? <img src={imageUrl} alt="file" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Col>
        <div className="input">
          <Col>
            <Input
              value={linkUrl}
              onChange={handleChangeLink}
              className="link"
              placeholder="url"
              addonBefore={selectBefore}
            />
          </Col>
          {!hideIcon && (
            <Col>
              <Input
                value={iconName}
                onChange={handleChangeIcon}
                className="icon"
                placeholder="icon"
              />
            </Col>
          )}
        </div>
        <Col className="action">
          {showReduce && (
            <MinusCircleFilled
              onClick={onRemove}
              style={{ color: '#ff4d4f', fontSize: 30, marginLeft: 10, marginRight: 10 }}
            />
          )}
          {showAdd && (
            <PlusCircleFilled onClick={onAdd} style={{ color: '#096dd9', fontSize: 30 }} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UploadImageItem;
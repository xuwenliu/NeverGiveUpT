import React, { useState, useEffect } from 'react';
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
    imgUrl,
    link,
    icon,
    index = 0,

    onRemove,
    onAdd,
    onChange,

    showImg,
    showLink,
    showIcon,
    showAction,

    showReduce = false,
    showAdd = true,
  } = props;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(imgUrl || '');
  useEffect(() => {
    setImageUrl(imgUrl);
  }, [imgUrl]);

  const beforeUpload = async (file) => {
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
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await upload(formData);
    if (res) {
      setImageUrl(res[0].url);
      onChange({
        index,
        field: 'imgUrl',
        value: res[0].url,
      });
      setLoading(false);
    }
    return false;
  };

  const handleChangeLink = (e) => {
    onChange({
      index,
      field: 'link',
      value: e.target.value,
    });
  };

  const handleChangeIcon = (e) => {
    onChange({
      index,
      field: 'icon',
      value: e.target.value,
    });
  };

  const handleRemove = (index) => {
    onRemove(index);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">选择图片</div>
    </div>
  );

  return (
    <div>
      <Row style={{ marginBottom: 20 }}>
        {showImg && (
          <Col style={{ display: 'flex' }}>
            <Upload
              name="file"
              listType="picture-card"
              className="uploader"
              beforeUpload={beforeUpload}
              showUploadList={false}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="file" style={{ width: '100%', maxHeight: 74 }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
        )}

        {(showLink || showIcon) && (
          <div className="input">
            {showLink && (
              <Col>
                <Input
                  value={link}
                  onChange={handleChangeLink}
                  className="link"
                  addonBefore="跳转链接"
                />
              </Col>
            )}

            {showIcon && (
              <Col style={{ marginTop: 10 }}>
                <Input
                  value={icon}
                  onChange={handleChangeIcon}
                  className="icon"
                  addonBefore="icon"
                />
              </Col>
            )}
          </div>
        )}
        {showAction && (
          <Col className="action">
            {showReduce && (
              <MinusCircleFilled
                onClick={() => handleRemove(index)}
                style={{ color: '#ff4d4f', fontSize: 30, marginLeft: 10 }}
              />
            )}
            {showAdd && (
              <PlusCircleFilled
                onClick={onAdd}
                style={{ color: '#096dd9', fontSize: 30, marginLeft: 10 }}
              />
            )}
          </Col>
        )}
      </Row>
    </div>
  );
};

export default UploadImageItem;

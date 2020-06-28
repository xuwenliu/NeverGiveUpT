import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, Input, Row, Col, Badge, Tag, Switch, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';
import './index.less';

import SaveTime from '@/components/SaveTime';
import UploadImage from '@/components/UploadImage';
import { randomNum } from '@/utils/utils';
import { queryAbout, addAbout } from './service';

const colors = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
  '#f50',
  '#2db7f5',
  '#87d068',
  '#108ee9',
];

const About = () => {
  const [imgs, setImsg] = useState(); // 介绍图片
  const [desc, setDesc] = useState(''); // 详细介绍
  const [showTip, setShowTip] = useState(false);
  const [tags, setTags] = useState([]); // 标签云
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showResume, setShowResume] = useState(false); // 是否显示个人简介

  useEffect(() => {
    queryAbout().then((res) => {
      const data = res.data;
      if (data) {
        setImsg(data.imgs);
        setDesc(data.desc);
        setShowResume(data.showResume);
        const tags = data.tags.map((item) => {
          return {
            name: item,
            color: colors[randomNum(1, 15)],
          };
        });
        setTags(tags);
      }
    });
  }, []);

  const validateParams = (postData) => {
    let flag = false;
    postData.imgs.forEach((item, index) => {
      if (!item.imgUrl) {
        message.error(`请上传第${index + 1}张介绍图片`);
        flag = false;
      } else {
        flag = true;
      }
    });
    if (!flag) {
      return false;
    }

    if (!postData.desc) {
      message.error('请输入详细介绍');
      return false;
    }
    if (postData.tags.length === 0) {
      message.error('请至少添加1个标签');
      return false;
    }
    return true;
  };
  const onSave = () => {
    let postData = {
      imgs: imgs.map((item) => {
        const obj = {
          imgUrl: item.imgUrl,
          link: item.link,
        };
        return obj;
      }),
      desc,
      tags: tags.map((item) => item.name),
      showResume,
    };
    if (validateParams(postData)) {
      console.log(postData);
    }
  };
  const onChange = useCallback((imgs) => {
    setImsg(imgs);
  });
  const onChangeDesc = (e) => {
    setDesc(e.target.value.slice(0, 5000));
  };

  const handleCloseTag = (removedTag) => {
    setTags((preTags) => {
      const tags = preTags.filter((tag) => tag !== removedTag);
      return [...tags];
    });
  };

  const saveInputRef = useRef();

  const showInput = () => {
    setInputVisible(() => {
      saveInputRef.current && saveInputRef.current.focus();
      return true;
    });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    const removeRepeat = (arr) => {
      let map = new Map();
      for (let item of arr) {
        if (!map.has(item.name)) {
          map.set(item.name, item);
        }
      }
      return [...map.values()];
    };

    setTags((preTags) => {
      let newTags = [...preTags];
      if (inputValue && newTags.length < 20) {
        newTags.push({
          name: inputValue,
          color: colors[randomNum(1, 15)],
        });
        // 去重
        newTags = removeRepeat(newTags);
      }
      return newTags;
    });
    setInputValue('');
    setInputVisible(false);
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        color={tag.color}
        onClose={(e) => {
          e.preventDefault();
          handleCloseTag(tag);
        }}
      >
        {tag.name}
      </Tag>
    );
    return (
      <span className="tags-item" key={tag.name}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags.map(forMap);

  return (
    <div>
      <Card>
        <SaveTime onSave={onSave} time={1592382607} />
        <div className="field-content">
          <Row>
            <Col span={12}>
              <div className="field-item">
                <div className="field-title">
                  <Badge status="error" text="介绍图片: " />
                </div>
                <UploadImage imgs={imgs} max={3} onChange={onChange} />
              </div>
            </Col>
            <Col span={12}>
              <div className="field-item">
                <div className="field-title">
                  <Badge status="error" text="标签云: " />
                  <span>(最多添加20个)</span>
                </div>
                <Card>
                  <TweenOneGroup
                    enter={{
                      scale: 0.8,
                      opacity: 0,
                      type: 'from',
                      duration: 100,
                      onComplete: (e) => {
                        e.target.style = '';
                      },
                    }}
                    leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                    appear={false}
                  >
                    {tagChild}
                    {inputVisible && (
                      <Input
                        ref={saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 100 }}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                      />
                    )}
                    {!inputVisible && (
                      <Tag onClick={showInput} className="site-tag-plus">
                        <PlusOutlined />
                        添加
                      </Tag>
                    )}
                  </TweenOneGroup>
                </Card>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div className="field-item">
                <div className="field-title">
                  <Badge status="error" text="详细介绍: " />
                </div>
                <Input.TextArea
                  value={desc}
                  onFocus={() => setShowTip(true)}
                  onBlur={() => setShowTip(false)}
                  onChange={onChangeDesc}
                  allowClear={true}
                  rows={6}
                />
                {showTip && (
                  <p className="field-tip">
                    还可以输入<span className="field-tip-num">{5000 - desc.length}</span>个字
                  </p>
                )}
              </div>
            </Col>
            <Col span={12}>
              <div className="field-item">
                <div className="field-title">
                  <Badge status="error" text="个人简历: " />
                  <Switch
                    className="field-switch"
                    checkedChildren="显示"
                    unCheckedChildren="隐藏"
                    checked={showResume}
                    onChange={() => setShowResume(!showResume)}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default About;

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, Input, Row, Col, Badge, Tag, Switch, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';
import './index.less';

import SaveTime from '@/components/SaveTime';
import UploadImage from '@/components/UploadImage';
import { randomNum } from '@/utils/utils';
import { queryAbout, addAbout, updateAbout } from './service';

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
  const [params, setParams] = useState({
    tags: [],
    desc: '',
    showResume: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (isRefresh) => {
    const res = await queryAbout();
    if (isRefresh) {
      message.success('刷新成功');
    }
    const data = res.data;
    if (!data) return;
    const tags = data.tags.map((item) => {
      return {
        name: item,
        color: colors[randomNum(1, 15)],
      };
    });
    setParams({
      ...data,
      tags,
    });
  };
  const [showTip, setShowTip] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const validateParams = (postData) => {
    if (postData.imgs.length === 0) {
      message.error(`请上传介绍图片`);
      return false;
    }
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
  const onRefresh = () => {
    loadData(true);
  };

  const onSave = async () => {
    let imgs = [];
    let tags = [];
    if (params.imgs) {
      imgs = params.imgs.map((item) => {
        const obj = {
          imgUrl: item.imgUrl,
          link: item.link,
        };
        return obj;
      });
    }
    if (params.tags) {
      tags = params.tags.map((item) => item.name);
    }
    let postData = {
      ...params,
      imgs,
      tags,
    };
    if (validateParams(postData)) {
      if (postData._id) {
        // 修改
        const res = await updateAbout(postData);
        if (res.data) {
          message.success(res.msg);
        } else {
          message.error(res.msg);
        }
      } else {
        //添加
        const res = await addAbout(postData);
        if (res.data) {
          message.success(res.msg);
        } else {
          message.error(res.msg);
        }
      }
    }
  };
  const onChange = useCallback((imgs) => {
    setParams((preState) => {
      return {
        ...preState,
        imgs,
      };
    });
  });
  const onChangeDesc = (e) => {
    e.persist();
    setParams((preState) => {
      return {
        ...preState,
        desc: e.target.value.slice(0, 5000),
      };
    });
  };

  const handleCloseTag = (removedTag) => {
    setParams((preState) => {
      const tags = preState.tags.filter((tag) => tag !== removedTag);
      return {
        ...preState,
        tags,
      };
    });
  };

  const handleShowResume = (showResume) => {
    setParams((preState) => {
      return {
        ...preState,
        showResume,
      };
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

    setParams((preState) => {
      let newTags = [...preState.tags];
      if (inputValue && newTags.length < 20) {
        newTags.push({
          name: inputValue,
          color: colors[randomNum(1, 15)],
        });
        // 去重
        newTags = removeRepeat(newTags);
      }
      return {
        ...preState,
        tags: newTags,
      };
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
  const tagChild = params.tags ? params.tags.map(forMap) : null;

  return (
    <div>
      <Card>
        <SaveTime onSave={onSave} onRefresh={onRefresh} time={params.updateTime} />
        <div className="field-content">
          <Row>
            <Col span={12}>
              <div className="field-item">
                <div className="field-title">
                  <Badge status="error" text="介绍图片: " />
                  <span>(1-3张)</span>
                </div>
                <UploadImage imgs={params.imgs} max={3} onChange={onChange} />
              </div>
            </Col>
            <Col offset={2} span={10}>
              <div className="field-item">
                <div className="field-title">
                  <Badge status="error" text="标签云: " />
                  <span>(1-20个)</span>
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
                  value={params.desc}
                  onFocus={() => setShowTip(true)}
                  onBlur={() => setShowTip(false)}
                  onChange={(e) => onChangeDesc(e)}
                  allowClear={true}
                  rows={6}
                />
                {showTip && (
                  <p className="field-tip">
                    还可以输入<span className="field-tip-num">{5000 - params.desc.length}</span>个字
                  </p>
                )}
              </div>
            </Col>
            <Col offset={2} span={10}>
              <div className="field-item">
                <div className="field-title">
                  <Badge>个人简历: </Badge>
                  <Switch
                    className="field-switch"
                    checkedChildren="显示"
                    unCheckedChildren="隐藏"
                    checked={params.showResume}
                    onChange={(checked) => handleShowResume(checked)}
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

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Input, Row, Col, Badge, Switch, message } from 'antd';
import './index.less';

import SaveTime from '@/components/SaveTime';
import UploadImage from '@/components/UploadImage';
import { queryHomeConfig, addHomeConfig, updateHomeConfig } from '../service';

const initBackgroundImages = [
  {
    field: 'homeBgImg',
    name: '首页背景图片',
  },
  // {
  //   field: 'articleBgImg',
  //   name: '文章背景图片',
  // },
  // {
  //   field: 'articleDetailBgImg',
  //   name: '文章详情背景图片',
  // },
  {
    field: 'archiveBgImg',
    name: '归档背景图片',
  },
  {
    field: 'categoriesBgImg',
    name: '分类背景图片',
  },
  {
    field: 'categoriesDetailBgImg',
    name: '分类详情背景图片',
  },
  {
    field: 'tagsBgImg',
    name: '标签背景图片',
  },
  {
    field: 'tagsDetailBgImg',
    name: '标签详情背景图片',
  },
  {
    field: 'aboutBgImg',
    name: '关于背景图片',
  },
  {
    field: 'avatar',
    name: '头像',
  },
];

const Home = () => {
  const [backgroundImages, setBackgroundImages] = useState(initBackgroundImages);
  const [params, setParams] = useState({
    avatarRotate: false,
    introduction: '',
    effects: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (isRefresh) => {
    const res = await queryHomeConfig();
    if (isRefresh) {
      message.success('刷新成功');
    }
    let data = res.data;

    if (!data) return;
    backgroundImages.map((item) => {
      item.imgs = [
        {
          imgUrl: data[item.field],
        },
      ];
      return item;
    });
    setBackgroundImages(backgroundImages);
    setParams({
      ...data,
    });
  };
  const [showTip, setShowTip] = useState(false);

  const validateParams = (postData) => {
    console.log(backgroundImages);
    let flag = false;
    for (let i in backgroundImages) {
      if (!backgroundImages[i].imgs) {
        message.error(`请上传${backgroundImages[i].name}`);
        flag = false;
        return;
      } else {
        flag = true;
      }
    }
    if (!flag) {
      return false;
    }
    if (!postData.introduction) {
      message.error('请输入简介');
      return false;
    }
    if (postData.introduction.length < 2) {
      message.error('简介至少输入2个字符');
      return false;
    }
    return true;
  };

  const onRefresh = () => {
    loadData(true);
  };

  const onSave = async () => {
    let postData = {
      ...params,
    };
    if (validateParams(postData)) {
      if (postData._id) {
        // 修改
        const res = await updateHomeConfig(postData);
        if (res.data) {
          message.success(res.msg);
        } else {
          message.error(res.msg);
        }
      } else {
        //添加
        const res = await addHomeConfig(postData);
        if (res.data) {
          message.success(res.msg);
        } else {
          message.error(res.msg);
        }
      }
    }
  };
  const onChange = useCallback((imgs, index) => {
    setBackgroundImages((preState) => {
      preState[index]['imgs'] = imgs;
      return [...preState];
    });
    setParams((preState) => {
      const field = backgroundImages[index].field;
      return {
        ...preState,
        [field]: imgs[0].imgUrl,
      };
    });
  });

  const onChangeIntroduction = (e) => {
    e.persist();
    setParams((preState) => {
      return {
        ...preState,
        introduction: e.target.value.slice(0, 100),
      };
    });
  };

  const handlChangeToggle = (field, value) => {
    setParams((preState) => {
      return {
        ...preState,
        [field]: value,
      };
    });
  };

  return (
    <div>
      <Card>
        <SaveTime onSave={onSave} onRefresh={onRefresh} time={params.updateTime} />
        <div className="field-content">
          <Row>
            {backgroundImages.map((item, index) => {
              return (
                <Col key={item.field} span={4}>
                  <div className="field-item">
                    <div className="field-title">
                      <Badge status="error" text={item.name + ':'} />
                    </div>
                    <UploadImage
                      imgs={item.imgs}
                      showLink={false}
                      showAction={false}
                      onChange={(imgs) => onChange(imgs, index)}
                    />
                  </div>
                </Col>
              );
            })}
            <Col span={10}>
              <div className="field-item">
                <div className="field-title">
                  <Badge>头像是否旋转:</Badge>
                  <Switch
                    className="field-switch"
                    checkedChildren="是"
                    unCheckedChildren="否"
                    checked={params.avatarRotate}
                    onChange={(checked) => handlChangeToggle('avatarRotate', checked)}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div className="field-item">
                <div className="field-title">
                  <Badge status="error" text="简介: " />
                </div>
                <Input.TextArea
                  value={params.introduction}
                  onFocus={() => setShowTip(true)}
                  onBlur={() => setShowTip(false)}
                  onChange={(e) => onChangeIntroduction(e)}
                  allowClear={true}
                  rows={6}
                />
                {showTip && (
                  <p className="field-tip">
                    还可以输入
                    <span className="field-tip-num">{100 - params.introduction.length}</span>个字
                  </p>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <div className="field-item">
                <div className="field-title">
                  <Badge>简介特效:</Badge>
                  <Switch
                    className="field-switch"
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    checked={params.effects}
                    onChange={(checked) => handlChangeToggle('effects', checked)}
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

export default Home;

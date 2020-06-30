import React, { useState, useEffect, useCallback } from 'react';
import { Card, Input, Row, Col, Badge, Switch, message, Radio, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.less';

import SaveTime from '@/components/SaveTime';
import UploadImage from '@/components/UploadImage';
import MenuItemConfig from './components/MenuItemConfig';
import {
  queryHeaderFooterConfig,
  addHeaderFooterConfig,
  updateHeaderFooterConfig,
} from '../service';

const defaultMenu = [
  {
    name: '首页',
    router: 'index',
    sort: 0,
    status: true,
    deletable: false,
    disabled: true,
  },
  {
    name: '文章',
    router: 'articles',
    sort: 1,
    status: true,
    deletable: false,
    disabled: true,
  },
  {
    name: '归档',
    router: 'archives',
    sort: 2,
    status: true,
    deletable: false,
    disabled: true,
  },
  {
    name: '分类',
    router: 'categories',
    sort: 3,
    status: true,
    deletable: false,
    disabled: true,
  },
  {
    name: '标签',
    router: 'tags',
    sort: 4,
    status: true,
    deletable: false,
    disabled: true,
  },
  {
    name: '关于',
    router: 'about',
    sort: 5,
    status: true,
    deletable: false,
    disabled: true,
  },
];

const HeaderFooter = () => {
  const [type, setType] = useState(2);
  const [params, setParams] = useState({
    header: {
      logo: '',
      title: '',
      fixedHeader: true,
      openSearch: true,
      login: false,
      register: false,
      menu: defaultMenu,
    },
    footer: {
      copyright: '',
      extra: '',
    },
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (isRefresh) => {
    const res = await queryHeaderFooterConfig();
    if (isRefresh) {
      message.success('刷新成功');
    }
    let data = res.data;

    if (!data) return;

    // setParams({
    //   ...data,
    // });
  };

  const validateParams = (postData) => {
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
    console.log(postData);
    // if (validateParams(postData)) {
    //   if (postData._id) {
    //     // 修改
    //     const res = await updateHeaderFooterConfig(postData);
    //     if (res.data) {
    //       message.success(res.msg);
    //     } else {
    //       message.error(res.msg);
    //     }
    //   } else {
    //     //添加
    //     const res = await addHeaderFooterConfig(postData);
    //     if (res.data) {
    //       message.success(res.msg);
    //     } else {
    //       message.error(res.msg);
    //     }
    //   }
    // }
  };
  const onChange = useCallback((imgs) => {
    setParams((preState) => {
      preState.header = {
        ...preState.header,
        logo: imgs[0].imgUrl,
      };
      return {
        ...preState,
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
      preState.header = {
        ...preState.header,
        [field]: value,
      };
      return {
        ...preState,
      };
    });
  };

  const onRadioChange = (e) => {
    setType(e.target.value);
  };

  const handleTitleChange = (e) => {
    e.persist();
    setParams((preState) => {
      preState.header = {
        ...preState.header,
        title: e.target.value.slice(0, 20),
      };
      return {
        ...preState,
      };
    });
  };

  const handlChangeFooter = (e, field) => {
    e.persist();
    setParams((preState) => {
      preState.footer = {
        ...preState.footer,
        [field]: e.target.value.slice(0, 200),
      };
      return {
        ...preState,
      };
    });
  };

  const handleAddMenu = () => {
    setParams((preState) => {
      const menu = preState.header.menu;
      menu.push({
        name: '',
        router: '',
        sort: menu.length,
        status: false,
        disabled: false,
        editable: true,
        deletable: false,
      });
      preState.header = {
        ...preState.header,
        menu,
      };
      return {
        ...preState,
      };
    });
  };

  return (
    <div>
      <Card>
        <SaveTime onSave={onSave} onRefresh={onRefresh} time={params.updateTime} />
        <div className="field-content">
          <Row>
            <Col span={3}>
              <div className="field-item">
                <div className="field-title">
                  <Badge>Header配置: </Badge>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={4}>
              <div className="field-item">
                <div className="field-title">
                  <Badge>是否固定Header:</Badge>
                  <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    checked={params.header.fixedHeader}
                    onChange={(checked) => handlChangeToggle('fixedHeader', checked)}
                  />
                </div>
              </div>
              <div className="field-item">
                <div className="field-title">
                  <Badge>是否开启全局搜索:</Badge>
                  <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    checked={params.header.openSearch}
                    onChange={(checked) => handlChangeToggle('openSearch', checked)}
                  />
                </div>
              </div>
              <div className="field-item">
                <div className="field-title">
                  <Badge>是否开启登录:</Badge>
                  <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    checked={params.header.login}
                    onChange={(checked) => handlChangeToggle('login', checked)}
                  />
                </div>
              </div>
              <div className="field-item">
                <div className="field-title">
                  <Badge>是否开启注册:</Badge>
                  <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    checked={params.header.register}
                    onChange={(checked) => handlChangeToggle('register', checked)}
                  />
                </div>
              </div>
            </Col>
            <Col offset={2} span={16}>
              <Radio.Group style={{ marginBottom: 20 }} onChange={onRadioChange} value={type}>
                <Radio value={1}>Logo</Radio>
                <Radio value={2}>标题</Radio>
              </Radio.Group>
              {type === 1 && (
                <div className="field-item">
                  <UploadImage
                    imgs={params.header.logoImgs}
                    showLink={false}
                    showAction={false}
                    onChange={onChange}
                  />
                </div>
              )}
              {type === 2 && (
                <div className="field-item">
                  <Input
                    onChange={handleTitleChange}
                    value={params.header.title}
                    placeholder="请输入0-20个字符"
                  />
                </div>
              )}
            </Col>
          </Row>

          <Row>
            <Col offset={2}>
              <div className="field-item">
                <div className="field-title">
                  <Badge>导航菜单: </Badge>
                  <span>（菜单名称最多4个字符，跳转路由只能输入小写英文，排序数字越大越靠右）</span>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col offset={2}>
              {params.header.menu.map((item, index) => {
                return <MenuItemConfig {...item} index={index} key={item.name} />;
              })}
              <Button onClick={handleAddMenu} icon={<PlusOutlined />}>
                新增
              </Button>
            </Col>
          </Row>

          <Row>
            <Col span={3}>
              <div className="field-item">
                <div className="field-title">
                  <Badge>Footer配置: </Badge>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col offset={2} span={22}>
              <Input
                value={params.footer.copyright}
                onChange={(e) => handlChangeFooter(e, 'copyright')}
                addonBefore="Copyright"
              />
              <Input
                value={params.footer.extra}
                onChange={(e) => handlChangeFooter(e, 'extra')}
                style={{ marginTop: 20 }}
                addonBefore="额外信息"
              />
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default HeaderFooter;

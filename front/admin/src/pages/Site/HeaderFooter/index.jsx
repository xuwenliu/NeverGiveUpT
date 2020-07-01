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
    menuName: '首页',
    router: 'index',
    sort: 0,
    status: true,
    deletable: false,
    disabled: true,
  },
  {
    menuName: '文章',
    router: 'articles',
    sort: 1,
    status: true,
    deletable: false,
    disabled: true,
  },
  {
    menuName: '归档',
    router: 'archives',
    sort: 2,
    status: true,
    deletable: false,
    disabled: true,
  },
  {
    menuName: '分类',
    router: 'categories',
    sort: 3,
    status: true,
    deletable: false,
    disabled: true,
  },
  {
    menuName: '标签',
    router: 'tags',
    sort: 4,
    status: true,
    deletable: false,
    disabled: true,
  },
  {
    menuName: '关于',
    router: 'about',
    sort: 5,
    status: true,
    deletable: false,
    disabled: true,
  },
];
const defaultMenuName = defaultMenu.map((item) => item.menuName);
const HeaderFooter = () => {
  const [params, setParams] = useState({
    header: {
      type: 2, //默认展示title
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
    console.log(defaultMenuName);
    data.header.menu.map((item, index) => {
      console.log(item.menuName);
      item.disabled = defaultMenuName.includes(item.menuName);
      item.editable = !item.disabled;
      return item;
    });

    console.log(data.header.menu);

    setParams(() => {
      if (data.header.logo) {
        data.header = {
          ...data.header,
          logoImgs: [
            {
              imgUrl: data.header.logo,
            },
          ],
          type: 1,
        };
      }
      if (data.header.title) {
        data.header = {
          ...data.header,
          type: 2,
        };
      }

      return {
        ...data,
      };
    });
  };

  const validateParams = () => {
    console.log('params', params);
    if (params.header.type === 1) {
      params.header.logo = params.header.logoImgs ? params.header.logoImgs[0].imgUrl : '';
      if (!params.header.logo) {
        message.error('请上传Logo');
        return false;
      }
    } else {
      if (!params.header.title) {
        message.error('请输入标题');
        return false;
      }
    }

    const menu = params.header.menu;
    let flag = false;
    for (let i in menu) {
      if (!menu[i].menuName) {
        message.error(`请输入导航菜单名称`);
        return (flag = false);
      } else {
        if (menu[i].menuName.length < 2 || menu[i].menuName.length > 4) {
          message.error(`导航菜单名称2-4个字符`);
          return (flag = false);
        }
        flag = true;
      }
      if (!menu[i].router) {
        message.error(`请输入导航菜单路由`);
        return (flag = false);
      } else {
        const regexp = /^[a-z]{1,50}$/;
        if (!regexp.test(menu[i].router)) {
          message.error(`导航菜单路由2-50个小写英文字母`);
          return (flag = false);
        }
        flag = true;
      }

      if (menu[i].sort === null) {
        message.error(`请输入导航菜单排序`);
        return (flag = false);
      } else {
        flag = true;
      }
    }
    if (!flag) {
      return flag;
    }

    if (!params.footer.copyright) {
      message.error('请输入Copyright');
      return false;
    }

    if (!params.footer.extra) {
      message.error('请输入额外信息');
      return false;
    }

    return true;
  };

  const onRefresh = () => {
    loadData(true);
  };

  const onSave = async () => {
    if (validateParams()) {
      if (params.header.type === 1) {
        delete params.header.logoImgs;
      }
      delete params.header.type;
      const callFunc = params._id ? updateHeaderFooterConfig : addHeaderFooterConfig;
      const res = await callFunc(params);
      if (res.data) {
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    }
  };
  const onUploadImageChange = useCallback((imgs) => {
    setParams((preState) => {
      preState.header = {
        ...preState.header,
        logoImgs: imgs,
      };
      return {
        ...preState,
      };
    });
  });

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
    setParams((preState) => {
      preState.header.type = e.target.value;
      if (preState.header.type === 1) {
        preState.header.title = '';
      } else {
        preState.header.logoImgs = null;
        preState.header.logo = '';
      }
      return {
        ...preState,
      };
    });
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
    if (params.header.menu.length >= 10) {
      return;
    }
    setParams((preState) => {
      const menu = preState.header.menu;
      menu.push({
        menuName: '',
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
  const onMenuItemConfigRemove = useCallback((index) => {
    setParams((preState) => {
      preState.header.menu.splice(index, 1);
      return {
        ...preState,
      };
    });
  });

  const onMenuItemConfigChange = useCallback((index, field, value) => {
    setParams((preState) => {
      preState.header.menu[index][field] = value;
      return {
        ...preState,
      };
    });
  });

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
              <Radio.Group
                style={{ marginBottom: 20 }}
                onChange={onRadioChange}
                value={params.header.type || 2}
              >
                <Radio value={1}>Logo</Radio>
                <Radio value={2}>标题</Radio>
              </Radio.Group>
              {params.header.type === 1 && (
                <div className="field-item">
                  <UploadImage
                    imgs={params.header.logoImgs}
                    showLink={false}
                    showAction={false}
                    onChange={onUploadImageChange}
                  />
                </div>
              )}
              {params.header.type === 2 && (
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
                return (
                  <MenuItemConfig
                    {...item}
                    onRemove={() => onMenuItemConfigRemove(index)}
                    onChange={(field, value) => onMenuItemConfigChange(index, field, value)}
                    key={item.router + index}
                  />
                );
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

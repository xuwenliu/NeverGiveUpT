import React, { useState, useEffect, useCallback } from 'react';
import { Card, Input, Row, Col, Badge, Switch, message, Radio, Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage, useIntl } from 'umi';

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

const HeaderFooter = () => {
  const intl = useIntl();

  const defaultMenu = [
    {
      menuName: intl.formatMessage({
        id: 'common.index',
      }),
      router: 'index',
      sort: 0,
      status: true,
      deletable: false,
      disabled: true,
    },
    {
      menuName: intl.formatMessage({
        id: 'common.articles',
      }),
      router: 'articles',
      sort: 1,
      status: true,
      deletable: false,
      disabled: true,
    },
    {
      menuName: intl.formatMessage({
        id: 'common.archives',
      }),
      router: 'archives',
      sort: 2,
      status: true,
      deletable: false,
      disabled: true,
    },
    {
      menuName: intl.formatMessage({
        id: 'common.categories',
      }),
      router: 'categories',
      sort: 3,
      status: true,
      deletable: false,
      disabled: true,
    },
    {
      menuName: intl.formatMessage({
        id: 'common.tags',
      }),
      router: 'tags',
      sort: 4,
      status: true,
      deletable: false,
      disabled: true,
    },
    {
      menuName: intl.formatMessage({
        id: 'common.about',
      }),
      router: 'about',
      sort: 5,
      status: true,
      deletable: false,
      disabled: true,
    },
  ];
  const defaultMenuName = defaultMenu.map((item) => item.menuName);

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
      message.success(
        intl.formatMessage({
          id: 'common.refresh_success',
        }),
      );
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
        message.error(
          intl.formatMessage({
            id: 'site.p_logo',
          }),
        );
        return false;
      }
    } else {
      if (!params.header.title) {
        message.error(
          intl.formatMessage({
            id: 'site.p_title',
          }),
        );
        return false;
      }
    }

    const menu = params.header.menu;
    let flag = false;
    for (let i in menu) {
      if (!menu[i].menuName) {
        message.error(
          intl.formatMessage({
            id: 'site.p_menuName',
          }),
        );
        return (flag = false);
      } else {
        if (menu[i].menuName.length < 2 || menu[i].menuName.length > 4) {
          message.error(
            intl.formatMessage({
              id: 'site.p_menuName_pattern',
            }),
          );
          return (flag = false);
        }
        flag = true;
      }
      if (!menu[i].router) {
        message.error(
          intl.formatMessage({
            id: 'site.p_router',
          }),
        );
        return (flag = false);
      } else {
        const regexp = /^[a-z]{1,50}$/;
        if (!regexp.test(menu[i].router)) {
          message.error(
            intl.formatMessage({
              id: 'site.p_router_pattern',
            }),
          );
          return (flag = false);
        }
        flag = true;
      }

      if (menu[i].sort === null) {
        message.error(
          intl.formatMessage({
            id: 'site.p_sort',
          }),
        );
        return (flag = false);
      } else {
        flag = true;
      }
    }
    if (!flag) {
      return flag;
    }

    if (!params.footer.copyright) {
      message.error(
        intl.formatMessage({
          id: 'site.p_copyright',
        }),
      );
      return false;
    }

    if (!params.footer.extra) {
      message.error(
        intl.formatMessage({
          id: 'site.p_extra',
        }),
      );
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
    <PageHeaderWrapper>
      <Card>
        <SaveTime onSave={onSave} onRefresh={onRefresh} time={params.updateTime} />
        <div className="field-content">
          <Row>
            <Col span={3}>
              <div className="field-item">
                <div className="field-title">
                  <Badge>
                    <FormattedMessage id="site.headerConfig" />
                  </Badge>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={4}>
              <div className="field-item">
                <div className="field-title">
                  <Badge>
                    <FormattedMessage id="site.fixedHeader" />
                  </Badge>
                  <Switch
                    checkedChildren={intl.formatMessage({
                      id: 'common.yes',
                    })}
                    unCheckedChildren={intl.formatMessage({
                      id: 'common.no',
                    })}
                    checked={params.header.fixedHeader}
                    onChange={(checked) => handlChangeToggle('fixedHeader', checked)}
                  />
                </div>
              </div>
              <div className="field-item">
                <div className="field-title">
                  <Badge>
                    <FormattedMessage id="site.openSearch" />
                  </Badge>
                  <Switch
                    checkedChildren={intl.formatMessage({
                      id: 'common.yes',
                    })}
                    unCheckedChildren={intl.formatMessage({
                      id: 'common.no',
                    })}
                    checked={params.header.openSearch}
                    onChange={(checked) => handlChangeToggle('openSearch', checked)}
                  />
                </div>
              </div>
              <div className="field-item">
                <div className="field-title">
                  <Badge>
                    <FormattedMessage id="site.login" />
                  </Badge>
                  <Switch
                    checkedChildren={intl.formatMessage({
                      id: 'common.yes',
                    })}
                    unCheckedChildren={intl.formatMessage({
                      id: 'common.no',
                    })}
                    checked={params.header.login}
                    onChange={(checked) => handlChangeToggle('login', checked)}
                  />
                </div>
              </div>
              <div className="field-item">
                <div className="field-title">
                  <Badge>
                    <FormattedMessage id="site.register" />
                  </Badge>
                  <Switch
                    checkedChildren={intl.formatMessage({
                      id: 'common.yes',
                    })}
                    unCheckedChildren={intl.formatMessage({
                      id: 'common.no',
                    })}
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
                <Radio value={2}>
                  <FormattedMessage id="site.title" />
                </Radio>
              </Radio.Group>
              {params.header.type === 1 && (
                <div className="field-item">
                  <UploadImage
                    value={params.header.logoImgs}
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
                    placeholder={intl.formatMessage({
                      id: 'site.p_title_pattern',
                    })}
                  />
                </div>
              )}
            </Col>
          </Row>

          <Row>
            <Col offset={2}>
              <div className="field-item">
                <div className="field-title">
                  <Badge>
                    <FormattedMessage id="site.menu" />
                  </Badge>
                  <span>
                    <FormattedMessage id="site.menu_pattern_tip" />
                  </span>
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
                <FormattedMessage id="common.add" />
              </Button>
            </Col>
          </Row>

          <Row>
            <Col span={3}>
              <div className="field-item">
                <div className="field-title">
                  <Badge>
                    <FormattedMessage id="site.footerConfig" />
                  </Badge>
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
                addonBefore={intl.formatMessage({
                  id: 'site.extra',
                })}
              />
            </Col>
          </Row>
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};

export default HeaderFooter;

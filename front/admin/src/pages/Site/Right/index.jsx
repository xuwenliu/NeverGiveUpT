import React, { useState, useCallback, useEffect } from 'react';
import { Card, Tabs, Row, Col, Badge, Input, Select, Form, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const { TabPane } = Tabs;
const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const showPositionArr = [
  '首页',
  '文章',
  '文章详情',
  '归档',
  '分类',
  '分类详情',
  '标签',
  '标签详情',
  '关于',
];

import SaveTime from '@/components/SaveTime';
import UploadImage from '@/components/UploadImage';
import './index.less';

import { queryTags } from '@/pages/Tags/service';
import { fetchRight } from '../service';

const Right = () => {
  const [params, setParams] = useState({
    imgs: [
      {
        link: '',
        icon: '',
      },
    ],
  });
  const [tab, setTab] = useState('tab1');
  const [tags, setTags] = useState([]);

  const loadTags = async () => {
    const res = await queryTags();
    let data = res.data;
    if (data) {
      data = data.map((item) => item.name);
      console.log(data);
      setTags(data);
    }
  };

  const loadData = async (isRefresh) => {
    const res = await fetchRight.introduction.query();
    if (isRefresh) {
      message.success('刷新成功');
    }
    let data = res.data;

    if (!data) return;
    data.imgs = data.friendLink;
    setParams({
      ...data,
    });
    formTab1.setFieldsValue({
      ...data,
    });
  };

  useEffect(() => {
    loadTags();
    loadData();
  }, []);

  const tabsChange = (key) => {
    setTab(key);
  };

  const onUploadImageChange = useCallback((imgs) => {
    setParams((preState) => {
      return {
        ...preState,
        imgs,
      };
    });
  });
  const [formTab1] = Form.useForm();

  const validateTab1 = (postData) => {
    let flag = false;
    const friendLink = postData.imgs;
    for (let i in friendLink) {
      if (!friendLink[i].link) {
        message.error(`请上传第${i * 1 + 1}个跳转链接`);
        return (flag = false);
      } else {
        flag = true;
      }
      if (!friendLink[i].icon) {
        message.error(`请上传第${i * 1 + 1}个icon`);
        return (flag = false);
      } else {
        flag = true;
      }
    }
    if (!flag) {
      return flag;
    }
    return true;
  };

  const onSave = async () => {
    if (tab === 'tab1') {
      const values = await formTab1.validateFields(); //校验
      if (values) {
        const getValues = formTab1.getFieldsValue(); // 获取最新文本值
        params.friendLink = params.imgs;
        const postData = {
          ...params,
          ...getValues,
        };
        console.log('验证前：', postData);
        if (validateTab1(postData)) {
          delete postData.imgs;
          const callFunc = postData._id
            ? fetchRight.introduction.update
            : fetchRight.introduction.create;
          const res = await callFunc(postData);
          if (res.data) {
            message.success(res.msg);
          } else {
            message.error(res.msg);
          }
        }
      }
    }
  };

  const onRefresh = async () => {
    loadData(true);
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <div style={{ marginBottom: 20 }}>
          <SaveTime time={params.updateTime} onSave={onSave} onRefresh={onRefresh} />
        </div>

        <Tabs activeKey={tab} onChange={tabsChange}>
          <TabPane tab="个人简介" key="tab1">
            <div className="field-content">
              <Row>
                <Col span={10}>
                  <Form form={formTab1} {...layout} name="params">
                    <Form.Item
                      label="昵称"
                      name="nickName"
                      rules={[
                        { required: true, message: '请输入2-20个字符' },
                        { min: 2, message: '最小2个字符' },
                        { max: 20, message: '最大20个字符' },
                      ]}
                    >
                      <Input autoComplete="off" placeholder="请输入2-20个字符" />
                    </Form.Item>

                    <Form.Item
                      label="简介"
                      name="desc"
                      rules={[
                        { required: true, message: '请输入2-100个字符' },
                        { min: 2, message: '最小2个字符' },
                        { max: 100, message: '最大100个字符' },
                      ]}
                    >
                      <Input autoComplete="off" placeholder="请输入2-100个字符" />
                    </Form.Item>

                    <Form.Item
                      label="标签"
                      name="tags"
                      rules={[{ required: true, message: '请选择标签' }]}
                    >
                      <Select
                        placeholder="请选择标签(多选)"
                        style={{ width: '100%' }}
                        mode="multiple"
                      >
                        {tags.map((item) => (
                          <Option value={item} key={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="展示位置"
                      name="showPosition"
                      rules={[{ required: true, message: '请选择展示位置' }]}
                    >
                      <Select
                        placeholder="请选择展示位置(多选)"
                        style={{ width: '100%' }}
                        mode="multiple"
                      >
                        {showPositionArr.map((item) => (
                          <Option value={item} key={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Form>
                </Col>
                <Col offset={2} span={12}>
                  <div className="field-item">
                    <div className="fields-title">
                      <Badge status="error" text="友情链接: " />
                      <span>(1-4个)</span>
                    </div>
                    <UploadImage
                      showImg={false}
                      showIcon={true}
                      imgs={params.imgs}
                      max={4}
                      onChange={onUploadImageChange}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </TabPane>

          <TabPane tab="广告设置" key="tab2"></TabPane>

          <TabPane tab="推荐设置" key="tab3"></TabPane>
        </Tabs>
      </Card>
    </PageHeaderWrapper>
  );
};

export default Right;

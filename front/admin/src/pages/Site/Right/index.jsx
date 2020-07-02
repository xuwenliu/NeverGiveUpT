import React, { useState, useCallback } from 'react';
import { Card, Tabs, Row, Col, Badge, Input, Select, Form, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const { TabPane } = Tabs;
const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

import SaveTime from '@/components/SaveTime';
import UploadImage from '@/components/UploadImage';
import './index.less';

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

  const tabsChange = (key) => {
    setTab(key);
  };

  const onUploadImageChange = useCallback((imgs) => {
    console.log(imgs);
    setParams((preState) => {
      return {
        ...preState,
        imgs,
      };
    });
  });
  const [formTab1] = Form.useForm();

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }

  const validateTab1 = (postData) => {
    let flag = false;
    const friendLink = postData.imgs;
    console.log(friendLink);
    for (let i in friendLink) {
      console.log(i);
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
  };

  const onSave = async () => {
    console.log('params', params);
    if (tab === 'tab1') {
      const values = await formTab1.validateFields();
      if (values) {
        const postData = {
          ...params,
          ...values,
        };
        if (validateTab1(postData)) {
          console.log(postData);
          
        }
      }
    }
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <div style={{ marginBottom: 20 }}>
          <SaveTime onSave={onSave} />
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
                        {children}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="展示位置"
                      name="showPosition"
                      rules={[{ required: true, message: '展示位置' }]}
                    >
                      <Select
                        placeholder="请选择展示位置(多选)"
                        style={{ width: '100%' }}
                        mode="multiple"
                      >
                        {children}
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

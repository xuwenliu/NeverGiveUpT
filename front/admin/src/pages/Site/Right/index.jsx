import React, { useState, useCallback, useEffect } from 'react';
import {
  Card,
  Tabs,
  Row,
  Col,
  Badge,
  Input,
  Select,
  Form,
  message,
  Table,
  Popconfirm,
  Tooltip,
  Avatar,
  Tag,
  Button,
  Modal,
  Radio,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined, EditOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';

import moment from 'moment';
import copy from 'copy-to-clipboard';

import { showPositions, projects, showPositionsColorObj } from '@/const';

const searchProjects = [
  {
    key: '',
    value: '全部',
  },
  ...projects,
];
const { TabPane } = Tabs;
const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const layoutEdit = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
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

  const [params2, setParams2] = useState({
    imgs: [
      {
        imgUrl: '',
        link: '',
      },
    ],
    showPosition: [],
  });

  const [paramsEdit, setParamsEdit] = useState({
    imgs: [
      {
        imgUrl: '',
        link: '',
      },
    ],
  });

  const [tab, setTab] = useState('tab1');
  const [tags, setTags] = useState([]);

  const [project, setProject] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

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
    switch (tab) {
      case 'tab1':
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
        break;
      case 'tab2':
        const res2 = await fetchRight.ad.query();
        if (isRefresh) {
          message.success('刷新成功');
        }
        const data2 = res2.data;
        if (!data2) return;
        setParams2({
          ...data2,
        });
        formTab2.setFieldsValue({
          ...data2,
        });
        break;

      case 'tab3':
        const res3 = await fetchRight.recommend.query({
          project,
        });
        if (isRefresh) {
          message.success('刷新成功');
        }
        const data3 = res3.data;
        if (!data3) return;
        data3.map((item) => (item.key = item._id));
        setDataSource(data3);

        break;
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  useEffect(() => {
    loadData();
  }, [tab, project]);

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

  const onUploadImageChange2 = useCallback((imgs) => {
    setParams2((preState) => {
      return {
        ...preState,
        imgs,
      };
    });
  });

  const [formTab1] = Form.useForm();
  const [formTab2] = Form.useForm();
  const [formTabEdit] = Form.useForm();

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

  const validateTab2 = (postData) => {
    let flag = false;
    const imgs = postData.imgs;
    for (let i in imgs) {
      if (!imgs[i].imgUrl) {
        message.error(`请上传第${i * 1 + 1}个图片`);
        return (flag = false);
      } else {
        flag = true;
      }
      if (!imgs[i].link) {
        message.error(`请上传第${i * 1 + 1}个跳转链接`);
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

  const validateEdit = (postData) => {
    let flag = false;
    const imgs = postData.imgs;
    for (let i in imgs) {
      if (!imgs[i].imgUrl) {
        message.error(`请上传封面图片`);
        return (flag = false);
      } else {
        flag = true;
      }
      if (!imgs[i].link) {
        message.error(`请输入跳转链接`);
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
    switch (tab) {
      case 'tab1':
        const values = await formTab1.validateFields(); //校验
        if (values) {
          const getValues = formTab1.getFieldsValue(); // 获取最新文本值
          params.friendLink = params.imgs;
          const postData = {
            ...params,
            ...getValues,
          };
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
        break;
      case 'tab2':
        const values2 = await formTab2.validateFields(); //校验
        if (values2) {
          const getValues2 = formTab2.getFieldsValue(); // 获取最新文本值
          const postData2 = {
            ...params2,
            ...getValues2,
          };
          if (validateTab2(postData2)) {
            const callFunc = postData2._id ? fetchRight.ad.update : fetchRight.ad.create;
            const res2 = await callFunc(postData2);
            if (res2.data) {
              message.success(res2.msg);
            } else {
              message.error(res2.msg);
              s;
            }
          }
        }
        break;
      case 'tab3':
        break;
    }
  };

  const onRefresh = async () => {
    loadData(true);
  };

  const time = tab === 'tab1' ? params.updateTime : params2.updateTime;

  const columns = [
    {
      title: '类别',
      dataIndex: 'project',
      key: 'project',
      render: (_, record) => {
        const count = projects[record.project - 1].value;
        let background = '#52c41a';
        if (record.project === '1') {
          background = 'purple';
        }
        if (record.project === '2') {
          background = 'pink';
        }
        return <Badge style={{ background }} count={count}></Badge>;
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        if (record.name.length > 10) {
          return (
            <Tooltip title={record.name}>
              <span>{record.name.slice(0, 10)}...</span>
            </Tooltip>
          );
        }
        return record.name;
      },
    },
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: (_, record) => {
        return <Avatar shape="square" src={record.cover} />;
      },
    },
    {
      title: '链接',
      dataIndex: 'link',
      key: 'link',
      render: (_, record) => {
        return (
          <Tooltip title={record.link}>
            <a onClick={() => copyLink(record.link)}>
              <LinkOutlined color="#2db7f5" />
            </a>
          </Tooltip>
        );
      },
    },

    {
      title: 'Vip',
      dataIndex: 'isVip',
      key: 'isVip',
      render: (_, record) => {
        return record.isVip ? '是' : '否';
      },
    },
    {
      title: '展示位置',
      dataIndex: 'showPosition',
      key: 'showPosition',
      width: 200,
      render: (_, record) => {
        if (record.showPosition.length > 0) {
          let result = [];
          for (let i = 0; i < record.showPosition.length; i += 3) {
            result.push(record.showPosition.slice(i, i + 3));
          }
          return result.map((item, index) => {
            return (
              <div style={{ marginBottom: 10 }} key={index}>
                {item.map((sub) => (
                  <Tag key={sub} color={showPositionsColorObj[sub]}>
                    {sub}
                  </Tag>
                ))}
              </div>
            );
          });
        }
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (_, record) =>
        record.createTime === 0
          ? '-'
          : moment(record.createTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      render: (_, record) =>
        record.updateTime === 0
          ? '-'
          : moment(record.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 100,
      render: (_, record) => {
        return (
          <>
            <Popconfirm
              placement="topLeft"
              title={`你确定删除推荐${projects[record.project - 1].value}【${record.name}】吗？`}
              onConfirm={() => handleRemove(record)}
            >
              <DeleteOutlined style={{ color: '#ff4d4f' }} />
            </Popconfirm>
            <a style={{ marginLeft: 10 }}>
              <EditOutlined onClick={() => handleUpdate(record)} style={{ color: '#1890ff' }} />
            </a>
          </>
        );
      },
    },
  ];
  columns.map((item) => {
    item.align = 'center';
    return item;
  });

  const copyLink = (msg) => {
    copy(msg);
    message.success('复制成功');
  };

  const handleRemove = async (params) => {
    try {
      const res = await fetchRight.recommend.remove({ id: params._id });
      if (res.code === 0) {
        message.success(res.msg);
        loadData();
      }
    } catch (error) {
      message.error('删除失败请重试！');
    }
  };
  const handleUpdate = (params) => {
    params.imgs = [
      {
        imgUrl: params.cover,
        link: params.link,
      },
    ];
    setParamsEdit(params);
    formTabEdit.setFieldsValue({
      ...params,
    });
    setShowModal(true);
  };

  const handleOk = async () => {
    const values = await formTabEdit.validateFields(); //校验
    if (values) {
      const getValues = formTabEdit.getFieldsValue(); // 获取最新文本值
      const postData = {
        ...paramsEdit,
        ...getValues,
      };
      if (validateEdit(postData)) {
        setConfirmLoading(true);
        postData.cover = postData.imgs[0].imgUrl;
        postData.link = postData.imgs[0].link;
        delete postData.imgs;
        const callFunc = postData._id ? fetchRight.recommend.update : fetchRight.recommend.create;
        const res = await callFunc(postData);
        if (res.data) {
          message.success(res.msg);
          setConfirmLoading(false);
          formTabEdit.resetFields();
          setShowModal(false);
          loadData();
        } else {
          setConfirmLoading(false);
          formTabEdit.resetFields();
          message.error(res.msg);
        }
      }
    }
  };
  const handleCancel = () => {
    formTabEdit.resetFields();
    setParamsEdit({
      imgs: null,
    });
    setShowModal(false);
  };

  return (
    <PageHeaderWrapper>
      <Card>
        {tab !== 'tab3' && (
          <div style={{ marginBottom: 20 }}>
            <SaveTime time={time} onSave={onSave} onRefresh={onRefresh} />
          </div>
        )}

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
                        {showPositions.map((item) => (
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

          <TabPane tab="广告设置" key="tab2">
            <Row>
              <Col span={10}>
                <div className="field-item">
                  <div className="fields-title" style={{ marginBottom: 10 }}>
                    <Badge status="error" text="广告图片: " />
                    <span>(1-3个)</span>
                  </div>
                  <UploadImage imgs={params2.imgs} max={3} onChange={onUploadImageChange2} />
                </div>
              </Col>
              <Col offset={2} span={12}>
                <Form form={formTab2} {...layout} name="params2">
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
                      {showPositions.map((item) => (
                        <Option value={item} key={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab="推荐设置" key="tab3">
            <Row>
              <Col span={6}>
                <div className="search">
                  <Badge>推荐项目:</Badge>
                  <Select
                    onChange={(project) => setProject(project)}
                    value={project}
                    style={{ marginLeft: 10, width: '70%' }}
                  >
                    {searchProjects.map((item) => (
                      <Option value={item.key} key={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col offset={16}>
                <Button type="primary" onClick={() => setShowModal(true)}>
                  <PlusOutlined /> 添加
                </Button>
              </Col>
            </Row>
            <Table dataSource={dataSource} columns={columns} pagination={false} />

            <Modal
              title={paramsEdit._id ? '修改推荐' : '添加推荐'}
              visible={showModal}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Form form={formTabEdit} {...layoutEdit} name="paramsEdit">
                <Form.Item
                  label="推荐项目"
                  name="project"
                  rules={[{ required: true, message: '请选择推荐项目' }]}
                >
                  <Select placeholder="请选择推荐项目" style={{ width: '100%' }}>
                    {projects.map((item) => (
                      <Option value={item.key} key={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="名称"
                  name="name"
                  rules={[
                    { required: true, message: '请输入2-50个字符' },
                    { min: 2, message: '最小2个字符' },
                    { max: 50, message: '最大50个字符' },
                  ]}
                >
                  <Input autoComplete="off" placeholder="请输入2-50个字符" />
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
                    {showPositions.map((item) => (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="平台"
                  name="platform"
                  rules={[
                    { required: true, message: '请输入2-20个字符' },
                    { min: 2, message: '最小2个字符' },
                    { max: 20, message: '最大20个字符' },
                  ]}
                >
                  <Input autoComplete="off" placeholder="请输入2-20个字符，例如【爱奇艺】" />
                </Form.Item>

                <Form.Item label="是否需要VIP" name="isVip" initialValue={false}>
                  <Radio.Group>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="封面/链接"
                  name="imgs"
                  rules={[{ required: true, message: '请上传封面和链接' }]}
                >
                  <UploadImage imgs={paramsEdit.imgs} showAction={false} />
                </Form.Item>
              </Form>
            </Modal>
          </TabPane>
        </Tabs>
      </Card>
    </PageHeaderWrapper>
  );
};

export default Right;

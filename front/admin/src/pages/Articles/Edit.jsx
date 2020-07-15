import React, { useEffect, useState, useRef } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Affix,
  Row,
  Col,
  Switch,
  InputNumber,
  message,
} from 'antd';
import SaveTime from '@/components/SaveTime';
import UploadImage from '@/components/UploadImage';
import Editor from 'for-editor';

import './Edit.less';
import { queryCategories } from '@/pages/Categories/service';
import { queryTags } from '@/pages/Tags/service';
import { addArticles, updateArticles, queryArticlesEdit } from './service';
import { upload } from '@/components/UploadImage/service';

import { history } from 'umi';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const selectLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const { Option } = Select;

const ArticlesEdit = (props) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [params, setParams] = useState({
    imgs: null,
    content: '',
    disabled: false,
  });
  const [form] = Form.useForm();
  const editorRef = useRef();

  const loadTagsOrCategories = async (func) => {
    const res = await func();
    if (res.data) {
      const data = res.data.map((item) => item.name);
      if (func === queryTags) {
        setTags(data);
      } else {
        setCategories(data);
      }
    }
  };

  const loadArticlesInfo = async (type, id, isRefresh) => {
    const res = await queryArticlesEdit({ id });
    console.log(res.data);
    if (res.data) {
      const data = res.data;
      setParams({
        ...data,
        content: data.content,
        imgs: [
          {
            imgUrl: data.cover,
          },
        ],
        disabled: type === '3',
      });
      form.setFieldsValue({ ...data });
      if (isRefresh) {
        message.success('刷新成功');
      }
    } else {
      message.error(res.msg);
    }
  };

  useEffect(() => {
    loadTagsOrCategories(queryTags);
    loadTagsOrCategories(queryCategories);
  }, []);

  useEffect(() => {
    const { type, id } = props.match.params;
    if (type !== '1') {
      loadArticlesInfo(type, id);
    }
  }, []);

  const onRefresh = () => {
    const { type, id } = props.match.params;
    if (type !== '1') {
      loadArticlesInfo(type, id, true);
    }
  };

  const onFinish = async (publishStatus) => {
    const values = await form.validateFields(); //校验
    if (values) {
      const getValues = form.getFieldsValue(); // 获取最新文本值
      const postData = {
        ...params,
        ...getValues,
        publishStatus,
        status: 1,
      };
      const callFunc = postData._id ? updateArticles : addArticles;
      const res = await callFunc(postData);
      if (res.code === 0) {
        history.goBack();
        message.success(publishStatus === 1 ? '文章发布成功' : '文章保存草稿成功');
      } else {
        message.error(res.msg);
      }
    }
  };

  const addImg = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await upload(formData);
    if (res) {
      editorRef.current.$img2Url(file.name, res[0].url);
    }
  };
  return (
    <Card>
      <SaveTime time={params.updateTime} onRefresh={onRefresh} onBack={() => history.goBack()} />
      <Form
        form={form}
        className="edit-form"
        name="basic"
        initialValues={{
          isComment: true,
          isLike: true,
          isCollect: false,
          isReward: false,
          views: 1,
          like: 1,
          collect: 1,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          {...layout}
          label="文章标题"
          name="title"
          rules={[
            { required: true, message: '请输入文章标题' },
            { pattern: /.{2,200}/, message: '标题2-200个字符' },
          ]}
        >
          <Input disabled={params.disabled} placeholder="请输入2-200个字符" />
        </Form.Item>

        <Form.Item
          {...layout}
          label="文章简介"
          name="introduction"
          rules={[
            { required: true, message: '请输入文章简介' },
            { pattern: /.{10,500}/, message: '简介10-500个字符' },
          ]}
        >
          <Input.TextArea disabled={params.disabled} placeholder="请输入10-500个字符" rows={5} />
        </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item
              {...selectLayout}
              label="文章封面"
              name="cover"
              rules={[{ required: true, message: '请上传文章封面' }]}
              normalize={(value, prevValue, prevValues) => {
                return value && value[0] ? value[0].imgUrl : '';
              }}
            >
              <UploadImage imgs={params.imgs} showAction={false} showLink={false} />
            </Form.Item>

            <Form.Item
              {...selectLayout}
              label="选个分类"
              name="categories"
              rules={[{ required: true, message: '请选个分类' }]}
            >
              <Select disabled={params.disabled} placeholder="请给文章选个分类">
                {categories.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              {...selectLayout}
              label="贴个标签"
              name="tags"
              rules={[{ required: true, message: '请贴个标签' }]}
            >
              <Select disabled={params.disabled} placeholder="请给文章贴个标签" mode="tags">
                {tags.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item label="评论" name="isComment" valuePropName="checked">
              <Switch disabled={params.disabled} checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
            <Form.Item label="点赞" name="isLike" valuePropName="checked">
              <Switch disabled={params.disabled} checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
            <Form.Item label="收藏" name="isCollect" valuePropName="checked">
              <Switch disabled={params.disabled} checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
            <Form.Item label="打赏" name="isReward" valuePropName="checked">
              <Switch disabled={params.disabled} checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item label="查看数量" name="views">
              <InputNumber disabled={params.disabled} />
            </Form.Item>
            <Form.Item label="点赞数量" name="like">
              <InputNumber disabled={params.disabled} />
            </Form.Item>
            <Form.Item label="收藏数量" name="collect">
              <InputNumber disabled={params.disabled} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="" name="content" rules={[{ required: true, message: '请撰写文章内容' }]}>
          <Editor
            ref={editorRef}
            disabled={params.disabled}
            placeholder="请撰写文章"
            height="auto"
            value={params.content}
            addImg={(file) => addImg(file)}
          />
        </Form.Item>

        <Affix style={{ position: 'fixed', top: document.body.clientHeight / 2 - 100, right: 48 }}>
          <div className="submit-btn">
            <Form.Item>
              <Button onClick={() => onFinish(2)} className="btn">
                保存草稿
              </Button>
            </Form.Item>

            <Form.Item>
              <Button onClick={() => onFinish(1)} className="btn publish">
                发布文章
              </Button>
            </Form.Item>
          </div>
        </Affix>
      </Form>
    </Card>
  );
};

export default ArticlesEdit;

import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {},
  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(fakeAccountLogin, payload);
      if(res.data){
        if (res.code === 0) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userName', res.data.userName);
          history.replace('/articles');
        }
      }else {
        message.error(res.msg);
      }
      
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/admin/login' && !redirect) {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        history.replace({
          pathname: '/admin/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {},
};
export default Model;

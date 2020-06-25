import {
  stringify
} from 'querystring';
import {
  history
} from 'umi';
import {
  fakeAccountLogin
} from '@/services/login';
import {
  setAuthority
} from '@/utils/authority';
import {
  getPageQuery
} from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    * login({
      payload
    }, {
      call,
      put
    }) {
      const res = yield call(fakeAccountLogin, payload);
      console.log(res)
      yield put({
        type: 'changeLoginStatus',
        payload: res,
      }); // Login successfully

      if (res.code === 0) {
        localStorage.setItem("token", res.data.token);
        history.replace('/tags');
      }
    },

    logout() {
      const {
        redirect
      } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, {
      payload
    }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type
      };
    },
  },
};
export default Model;

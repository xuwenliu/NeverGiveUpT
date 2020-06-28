import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/admin/login', {
    method: 'POST',
    data: params,
  });
}


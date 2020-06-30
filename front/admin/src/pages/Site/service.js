

import request from '@/utils/request';

export async function queryHomeConfig(data) {
  return request('/api/config/home', {
    method: 'GET',
    data,
  });
}

export async function addHomeConfig(params) {
  return request('/api/config/home', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateHomeConfig(params) {
  return request('/api/config/home', {
    method: 'put',
    data: {
      ...params,
    },
  });
}


// header footer 配置
export async function queryHeaderFooterConfig(data) {
  return request('/api/config/hf', {
    method: 'GET',
    data,
  });
}

export async function addHeaderFooterConfig(params) {
  return request('/api/config/hf', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateHeaderFooterConfig(params) {
  return request('/api/config/hf', {
    method: 'put',
    data: {
      ...params,
    },
  });
}



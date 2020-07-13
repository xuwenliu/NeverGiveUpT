import request from '@/utils/request';
import {
  replacePage
} from '@/utils/utils';

export async function queryArticles(params) {
  const res = await request('/api/articles', {
    params: replacePage(params),
  });
  return new Promise((resolve, reject) => {
    if (res.code === 0) {
      res.data && resolve({
        data: res.data.list,
        current: res.data.page,
        total: res.data.totalCount,
        success: true,
        pageSize: res.data.pageSize,
      })
    } else {
      resolve({
        data: [],
        current: params.current,
        total: 0,
        success: false,
        pageSize: params.pageSize
      })
    }

  });
}

export async function addArticles(params) {
  return request('/api/articles', {
    method: 'POST',
    data: {
      ...params
    },
  });
}


export async function removeArticles(params) {
  return request('/api/articles', {
    method: 'delete',
    data: {
      ...params,
    },
  });
}

export async function updateArticles(params) {
  return request('/api/articles', {
    method: 'put',
    data: {
      ...params,
    },
  });
}

export async function updateArticlesStatus(params) {
  return request('/api/articles/status', {
    method: 'put',
    data: {
      ...params,
    },
  });
}

export async function updateArticlesPublishStatus(params) {
  return request('/api/articles/publishStatus', {
    method: 'put',
    data: {
      ...params,
    },
  });
}

export async function updateSort(params) {
  return request('/api/articles/sort', {
    method: 'put',
    data: {
      ...params,
    },
  });
}






// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/admin',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/admin/login',
          component: './Login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              name: 'list.tags',
              icon: 'tags',
              path: '/tags',
              component: './Tags',
            },
            {
              name: 'list.categories',
              icon: 'cluster',
              path: '/categories',
              component: './Categories',
            },
            {
              name: 'list.about',
              icon: 'heart',
              path: '/about',
              component: './About',
            },
            {
              name: 'list.user',
              icon: 'user',
              path: '/user',
              component: './User',
            },
            {
              name: 'list.site',
              icon: 'setting',
              path: '/site',
              routes:[
                {
                  name: 'site-home',
                  icon: 'home',
                  path: '/site/home',
                  component: './Site/Home',
                },
                {
                  name: 'site-header-footer',
                  icon: 'columnHeight',
                  path: '/site/hf',
                  component: './Site/HeaderFooter',
                },
                {
                  name: 'site-right',
                  icon: 'picRight',
                  path: '/site/right',
                  component: './Site/Right',
                }
              ]
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});

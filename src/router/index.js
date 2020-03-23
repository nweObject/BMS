import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Main from '@/views/view2/Main'
import ManageMain from '@/views/view1/ManageMain'
import findProject from '@/views/view2/findProject'
import personCenter from '@/views/view1/personCenter'
import borrowingRecords from '@/views/view2/borrowingRecords'
import findProject2 from '@/views/view1/findProject2'
import addBook from '@/views/view1/addBook'
import lostBook from '@/views/view1/lostBook'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      meta: { title: '系统首页' },
      redirect: {name: 'findProject'},
      children: [
        {
          path: '/1',
          name: 'findProject',
          component: findProject
        },  
        {
          path: '/3',
          name: 'borrowingRecords',
          component: borrowingRecords
        }  
      ]
    },
    {
      path: '/ManageMain',
      name: 'ManageMain',
      component: ManageMain,
      redirect: {name: 'findProject2'},
      children: [
        {
          path: '/11',
          name: 'findProject2',
          component: findProject2
        },
        {
          path: '/22',
          name: 'personCenter',
          component: personCenter
        },
        {
          path: '/33',
          name: 'addBook',
          component: addBook
        },
        {
          path: '/44',
          name: 'lostBook',
          component: lostBook
        }
      ]
    },   
    
  ]
})
// const frameIn = [
//   // 首页
//   {
//     path: '/',
//     redirect: { name: 'index' },
//     component: () => import('@/components/core/d2-layout-main'),
//     children: [
//       {
//         path: 'index',
//         name: 'index',
//         meta: { ...auth, title: '系统首页' },
//         component: () => import('@/pages/core/index')
//       }
//     ]
//   },
//   {
//     path: '/setting',
//     name: 'core-setting',
//     meta: { ...auth, title: '设置' },
//     redirect: { name: 'core-setting-copanyinfo' },
//     component: () => import('@/components/core/d2-layout-main'),
//     children: (pre => [
//       {
//         path: 'copanyinfo', name: `${pre}copanyinfo`, component: () => import('@/pages/core/setting/companyinfo'), meta: { title: '企业信息' }
//       },
//       {
//         path: 'personinfo', name: `${pre}personinfo`, component: () => import('@/pages/core/setting/personinfo'), meta: { title: '个人中心' }
//       },
//       {
//         path: 'dict-item',
//         name: 'item-index',
//         redirect: { name: 'dict-page-list' },
//         component: () => import('@/pages/module-dict/item'),
//         meta: { title: '业务字典' },
//         children: [{
//           path: 'dict-page-list',
//           name: 'dict-page-list',
//           component: () => import('@/pages/module-dict/item/dict-item-page'),
//           meta: { title: '字典列表' }
//         },
//         {
//           path: 'dict-page-add',
//           name: 'dict-page-add',
//           component: () => import('@/pages/module-dict/item/dict-item-add'),
//           meta: { title: '新增字典' },
//           props: true
//         },
//         {
//           path: 'dict-page-edit',
//           name: 'dict-page-edit',
//           component: () => import('@/pages/module-dict/item/dict-item-add'),
//           meta: { title: '编辑字典' },
//           props: true
//         }]
//       },
//       {
//         path: 'config',
//         name: 'config',
//         component: () => import('@/pages/module-config/index'),
//         meta: { title: '系统配置' }
//       }
//     ])('core-setting-')
//   },
//   ...moduleRoutes
// ]

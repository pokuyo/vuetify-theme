export default [
  {
    path: '/sample/datatable',
    name: 'datatable',
    component: () => import('@/views/pages/sample-group/SampleDataTable.vue'),
  },
  {
    // pagination test
    path: '/sample/datatabletest',
    name: 'datatabletest',
    component: () => import('@/views/pages/sample-group/SampleDataTablePageTest.vue'),
  },
]

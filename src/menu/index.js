export const constantMenuMap = [{
  name: 'example',
  meta: {
    title: 'example',
    icon: 'table',
    isFirstParent: true
  },
  hidden: false,
  children: [
    {
      name: 'indexDemo',
      meta: {
        title: 'indexDemo',
        firstParent: 'example'
      }
    },
    {
      name: 'indexDemoMul',
      meta: {
        title: 'indexDemoMul',
        noCache: true
      }
    }, {
      name: 'dialogDemo',
      meta: {
        title: 'dialogDemo',
        firstParent: 'example'
      }
    }, {
      name: 'treeSearchDemo',
      meta: {
        title: 'treeSearchDemo',
        firstParent: 'example'
      }
    }, {
      name: 'tableTabsDemo',

      meta: {
        title: 'tableTabsDemo',
        noCache: true
      }
    }]
}]

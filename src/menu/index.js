export const constantMenuMap = [
  {
    name: 'example',
    meta: {
      title: 'example',
      icon: 'table',
      isFirstParent: true
    },
    hidden: false,
    children: [{
      name: 'indexDemo',
      meta: {
        title: 'indexDemo',
        firstParent: 'example'
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
      name: 'spanTableDemo',
      meta: {
        title: 'spanTableDemo',
        firstParent: 'example'
      }
    }, {
      name: 'spanTableThDemo',
      meta: {
        title: 'spanTableThDemo',
        firstParent: 'example'
      }
    }, {
      name: 'editSpanTableDemo',
      meta: {
        title: 'editSpanTableDemo',
        firstParent: 'example'
      }
    }, {
      name: 'timeLineDemo',
      meta: {
        title: 'timeLineDemo',
        firstParent: 'example'
      }
    }]
  },
  {
    name: 'event',
    meta: {
      title: 'event',
      icon: 'table',
      isFirstParent: true
    },
    hidden: false,
    children: [
      {
        name: 'createEvent',
        meta: {
          title: 'createEvent',
          firstParent: 'event'
        }
      },
      {
        name: 'eventList',
        meta: {
          title: 'eventList',
          firstParent: 'event'
        }
      },
      {
        name: 'approveOrderManage',
        meta: {
          title: 'approveOrderManage',
          firstParent: 'event'
        }
      },
      {
        name: 'parameter',
        meta: {
          title: 'parameter',
          firstParent: 'event'
        }
      },
      {
        name: 'approve',
        meta: {
          title: 'approve',
          firstParent: 'event'
        }
      },
      {
        name: 'reporting',
        meta: {
          title: 'reporting',
          firstParent: 'event'
        }
      },
    ]
  },
  {
    name: 'DMCevent',
    meta: {
      title: 'DMCevent',
      icon: 'table',
      isFirstParent: true
    },
    hidden: false,
    children: [
      {
        name: 'DMCcreateEvent',
        meta: {
          title: 'DMCcreateEvent',
          firstParent: 'DMCevent'
        }
      },
      {
        name: 'DMCEventList',
        meta: {
          title: 'DMCEventList',
          firstParent: 'DMCevent'
        }
      },
      {
        name: 'DMCinquiryList',
        meta: {
          title: 'DMCinquiryList',
          firstParent: 'DMCevent'
        }
      },
    ]
  }
]

<template>
    <div class="container">
        <div class="bs-new-container app-container">
            <bs-form ref="bsForm" :form="form"></bs-form>
            <!-- <bs-table ref="bsTable" :mainData="mainData" @fileCallback="fileCallback"></bs-table> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'personnelManagement',
    data () {
        return {
            form: {
                moreShowFlg: true,
                listQuery: {
                    current: 1,
                    size: 20,
                    isPage: true,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    funcModule: this.$t('route.' + this.$route.meta.title),
                    funcOperation: this.$t('biz.btn.search'),
                    defaultSortString: 'createDate.desc',
                    data: {}
                },
                formData: [
                    {
                        label: '姓名',
                        prop: 'name',
                        element: 'input-validate',
                        attrs: {
                            isDefault: true,
                            clearable: false
                        }
                    },
                    {
                        label: '部门',
                        prop: 'orderStatus',
                        element: 'base-select',
                        list: this.$t('datadict.basicOrderStatus'),
                        attrs: {
                            isDefault: true,
                            clearable: false
                        }
                    },
                    {
                        label: '工号',
                        prop: 'customerName',
                        element: 'input-validate',
                        attrs: {
                            isDefault: true,
                            clearable: false
                        }
                    }
                ]
            },
            // mainData: {
            //     api: {
            //         search: '/api/register/signupContact/page',
            //         doDelete: '/api/register/signupContact/remove',
            //         export: '/api/register/signupContactCol/exportModel',
            //         set: '/api/register/signupContact/resetPwd'
            //     },
            //     initSearch: false,
            //     isTopBar: true,
            //     topBar: [
            //         {
            //             name: 'add',
            //             type: 'route',
            //             event: this.toAddSetting
            //         },
            //         {
            //             name: 'update',
            //             type: 'route',
            //             event: this.toUpdateSetting
            //         },
            //         {
            //             name: 'view',
            //             type: 'route',
            //             event: this.toViewSetting
            //         },
            //         {
            //             name: 'remove',
            //             getParam: () => {
            //                 return this.$refs.bsTable.currentRow.id
            //             }
            //         },
            //         {
            //             name: 'set',
            //             permitName: ['audit'],
            //             url: '/api/register/signupContact/auditing',
            //             successMsgInfo: '审核完成',
            //             i18n: '审核通过',
            //             getParam: () => {
            //                 return {
            //                     id: this.$refs.bsTable.currentRow.id,
            //                     checkFlag: '1'
            //                 }
            //             }
            //         },
            //         {
            //             name: 'set',
            //             permitName: ['audit'],
            //             url: '/api/register/signupContact/auditing',
            //             successMsgInfo: '审核完成',
            //             i18n: '审核不通过',
            //             getParam: () => {
            //                 return {
            //                     id: this.$refs.bsTable.currentRow.id,
            //                     checkFlag: '2'
            //                 }
            //             }
            //         },
            //         {
            //             name: 'set',
            //             permitName: ['unlock'],
            //             i18n: 'biz.btn.unlock',
            //             url: '/api/register/signupContact/unlock',
            //             successMsgInfo: '解锁成功',
            //             getParam: () => {
            //                 return this.$refs.bsTable.currentRow.id
            //             }
            //         },
            //         {
            //             name: 'export',
            //             i18n: 'biz.btn.downloadTemplate',
            //             event: this.exportExcel
            //         },
            //         {
            //             name: 'upload',
            //             iconName: 'import',
            //             i18n: 'biz.btn.import',
            //             atrrs: {
            //                 uploadUrl: process.env.BASE_API + '/api/register/signupContactCol/exportImport', // 文件上传url
            //                 showFileList: false, // 是否展示上传文件，默认false
            //                 accept: '*', // 初始化文件选择类型，默认*
            //                 multiple: false, // 是否可选择多文件，默认false
            //                 disabled: false, // 是否不可操作，默认false
            //                 notifyFlag: false, // 是否弹出通知，默认true
            //                 paramData: {} // 参数，默认{}
            //             }
            //         },
            //         {
            //             name: 'export'
            //         },
            //         {
            //             name: 'refresh'
            //         }
            //     ],
            //     isColset: true,
            //     table: {
            //         cols: [
            //             {
            //                 prop: 'code',
            //                 label: 'website.signupContact.list.code',
            //                 width: 120
            //             },
            //             {
            //                 prop: 'personnelCode',
            //                 label: 'website.signupContact.list.personnelCode',
            //                 width: 120
            //             },
            //             {
            //                 prop: 'contactType',
            //                 label: 'website.signupContact.list.contactType',
            //                 align: 'center',
            //                 format: {
            //                     dict: this.$t('datadict.contantType')
            //                 },
            //                 width: 120
            //             },
            //             {
            //                 prop: 'name',
            //                 label: 'website.signupContact.list.name',
            //                 width: 120
            //             }
            //         ]
            //     },
            //     bottomBar: {
            //         pagination: {
            //             show: true,
            //             layout: 'total, sizes, prev, pager, next, jumper',
            //             pageSizes: [20, 40, 60, 80, 100]
            //         }
            //     }
            // }
        }
    },
    created () { },
    mounted () { },
    methods: {},
}
</script>

<style scoped lang="scss">

</style>

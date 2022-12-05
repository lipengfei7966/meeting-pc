<template>
    <div class="container">
        <el-row>
            <el-col :span="24">
                <div class="pro_title">{{ title }}</div>
                <el-divider></el-divider>
                <slot></slot>
            </el-col>
        </el-row>
    </div>
</template>

<script>

export default {
    name: 'commonSlot',
    props: ['title'],
    data () {
        return {

        }
    },
    created () { },
    mounted () { },
    methods: {},
}
</script>

<style scoped lang="scss">
.pro_title {
    font-size: 18px;
    color: #000;
    font-weight: 600;
    line-height: 20px;
    padding-left: 16px;
    position: relative;
    padding-top: 18px;

    &::before {
        content: '';
        position: absolute;
        left: 0px;
        height: 18px;
        width: 6px;
        background: #3e6db5;
        border-radius: 3px;
        top: 50%;
        margin-top: 0px;
        margin-right: 10px;
    }

}

.el-divider--horizontal {
    margin: 8px 0;
    background: 0 0;
    background: 0 0;
    border-top: 2px solid #d7d7d8;
}
</style>

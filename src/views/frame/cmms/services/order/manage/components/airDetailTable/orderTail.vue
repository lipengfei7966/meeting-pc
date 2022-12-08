<template>
    <div class="orderTailContainer">
        <div class="timeLime">
            <div class="timeLine-top">
                <div class="datatime">111</div>
                <div class="doing">222</div>
            </div>
            <div class="timeLine-down">
                <div class="line"></div>
                <div class="info">444444</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderTail',
    data () {
        return {
            // activities: [{
            //     content: '活动按期开始',
            //     timestamp: '2018-04-15'
            // }, {
            //     content: '通过审核',
            //     timestamp: '2018-04-13'
            // }, {
            //     content: '创建成功',
            //     timestamp: '2018-04-11'
            // }]
        }
    },
    created () { },
    mounted () { },
    methods: {},
}
</script>

<style scoped lang="scss">
.orderTailContainer {
    padding: 15px 15px 0 15px;
}

.timeLime {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 200px;
    background-color: #ccc;
    padding-bottom: 20px;

    .timeLine-top {
        display: flex;
        height: 15px;
        margin-bottom: 5px;

        .datatime {

            width: 155px;
            padding-right: 40px;
        }

        .doing {
            flex: 1;
        }
    }

    .timeLine-down {
        flex: 1;
        display: flex;

        .line {
            height: 100%;
            width: 155px;
            padding-right: 40px;
            padding-left: 7px;
            border-left: 1px solid #000;
        }

        .info {
            flex: 1;
        }
    }
}
</style>

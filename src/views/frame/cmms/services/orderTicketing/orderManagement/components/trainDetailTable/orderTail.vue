<template>
    <div class="orderTailContainer">
        <div class="timeLime" v-for="(item, index) in 2" :key="index">
            <div class="timeLine-top">
                <div class="datatime">
                    <div class="crile doingColor"></div>
                    <div class="time">2022-11-13/周日</div>
                </div>
                <div class="doing">15:00 办理退票(授信支付)</div>
            </div>
            <div class="timeLine-down">
                <div class="line"></div>
                <div class="info">
                    <div class="status">张三 （中国居民身份证 632521199802280625）</div>
                    <div class="status">刘虎 （中国居民身份证 632521199802280625）</div>
                </div>
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
    // height: 200px;
    // background-color: #ccc;
    padding-bottom: 20px;

    .timeLine-top {
        display: flex;
        height: 15px;
        margin-bottom: 10px;

        .datatime {
            width: 200px;
            padding-right: 40px;
            display: flex;

            .crile {
                width: 15px;
                height: 15px;
                background-color: #aaaaaa;
                border-radius: 50%;
                margin-right: 20px;
            }

            .doingColor {
                background-color: #3590f6;
            }

            .time {
                font-size: 14px;
            }
        }

        .doing {
            flex: 1;
        }
    }

    .timeLine-down {
        flex: 1;
        display: flex;

        .line {
            height: 60px;
            width: 1px;
            padding-right: 193px;
            margin-left: 7px;
            border-left: 1px solid #7f7f7f;
        }

        .info {
            flex: 1;
        }
    }
}
</style>


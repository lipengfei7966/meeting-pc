<template>
    <div class="container">
        <Details detailTitle="火车票订单详情" status="train" />
    </div>
</template>

<script>
import Details from './components/details.vue'
export default {
    components: { Details },
    name: 'trainTicketDetails',
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

</style>

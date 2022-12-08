<template>
    <div class="container">
        <Details detailTitle="机票订单详情" status="air" />
    </div>
</template>

<script>
import Details from './components/details.vue'
export default {
    components: { Details },
    name: 'airTicketDetails',
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

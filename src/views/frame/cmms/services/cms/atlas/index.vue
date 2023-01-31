<template>
  <div>
    <altasTemp :delFlag="delFlag"></altasTemp>
  </div>
</template>
<script>
import altasTemp from './components/altasTemp'
export default {
  name: 'atlasManagement',
  components:{
    altasTemp
  },
  data(){
    return {
      delFlag:true
    }
  },
  mounted(){

  },
  methods:{
    cancel(){

    },
    handleOK(selectRow){

    }
  }
}
</script>

<style scoped>


</style>

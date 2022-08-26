<template>
  <main>
    <span v-for="menu in routerLs" :key="menu.name">
      <span v-if="!menu.hidden" style="display:inline-block;margin:5px">
        <el-button @click="gotourl(menu)">
          {{menu.meta.title}}
        </el-button>
      </span>
    </span>
  </main>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'listmenu',
  data() {
    return {
      routerLs: []
    }
  },

  beforeMount() {
    this.routerLs = this.noLayoutRoutes
  },
  computed: {
    ...mapGetters(['noLayoutRoutes'])
  },
  methods: {
    gotourl(menu) {
      const { href } = this.$router.resolve({
        name: menu.name
      })
      window.open(href, '_blank')
    }
  }
}
</script>

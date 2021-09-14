<template id="appTabbar">
  <v-ons-page>  
    <v-ons-tabbar position="bottom" :tabs="menuPages" :index.sync="activeIndex">
      <template slot="pages">
        <component v-for="tab in menuPages" :is="tab.ipage" :key="tab.label" :page-stack="pageStack"></component>
      </template>
    </v-ons-tabbar>
  </v-ons-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            
        }
    },
    computed:{
        ...mapState({
            activeIndex : state => state.tabbar.activeIndex,
            pageStack : state => state.navigator.pageStack,
            menuPages : state => state.menuPages,        
        })
    },
}
</script>
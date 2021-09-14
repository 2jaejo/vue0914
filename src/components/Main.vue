<template>
    <v-ons-splitter>
      
    <v-ons-splitter-side
      swipeable width="150px" collapse="" side="left"
      :open.sync="openSide"
      @preclose="close"
    >
      <v-ons-page>
        
        <v-ons-list>
            <v-ons-list-header>menu</v-ons-list-header>
            <v-ons-list-item v-for="(page,index) in menuPages" :key="page.label"
                tappable 
                modifier="chevron"
                :options="{animation: 'fade'}"
                @click="tab(index); close();"
            >
                <!-- @click="push(page.ipage); close();" -->
                <!-- @click="pageStack = [page.ipage]; close()" -->
                <div class="center">{{ page.label }}</div>
            </v-ons-list-item>
        </v-ons-list>

      </v-ons-page>
    </v-ons-splitter-side>

    <v-ons-splitter-content>
      <v-ons-navigator 
        :page-stack="pageStack"  
        :options="{animation: 'fade'}"
      >
        <!-- <component v-for="page in pageStack" 
          :is="page" 
          :key="page.label" 
          :open-menu="() => {openSide = true}"
        > -->
          <!-- @push="pageStack.push($event)"  -->
          <!-- @pop="pageStack.pop()"  -->
        
        <!-- </component> -->
        
      </v-ons-navigator>
    </v-ons-splitter-content>

  </v-ons-splitter>
</template>

<script>
// import Page1 from '../views/Page1.vue'
// import Page2 from '../views/Page2.vue'
// import Page3 from '../views/Page3.vue'
import { mapState } from 'vuex'


export default {
  
    components: {
        // Page1: Page1,
        // Page2: Page2,
        // Page3: Page3,  
    },
    data() {
        return {
            // menuPages: [
            //   {label:'page1', ipage: Page1}, 
            //   {label:'page2', ipage: Page2}, 
            //   {label:'page3', ipage: Page3},
            // ],
            // pageStack:[Page1],
        };
    },
    computed:{
      ...mapState({
        openSide : state => state.splitter.openSide,
        pageStack : state => state.navigator.pageStack, 
        menuPages : state => state.menuPages,
      })
    },
    methods:{
     
      close(){
        this.$store.dispatch('splitter/isClose');
      },
 
      tab(index){
        this.$store.dispatch('tabbar/tab',index);
      }
    }
}
</script>
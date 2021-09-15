<template>
    <v-ons-navigator 
        :page-stack="pageStack"  
        :options="{animation: 'fade'}"
    >
    </v-ons-navigator>
</template>
<script>
import { mapState } from 'vuex'
//import Company from '../views/Company'

export default {
  
    components: {
   
    },
    data() {
        return {
           
        };
    },
    computed:{
      // pageStack() {
      //   console.log('--------------- start --------------');
      //   console.log(this.$store.state.navigator.pageStack);
      //   console.log(this.$store.state.navigator.pageStack.length);
      //   console.log('--------------- end ----------------');

      //   if(this.$store.state.navigator.pageStack.length > 1) {
           
      //      var pageToPush = {
      //             extends: Company,
      //             data(){
      //                 return{
      //                     title: '3002',
      //                     back:'업체'  
      //                 }
      //             }
      //      }

      //     this.$store.dispatch('navigator/popPage');
      //     this.$store.dispatch('navigator/pushPage',pageToPush);
      //     console.log('NO!!!!');
      //     return this.$store.state.navigator.pageStack;
      //   } else {
      //     return this.$store.state.navigator.pageStack;
      //   }
        
      // }
      ...mapState({   
        pageStack : state => state.navigator.pageStack, 
      })
    },
    methods:{

    }
}
</script>
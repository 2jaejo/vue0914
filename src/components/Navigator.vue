<template>
    <v-ons-navigator 
        :page-stack="pageStack"  
        :options="{animation: 'fade'}"
    >
    </v-ons-navigator>
</template>
<script>
import { mapState } from 'vuex'


export default {
  
    components: {
   
    },
    data() {
        return {
           
        };
    },
    computed:{
      ...mapState({   
        pageStack : state => state.navigator.pageStack, 
      })
    },
    methods:{
    
    }
}
</script>
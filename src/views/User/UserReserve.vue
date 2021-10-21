<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button></v-ons-back-button>
            </div>
            <div class="center">{{ title }}</div>
        </v-ons-toolbar>
        
       
    </v-ons-page>
</template>

<script>


export default {
    components: { 

    },
    computed:{
      
    },
    methods: {
        push(e) {
            
            var pageToPush = {
                extends: e,
                data(){
                    return{
                        title: '상세지역',
                        back:'진료예약' 
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        }
    }
}
</script>
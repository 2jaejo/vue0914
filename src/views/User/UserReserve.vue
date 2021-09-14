<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center">{{ title }}</div>
        </v-ons-toolbar>
        
        <div>
            <v-ons-list v-for="loc in $store.state.user.location" :key="loc.loc_nm" style="margin:1px;">
                <v-ons-list-item modifier="chevron" tappable
                    v-if="loc.loc_cde.length < 2 " 
                    @click="push(loc.loc_cde)"
                >
                {{loc.loc_nm}}
                </v-ons-list-item>    
            </v-ons-list>
        </div>

    </v-ons-page>
</template>

<script>
import DLoc from './UserReserveDLoc.vue'
import FLoc from './UserReserveFLoc.vue'
//import { mapState } from 'vuex'

export default {
    components: { 

    },
    computed:{
       // ...mapState('user',['location'])
    },
    methods: {
        push(e) {
            const getMenu = (type)=>{
                switch(type){
                    case 'D':
                        return DLoc;
                    case 'F':
                        return FLoc;
                }
            }
            var pageToPush = {
                extends: getMenu(e),
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
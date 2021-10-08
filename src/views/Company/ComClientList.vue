<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button>{{ back }}</v-ons-back-button>
        </div>
        <div class="center"><b>{{ title }}</b></div>
        </v-ons-toolbar>
        <div class="content">
            <v-ons-list> 
                <v-ons-list-item
                    modifier="chevron"
                    tappable
                    v-for="cli in clientList" :key="cli.HOS_iD"
                    style="padding-left:2%;"
                    @click="getClientInfo(cli)"
                >
                    {{cli.HOS_NM}}
                </v-ons-list-item>
            </v-ons-list>
        </div>
   
    </v-ons-page>
</template>

<script>
import { mapState } from 'vuex'
import ComClientInfo from '../Company/ComClientInfo.vue'

export default {
    created(){
        this.$store.dispatch('companyStore/clientList',this.nbr);
    },
    components: { 

    },
    computed:{
        ...mapState({
            clientList : state => state.companyStore.clientList
        })
    },
    data(){
        return{
            
        }
    },
    methods: {
        getClientInfo(cli){
            var pageToPush = {
                extends: ComClientInfo,
                data(){
                    return{
                        title:cli.HOS_NM,
                        back:'',
                        cli, 
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        }    
    }
}
</script>
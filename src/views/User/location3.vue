<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button></v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
        </v-ons-toolbar>

        <div class="content">
            <ul class="list">
                <li class="list-item list-item--chevron"
                    v-for="hos in hospitallist" :key="hos.HOS_ID"
                    @click="push(hos)"
                >   
                    <div class="list-item__center list-item--chevron__center">
                        {{hos.HOS_NM}}
                    </div>
                </li>   
            </ul>
        </div>
    
    </v-ons-page>
</template>

<script>
import axios from 'axios'
import UserOrder from './UserOrder.vue'

export default {
    components: { 

    },
    created(){
        let data ={
            loc_cde: this.loc.LOC_CDE
        }
        axios.post('http://49.50.160.174/user/hoslist',{
            data
        })
        .then(res => {
            this.hospitallist = res.data.list;
        })
        .catch(err => {
            console.log('catch : '+err);
        });
    },
    data(){
        return{
            hospitallist:{},
        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        },
        push(hos) {
            var pageToPush = {
                extends: UserOrder,
                data(){
                    return{
                        title: hos.HOS_NM,
                        hos:hos
                    }
                }
            }
            this.$store.dispatch('navigator/pushPage',pageToPush);
        },
    }
}
</script>
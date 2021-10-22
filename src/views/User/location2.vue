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
                    v-for="loc in locationlist" :key="loc.LOC_CDE"
                    @click="push(loc)"
                >   
                    <div class="list-item__center list-item--chevron__center">
                        {{loc.LOC_NM}}
                    </div>
                </li>    
            </ul>
        </div>
    
    </v-ons-page>
</template>

<script>
import axios from 'axios'
import location3 from './location3.vue'

export default {
    components: { 

    },
    created(){
        let data ={
            loc_cde: this.loc.LOC_CDE
        }
        axios.post('http://49.50.160.174/user/guloclist',{
            data
        })
        .then(res => {
            this.locationlist = res.data.list;
        })
        .catch(err => {
            console.log('catch : '+err);
        });
    },
    data(){
        return{
            locationlist:{},
        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        },
        push(loc) {

            var pageToPush = {
                extends: location3,
                data(){
                    return{
                        title: loc.LOC_NM,
                        loc:loc
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        },
    }
}
</script>
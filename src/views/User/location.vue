<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button>{{ back }}</v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
        </v-ons-toolbar>

        <div class="content">
            <ul class="list">
                <li class="list-header">
                    지역
                </li>    
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
import location2 from './location2.vue'

export default {
    components: { 

    },
    created(){
        axios.get('http://49.50.160.174/user/siloclist',{
            
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
            locationlist:[],
        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        },
        push(loc) {

            var pageToPush = {
                extends: location2,
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
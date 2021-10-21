<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button>{{ back }}</v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
        </v-ons-toolbar>
        
        <div class="content">
            <v-ons-list>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-input placeholder="Search somthing" 
                            float 
                            type="text" 
                            style="width:96%; margin:20px auto 0px auto;"
                            modifier="underbar"
                            v-model="keyword"
                            @keyup.enter="search"
                            maxlength="50"
                        >
                        </v-ons-input>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-button class="search-btn-large" modifier="large" @click="search">검색</v-ons-button>
                    </div>
                </v-ons-list-item>
            </v-ons-list>

            <v-ons-list>
                <v-ons-list-item 
                    v-for="hos in hoslist" :key="hos.HOS_ID"
                    modifier="chevron"
                    @click="push(hos)"
                >
                    <div class="list-item__title">
                        {{hos.HOS_NM}}
                    </div>
                    <div class="list-item__subtitle" style="text-align: left;">
                        {{hos.ADDR_MST}}
                    </div>
                </v-ons-list-item>
            </v-ons-list>    
        </div>
    
    </v-ons-page>
</template>

<script>
import axios from 'axios'
import UserSearchHospitalTwo from './UserSearchHospitalTwo.vue'

export default {
    components: { 

    },
    created(){
      
    },
    data(){
        return{
           keyword:'',
           hoslist:{},
        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        },
        push(hos) {

            var pageToPush = {
                extends: UserSearchHospitalTwo,
                data(){
                    return{
                        title: hos.HOS_NM,  
                        hos:hos    
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        },
        search(){
            let data = {
                keyword:this.keyword
            };
            axios.post('http://49.50.160.174/user/searchhos',{
                data
            })
            .then(res => {
                this.hoslist = res.data.list;
            })
            .catch(err => {
                console.log('catch : '+err);
            });


        }
    }
}
</script>
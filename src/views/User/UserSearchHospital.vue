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
                        <select class="long-select select-input select-input--underbar"
                            @change="getSubLoc()" 
                            v-model="sel_loc"
                            style="margin-top:10px;"
                        >
                            <option v-for="loc in locList" :value="loc.LOC_CDE" :key="loc.LOC_CDE">
                                {{loc.LOC_NM}}
                            </option>
                        </select>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <select class="long-select select-input select-input--underbar"     
                            v-model="sel_subloc"
                            @change="search()" 
                        >
                            <option v-for="loc in locSubList" :value="loc.LOC_CDE" :key="loc.LOC_CDE">
                                {{loc.LOC_NM}}
                            </option>
                        </select>
                    </div>
                </v-ons-list-item>


                <v-ons-list-item>
                    <div class="center">
                        <v-ons-input placeholder="병원명" 
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
import UserSearchHospital2 from './UserSearchHospital2.vue'

export default {
    components: { 

    },
    created(){
        this.menu = this.title;

        axios.get('http://49.50.160.174/user/siloclist',{
            
        })
        .then(res => {
            this.locList = res.data.list;
            this.sel_loc = res.data.list[0].C;

            let data = {
                loc_cde : res.data.list[0].C
            }
            axios.post('http://49.50.160.174/user/guloclist',{
                data
            })
            .then(res => {
                this.locSubList = res.data.list;
                this.sel_subloc = res.data.list[0].LOC_CDE;
                this.search();
            })
            .catch(err => {
                console.log('catch : '+err);
            });

        })
        .catch(err => {
            console.log('catch : '+err);
        });


    },
    data(){
        return{
            menu:'',

            locList:[],
            sel_loc:'',

            locSubList:[],
            sel_subloc:'',

            keyword:'',
            hoslist:{},
        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        },
        push(hos) {
            let menu = this.menu;

            var pageToPush = {
                extends: UserSearchHospital2,
                data(){
                    return{
                        title: hos.HOS_NM,  
                        hos:hos,
                        menu: menu 
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        },

        getSubLoc(){
            let data ={
                loc_cde : this.sel_loc
            }
            axios.post('http://49.50.160.174/user/guloclist',{
                data
            })
            .then(res => {
                this.locSubList = res.data.list;
                this.sel_subloc = res.data.list[0].LOC_CDE;
                this.search();
            })
            .catch(err => {
                console.log('catch : '+err);
            });
        },

        search(){
            let data = {
                loc_cde:this.sel_subloc,
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
        },
    }
}
</script>
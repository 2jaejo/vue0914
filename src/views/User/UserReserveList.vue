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
                        <v-ons-input type="date" modifier="underbar" v-model="res_dt"></v-ons-input>
                    </div>
                </v-ons-list-item>
                
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-button modifier="large" @click="search">검색</v-ons-button>
                    </div>
                </v-ons-list-item>
            </v-ons-list> 

            <v-ons-list>
                <v-ons-list-item 
                    expandable
                    v-for="res in res_list" :key="res.RES_ID"
                >
    
                    <div class="list-item__title">
                        {{res.RES_DT}} / {{res.RES_TIME}}
                    </div>
                    <div class="list-item__subtitle" style="text-align: left;">
                        {{res.HOS_NM}}
                    </div>
               
                    <div class="expandable-content">
                        <ul class="list">
                            <li class="list-item list-item">
                                <div class="list-item__center">
                                    <div>증상</div>
                                    <div>{{res.REMRK}}</div>
                                </div>      
                            </li>
                        </ul>
                        <ul class="list">
                            <li class="list-item list-item">
                                <div class="list-item__center">
                                    <v-ons-button class="del-btn" style="width:100%;" @click="reserveCancel(res)">예약취소</v-ons-button>
                                </div>      
                            </li>
                        </ul>   
                    </div>
                </v-ons-list-item>
            </v-ons-list>
                  
        </div>
    </v-ons-page>
</template>

<script>
import dayjs from 'dayjs'
import axios from 'axios'

export default {
    components: { 

    },
    created(){
        this.res_dt = dayjs().format('YYYY-MM-DD');
        this.search();
    },
    data(){
        return{
            res_dt:'', 
            res_list:[],
        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        },
        search(){
            let data ={
                res_dt : this.res_dt,  
            }

            axios.post('http://49.50.160.174/user/reservelist',{
                data
            })
            .then(res => {
                this.res_list = res.data.list;
            })
            .catch(err => {
                console.log('catch : '+err);
            });

        },
        reserveCancel(res){
            console.log(res);

            let data = res;

            axios.post('http://49.50.160.174/user/reservecancel',{
                data
            })
            .then(res => {
                if(res.data.status =='000'){
                    this.$ons.notification.alert("예약 취소!");
                }else{
                    this.$ons.notification.alert("취소 실패!");
                }    
                this.search();
            })
            .catch(err => {
                console.log('catch : '+err);
            });
        }
    }
}
</script>
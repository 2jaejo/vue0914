<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button></v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
        </v-ons-toolbar>
        
        <div class="content">
            <v-ons-list>
                <v-ons-list-item>
                    <div class="center">
                        <select class="long-select select-input select-input--underbar"
                            @change="getSubList()" 
                            v-model="selList"
                            style="margin-top:10px;"
                        >
                            <option v-for="list in orderList" :value="list.CLS_ID" :key="list.CLS_ID">
                                {{list.CLS_NM}}
                            </option>
                        </select>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <select class="long-select select-input select-input--underbar"     
                            v-model="selSubList"
                            @change="search()" 
                        >
                            <option v-for="list in orderSubList" :value="list.CLS_ID" :key="list.CLS_ID">
                                {{list.CLS_NM}}
                            </option>
                        </select>
                    </div>
                </v-ons-list-item>


                <v-ons-list-item>
                    <div class="center">
                        <v-ons-input placeholder="제품명" 
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
                        <v-ons-button class="search-btn-large" modifier="large" @click="search()">검색</v-ons-button>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-button class="search-btn-large" modifier="large" @click="pushOrderList()">주문목록</v-ons-button>
                    </div>
                </v-ons-list-item>
            </v-ons-list>

            <v-ons-list>
                <v-ons-list-item 
                    v-for="item in itemList" :key="item.PDC_ID"
                    modifier="chevron"
                    @click="push(item)"
                >
                    <div class="list-item__title">
                        {{item.PDC_NM}}
                    </div>
                    <div class="list-item__subtitle" style="text-align: left;">
                        
                    </div>
                </v-ons-list-item>
            </v-ons-list>    
        </div>
    
    </v-ons-page>
</template>

<script>
import axios from 'axios'
import UserOrder2 from './UserOrder2.vue'
import UserOrderList from './UserOrderList.vue'

export default {
    components: { 

    },
    created(){
        axios.get('http://49.50.160.174/user/orderlist').then(res => {
            this.orderList = res.data.list;
            this.selList = res.data.list[0].CLS_ID;
            this.getSubList();
        }).catch(err => {
            console.log('catch : '+err);
        });
    },
    data(){
        return{
            orderList:[],
            selList:'',

            orderSubList:[],
            selSubList:'',

            keyword:'',
            itemList:{},
        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        },
        push(item) {

            var pageToPush = {
                extends: UserOrder2,
                data(){
                    return{
                        title: item.PDC_NM,  
                        item:item,
                        menu:'주문하기'    
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        },
        pushOrderList() {

            var pageToPush = {
                extends: UserOrderList,
                data(){
                    return{
                        title: '주문목록',
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        },

        getSubList(){
            let data ={
                cls_id : this.selList
            }
            axios.post('http://49.50.160.174/user/ordersublist',{
                data
            }).then(res => {
                if (res.data.list.length < 1){
                    let base = {
                        CLS_NM:'전체',
                        CLS_ID:'0',
                    }
                    //배열 맨앞에 '전체' 추가
                    res.data.list.push(base);
                }
                this.orderSubList = res.data.list;
                this.selSubList = res.data.list[0].CLS_ID;
                this.search();
            }).catch(err => {
                console.log('catch : '+err);
            });
        },

        search(){
            let data = {
                step1 : this.selList,
                step2 : this.selSubList,
                keyword : this.keyword,
                hos_id : this.hos.HOS_ID
                
            };
            axios.post('http://49.50.160.174/user/orderitemlist',{
                data
            })
            .then(res => {
                this.itemList = res.data.list;
            })
            .catch(err => {
                console.log('catch asdfasdf: '+err);
            });
        },
    }
}
</script>
<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button></v-ons-back-button>
            </div>
            <div class="center">
                {{ title }}
            </div>
        </v-ons-toolbar>

        <div class="content">
            <v-ons-list>
                <v-ons-list-item>
                    <div class="center">
                        <select class="long-select select-input select-input--underbar"
                            @change="orderSubList()" 
                            v-model="sel_step1"
                            style="margin-top:10px;"
                        >
                            <option v-for="Step1 in itemClassOne" :value="Step1.CLS_ID" :key="Step1.CLS_ID">
                                {{Step1.CLS_NM}}
                            </option>
                        </select>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <select class="long-select select-input select-input--underbar"     
                            v-model="sel_step2"
                            @change="getItemList()" 
                        >
                            <option v-for="Step2 in itemClassTwo" :value="Step2.CLS_ID" :key="Step2.CLS_ID">
                                {{Step2.CLS_NM}}
                            </option>
                        </select>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-input placeholder="제품명" 
                            float 
                            type="text" 
                            style="width:96%; margin:10px auto;"
                            modifier="underbar"
                            v-model="keyword"
                            @keyup.enter="search()"
                            maxlength="50"
                        >
                        </v-ons-input>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-button class="search-btn-large" modifier="large" @click="pop()">취소</v-ons-button>
                    </div>
                </v-ons-list-item>

                <v-ons-list-item>
                    <div class="center">
                        <v-ons-button class="search-btn-large" modifier="large" @click="search()">검색</v-ons-button>
                    </div>
                </v-ons-list-item>
            </v-ons-list>
            <v-ons-card v-for="item in itemList" :key="item.PDC_ID">  
                <div class="title">
                    <b>{{item.PDC_NM}}</b>
                </div>
                <div class="content">
                    <v-ons-button modifier="large-cta" @click="push(item)">구매</v-ons-button>
                </div>
            </v-ons-card>       
        </div>

    </v-ons-page>
</template>

<script>
import axios from 'axios'
import UserOrder2 from './UserOrder2.vue'

export default {

    components: { 

    },
    created(){
        axios.get('http://49.50.160.174/user/orderlist',{

        })
        .then(res => {
            this.itemClassOne = res.data.list;
            this.sel_step1 = res.data.list[0].CLS_ID;
            this.orderSubList();
        })
        .catch(err => {
            console.log('catch : '+err);
        });
   
        
    },
    mounted(){
    
    },
    data(){
        return{
            itemClassOne:[],
            sel_step1:'',

            itemClassTwo:[],
            sel_step2:'',

            itemList:[],
            keyword:'',

        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/splicePage2');
        },
        push(item) {
            var pageToPush = {
                extends: UserOrder2,
                data(){
                    return{
                        title: item.PDC_NM,  
                        item:item,            
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        },

        orderSubList(){

            let data = {
                cls_id:this.sel_step1
            }
        
            axios.post('http://49.50.160.174/user/ordersublist',{
                data
            })
            .then(res => {
               
                this.itemClassTwo.splice(0);

                if (res.data.length < 1){
                    let base = {
                        CLS_NM:'전체',
                        CLS_ID:'0',
                    }
                    //배열 맨앞에 '전체' 추가
                    this.itemClassTwo.unshift(base);
                    this.sel_step2 = base.CLS_ID;
                }else{
                    for(let i = 0; i < res.data.length; i++){
                        this.itemClassTwo.push(res.data[i]);
                    }
                    this.sel_step2 = res.data[0].CLS_ID;
                }

                this.getItemList();
 
            })
            .catch(err => {
                console.log('catch : '+err);
            });

        },

        search(){
            this.getItemList();
        },

        getItemList(){
            let data = {
                step1:this.sel_step1,
                step2:this.sel_step2,
                keyword:this.keyword,
                hos_id:this.hos.HOS_ID
            }

            axios.post('http://49.50.160.174/user/orderitemlist',{
                data
            }).then(res =>{           
                this.itemList = res.data;

            }).catch(err =>{
                console.log('catch : '+err);
            });
        },
        
    }
}
</script>
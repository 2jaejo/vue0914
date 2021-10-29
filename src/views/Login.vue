<template>
    <v-ons-page>
              
        <div class="background">
            <img :src="require('@/assets/images/bg_user_login.png')" width="100%" height="100%">
        </div>

        <div class="content" style="margin-top:70%;">
            <v-ons-list>
                <v-ons-list-item style="margin-top:20px;">
                    <div class="center">
                        <v-ons-input placeholder="전화번호" 
                            float 
                            type="text" 
                            v-model="id" 
                            style="width: 96%; margin:10px auto;"
                            modifier="underbar"
                            @keyup.enter="login"
                        >
                        </v-ons-input>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-input placeholder="비밀번호" 
                            float 
                            type="password" 
                            v-model="pw" 
                            style="width:96%; margin:10px auto;"
                            modifier="underbar"
                            @keyup.enter="login"
                        >
                        </v-ons-input>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-button modifier="large" @click="login">로그인</v-ons-button>
                    </div>
                </v-ons-list-item>        
            </v-ons-list>  

            <v-ons-row style="width:90%; margin:20px auto;">
                <v-ons-col width="70%">
                    <a href="javascript:void(0);" style="color:#eee;">아이디</a> 
                    <span style="color:#eee;"> &#47; </span> 
                    <a href="javascript:void(0);" style="color:#eee;">비밀번호 찾기</a>
                </v-ons-col>
                <v-ons-col>
                    <a href="javascript:void(0);" style="color:#eee;" @click="push('회원가입')">회원가입</a>
                </v-ons-col>
            </v-ons-row>                 
        </div>

    </v-ons-page>
</template>
<script>
import { mapState } from 'vuex'

import User from './User.vue'
import Join from './Join/RegisterAgree.vue'

import axios from 'axios'
export default {
    data(){
        return{
            id:'',
            pw:'',
        }
    },
    created(){

    },
    computed:{
        ...mapState({
            user : state => state.user
        }),

    },
    watch:{
        user(newVal){
            if(newVal){
                if(newVal.is_login){
                    this.push(newVal.relater_div_cde);
                }
            }
        }
    },
    methods:{   
        login(){
            let data = {
                id:this.id, 
                pw:this.pw
            };

            this.id = '';
            this.pw='';
   
            axios.post('http://49.50.160.174/comm/login',{
                data
            })
            .then(res => {

                if(res.data.status == '000'){
                    //alert('로그인 성공');
                    this.$store.commit('procLoginData', res.data);
                }else{
                    //로그인실패
                    this.$ons.notification.alert({
                        title: "로그인",
                        message: "로그인 실패"
                    });
                }     
            })
            .catch(err => {
                console.log('catch : '+err);
            });
           
        },
        logout(){
            this.$store.dispatch('procLogoutData');
        },

        push(e){         
            const getMenu = (type)=>{
                 switch(type){
                    case '3003':
                        return User; 
                    case '회원가입':
                        return Join;        
                }
            }
            var pageToPush = {
                extends: getMenu(e),
                data(){
                    return{
                        title:'',
                        back:'',
                    }
                }
            }        
            this.$store.dispatch('navigator/pushPage',pageToPush);
        }
    }
}
</script>


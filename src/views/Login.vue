<template>
    <v-ons-page>
              
        <div class="background">
            <img src="http://49.50.160.174/public/_Upload/bg_user_login.png" width="100%" height="100%">
            <!-- <img :src="require('@/assets/images/bg_user_login.png')" width="100%" height="100%"> -->
        </div>

        <div class="content">
            <div style="padding-top:70%;">

                <div style="background-color:white;">
                    <div style="padding-left:4%; padding-right:4%; padding-top:10%; padding-bottom:2%; border:none;">
                        <v-ons-input placeholder="전화번호" 
                            float 
                            type="text" 
                            v-model="id" 
                            style="width:100%;"
                            modifier="underbar"
                            @keyup.enter="login"
                        >
                        </v-ons-input>
                    </div>
                
                    <div style="padding-left:4%; padding-right:4%; padding-top:8%; padding-bottom:2%; border:none;">
                        <v-ons-input placeholder="비밀번호" 
                            float 
                            type="password" 
                            v-model="pw" 
                            style="width:100%;"
                            modifier="underbar"
                            @keyup.enter="login"
                        >
                        </v-ons-input>
                    </div>
                    <div style="padding:4%;">
                        <v-ons-button style="width:100%;" modifier="large--cta" @click="login">로그인</v-ons-button>
                    </div>
                </div>    
            

                <div>
                    <v-ons-row style="width:90%; margin:10px auto;">
                        <v-ons-col width="70%">
                            <!-- <a href="javascript:void(0);" style="color:#eee;">아이디</a>  -->
                            <!-- <span style="color:#eee;"> &#47; </span>  -->
                            <a href="javascript:void(0);" style="color:#eee;">비밀번호 재설정</a>
                        </v-ons-col>
                        <v-ons-col>
                            <a href="javascript:void(0);" style="color:#eee;" @click="push('회원가입')">회원가입</a>
                        </v-ons-col>
                    </v-ons-row>
                </div>
            
            </div>
                   
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

<style scoped>
input::placeholder {
  color: white;
}
input::-webkit-input-placeholder {
  color: white;
}
input::-ms-input-placeholder {
  color: white;
}
</style>
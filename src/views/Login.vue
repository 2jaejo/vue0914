<template>
    <v-ons-page>      
        <v-ons-toolbar>
            <div class="left">
                
            </div>
            <div class="center"><b>메디퍼</b></div>
        </v-ons-toolbar>
        
        <div class="fixed" style="margin-top:50%;">
            <v-ons-list>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-input placeholder="Username" 
                            float 
                            type="text" 
                            v-model="id" 
                            style="width: 96%; margin:10px auto;"
                            @keyup.enter="login"
                        >
                        </v-ons-input>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-input placeholder="Password" 
                            float 
                            type="password" 
                            v-model="pw" 
                            style="width:96%; margin:10px auto;"
                            @keyup.enter="login"
                        >
                        </v-ons-input>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-button modifier="large--cta" @click="login">로그인</v-ons-button>
                    </div>
                </v-ons-list-item>
            </v-ons-list>                   
        </div>

        <div class="content">

        </div>

    </v-ons-page>
</template>
<script>
import { mapState } from 'vuex'
import Company from './Company.vue'
import Hospital from './Hospital.vue'
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
                this.push(newVal.relater_div_cde);
            }
        }
    },
    methods:{
        login(){
            let data = {id:this.id, pw:this.pw};
            this.$store.dispatch('procLoginData', data);
            this.id = '';
            this.pw='';
           
        },
        logout(){
            this.$store.dispatch('procLogoutData');
        },

        push(e){         
            const getMenu = (type)=>{
                 switch(type){
                    case '3002':
                        return Company;
                    case '3001':
                        return Hospital;     
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


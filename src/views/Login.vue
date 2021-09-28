<template>
    <v-ons-page>      
        <div class="title" style="margin: 10px 10px;">
            <h2>메디퍼</h2>
        </div>
        
        <div class="login">
            
                <div>
                    <v-ons-input placeholder="Username" 
                        float 
                        type="text" 
                        v-model="id" 
                        style="width: 94%; margin: 10px 10px;"
                    >
                    </v-ons-input>
                </div>
                <br />
                <div>
                    <v-ons-input placeholder="Password" 
                        float 
                        type="password" 
                        v-model="pw" 
                        style="width: 94%; margin: 10px 10px;"
                    >
                    </v-ons-input>
                </div>
                <br />
                <div>
                    <button class="button--large--cta" @click="login" style="width: 95%; margin: 0 auto;">로그인</button>
                </div>
           
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
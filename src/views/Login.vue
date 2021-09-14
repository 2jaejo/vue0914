<template>
    <div class="container">
        <div class="title" style="margin: 10px 10px;">
            <h2>메디퍼</h2>
        </div>
        <div class="login" v-if="user.kor_nm == null || user.kor_nm == ''">
            
                <div>
                    <input class="text-input text-input--material" placeholder="Username" type="text" v-model="id" required style="width: 94%; margin: 10px 10px;">
                </div>
                <br />
                <div>
                    <input class="text-input text-input--material" placeholder="Password" type="password" v-model="pw" required style="width: 94%; margin: 10px 10px;">
                </div>
                <br />
                <div>
                    <button class="button--large--cta" @click="login" style="width: 95%; margin: 0 auto;">로그인</button>
                </div>
           
        </div>
        <div class="logout" v-else>
            <div class="title" style="margin: 10px 10px;">
                <P><b>{{user.kor_nm}}</b>님</P>
            </div>
            <div>
                <button class="button--large--cta" @click="logout" style="width: 95%; margin: 0 auto;">로그아웃</button>
            </div>        
        </div>
     
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    data(){
        return{
            id:'',
            pw:'',
        }
    },
    created(){
        console.log(this.$store.state.user);
    },
    computed:{
        ...mapState(['user','session']),
    },
    methods:{
        login(){
            let data = {id:this.id, pw:this.pw};
             this.$store.dispatch('procLoginData', data);
        },
        logout(){
            this.$store.dispatch('procLogoutData');
        },
    }
}
</script>
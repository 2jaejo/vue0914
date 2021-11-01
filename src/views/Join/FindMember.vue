<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button></v-ons-back-button>
            </div>
            <div class="center">
                <b>비밀번호 재설정</b>
            </div>
        </v-ons-toolbar>

        <div class="content">
            <v-ons-card>
                <ul class="list">
                    <li class="list-item">
                        <div class="list-item__center">
                            <div>이름</div>
                            <div>
                                <v-ons-input type="text" v-model="kor_nm" modifier="underbar" maxlength="10"></v-ons-input>
                            </div>
                        </div>      
                    </li>
                    <li class="list-item">
                        <div class="list-item__center">
                            <div>연락처</div>
                            <div>
                                <v-ons-input type="text" v-model="tel" modifier="underbar" maxlength="11"></v-ons-input>
                            </div>
                        </div>      
                    </li>
                    <li class="list-item">
                        <div class="list-item__center">
                            <div>비밀번호</div>
                            <div>
                                <v-ons-input type="password" v-model="passwd" modifier="underbar" maxlength="20"></v-ons-input>
                            </div>
                        </div>      
                    </li>
                    <li class="list-item">
                        <div class="list-item__center">
                            <div>비밀번호 확인</div>
                            <div>
                                <v-ons-input type="password" v-model="pw_chk" modifier="underbar" maxlength="20"></v-ons-input>
                            </div>
                        </div>      
                    </li>
                    <li class="list-item">
                        <div class="list-item__center">
                            <div>성별</div>
                            <div>
                                <select class="select-input select-input--underbar" v-model="gender" style="width: 96%;padding-left:2px;">
                                    <option value="M">남자</option>
                                    <option value="F">여자</option>
                                </select>
                            </div>
                        </div>      
                    </li>
                    <li class="list-item">            
                        <div class="list-item__center">
                            <div>혈액형</div>
                            <div>
                                <select class="select-input select-input--underbar" v-model="bloodtype" style="width: 96%;padding-left:2px; vertical-align: bottom;">
                                    <option v-for="blood in bloodlist" :key="blood.CDE" :value="blood.CDE"> {{blood.KOR_NM}} 형</option>
                                </select>
                            </div>
                        </div>      
                    </li>
                    <li class="list-item" style="height:80px;">
                        <div class="list-item__center">
                            <div>생일</div>
                            <div>
                                <v-ons-input type="date" modifier="underbar" v-model="bthdy"></v-ons-input>
                            </div>
                        </div>      
                    </li>
                </ul>    
                <v-ons-list>
                    <v-ons-list-item style="height:80px;">
                        <div class="center">
                            <v-ons-button modifier="large--cta" @click="joinUs()">회원가입</v-ons-button>
                        </div>
                    </v-ons-list-item>
                </v-ons-list>       
            </v-ons-card>
        </div>
        
    </v-ons-page>
</template>

<script>
import axios from 'axios'

export default {
    components: { 
        
    },
    created(){
        axios.get('http://49.50.160.174/user/bloodlist',{
            
        }).then(res =>{
            this.bloodlist = res.data.list;
        }).catch(err =>{
            console.log('catch : '+err);
        });
    },
    data(){
        return{
            kor_nm:'',
            tel:'',
            passwd:'',
            pw_chk:'',
            gender:'M',
            bloodlist:{},
            bloodtype:'1',
            bthdy:''
        

        }
    },
    methods: {
        pop() {
            //this.$emit('pop');
            this.$store.dispatch('navigator/popPage');
        },
        joinUs(){
            
            let data = {
                kor_nm:this.kor_nm,
                tel:this.tel,
                passwd:this.passwd,
                pw_chk:this.pw_chk,
                gender:this.gender,
                bloodtype:this.bloodtype,
                bthdy:this.bthdy
            }

            if(data.passwd != data.pw_chk){
                this.$ons.notification.alert({
                    title: "중복확인",
                    message: "비밀번호가 <br> 동일하지 않습니다."
                });
                return false;
            }

            for (let k in data){
                if(data[k]==''){
                    this.$ons.notification.alert({
                        title: "입력확인",
                        message: "입력하지 않은 값이 있습니다."
                    });
                    return false;
                }
            }
            

            axios.post('http://49.50.160.174/user/joinus',{
                data
            }).then(res =>{
                if(res.data.status == '000'){
                    this.$ons.notification.alert({
                        title: "CODE : "+res.data.status,
                        message: res.data.message
                    });     
                    this.$store.dispatch('navigator/splicePage');
                }else{
                    this.$ons.notification.alert("실패!");
                }

            }).catch(err =>{
                console.log('catch : '+err);
            });

        }
    }
}
</script>

<style scoped>
    ons-input{
        width:96%; 
        margin:10px auto;
    }
    ons-list-item{
        height: 60px;
        margin:0px;
    }
    .list-item{
        height:50px;
    }
    .list-item__center{
        padding-bottom:0px;
    }
    
</style>
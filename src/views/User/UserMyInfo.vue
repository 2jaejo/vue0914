<template>
    <v-ons-page>
<!-- 툴바 -->
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button></v-ons-back-button>
            </div>
            <div class="center">{{ title }}</div>
        </v-ons-toolbar>
 
<!-- 본문 -->
        <div class="content">
            
            <v-ons-card>
                <ul class="list">
                    <li class="list-header">
                        개인 설정
                    </li>
                    <li class="list-item">
                        <div class="list-item__center">
                            <div>이름</div>
                            <div>
                                {{user_nm}}
                            </div>
                        </div>      
                    </li>
                    <li class="list-item">
                        <div class="list-item__center">
                            <div>연락처</div>
                            <div>
                                <input class="text-input text-input--material" v-model="hp_nbr" modifier="underbar" style="width:96%;padding-left:2px;" maxlength="11" />
                            </div>
                        </div>      
                    </li>
                    <li class="list-item">
                        <div class="list-item__center">
                            <div>성별</div>
                            <div>
                                <select class="select-input select-input--underbar" v-model="gender" style="width:96%;padding-left:2px;">
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
                                <select class="select-input select-input--underbar" 
                                    style="width: 96%;padding-left:2px; vertical-align: bottom;"
                                    v-model="bld_typ" 
                                >
                                    <option v-for="blood in bloodList" :key="blood.CDE" :value="blood.CDE"> {{blood.KOR_NM}} 형</option>
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
            </v-ons-card>
            <v-ons-card>
                <ul class="list">  
                    <li class="list-header">
                        비밀번호 설정
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
                </ul>
            </v-ons-card>

            <v-ons-card>
                <v-ons-list>
                    <li class="list-header">
                        지역 설정
                    </li>
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
                                v-on:input="updateValue($event.target.value)"
                            >
                                <option v-for="loc in locSubList" :value="loc.LOC_CDE" :key="loc.LOC_CDE">
                                    {{loc.LOC_NM}}
                                </option>
                            </select>
                        </div>
                    </v-ons-list-item>
                </v-ons-list>
            </v-ons-card>

            <v-ons-list>
                <v-ons-list-item style="height:80px;">
                    <div class="center">
                        <v-ons-button modifier="large--cta" @click="modifyUserInfo()">수정</v-ons-button>
                    </div>
                </v-ons-list-item>
            </v-ons-list>       
                        
        </div>

    </v-ons-page>    
</template>

<script>
import dayjs from 'dayjs'

export default {
    components:{

    },
    created(){
        this.getUserInfo();

        this.$axios.get('http://49.50.160.174/user/siloclist',{
            
        })
        .then(res => {
            this.locList = res.data.list;
            this.sel_loc = res.data.list[0].C;
            this.getSubLoc();
        })
        .catch(err => {
            console.log('catch : '+err);
        });
    },
    data(){
        return{
            locList:[],
            sel_loc:'',

            locSubList:[],
            sel_subloc:'',

            user_nm:'',
            hp_nbr:'',
            gender:'',
            bloodList:[],
            bld_typ:'',
            bthdy:'',
            passwd:'',
            pw_chk:'',
        }
    },
    methods:{
        getSubLoc(){
            let data ={
                loc_cde : this.sel_loc
            }
            this.$axios.post('http://49.50.160.174/user/guloclist',{
                data
            })
            .then(res => {
                this.locSubList = res.data.list;
                this.sel_subloc = res.data.list[0].C;
            })
            .catch(err => {
                console.log('catch : '+err);
            });
        },
        getUserInfo(){
            this.$axios.get('http://49.50.160.174/user/getuserinfo',{
            
            }).then(res =>{
                this.user_nm = res.data.list[0].USER_NM;
                this.hp_nbr = res.data.list[0].HP_NBR;
                this.gender = res.data.list[0].GENDER;
                this.bloodList = res.data.bloodList;
                this.bld_typ = res.data.list[0].BLD_TYP;
                this.bthdy = dayjs(res.data.list[0].BTHDY).format('YYYY-MM-DD');
                this.loc_cde = res.data.list[0].LOC_CDE;

            }).catch(err =>{
                console.log('catch : '+err);
            });
        },

        modifyUserInfo(){
            //공백체크
            let pattern = /\s/g;
            let pass = this.passwd;
            if( pass.match(pattern)){
                this.$ons.notification.alert({
                    title: "비밀번호 확인",
                    message: "비밀번호에 공백이 포함되어 있습니다."
                });
                this.passwd='';
                this.pw_chk='';
                return false;
            }

            //중복체크
            if(this.passwd != this.pw_chk){
                this.$ons.notification.alert({
                    title: "비밀번호 확인",
                    message: "비밀번호가 <br> 동일하지 않습니다."
                });
                this.passwd = '';
                this.pw_chk = '';
                return false;
            }

            let data ={
                hp_nbr:this.hp_nbr,
                gender:this.gender,
                bld_typ:this.bld_typ,
                bthdy:dayjs(this.bthdy).format('YYYYMMDD'),
                passwd:this.passwd,
                pw_chk:this.pw_chk,
                loc_cde: this.sel_subloc
            };
            this.$axios.post('http://49.50.160.174/user/modifyuserinfo',{
                data
            }).then(res =>{
                if(res.data.status == '000'){
                    this.$ons.notification.alert({
                        title: "CODE : "+res.data.status,
                        message: '수정완료!'
                    });     
                }else{
                    this.$ons.notification.alert("실패!");
                }
                this.getUserInfo();
            }).catch(err =>{
                console.log('catch : '+err);
            });
        }

    }   
}
</script>
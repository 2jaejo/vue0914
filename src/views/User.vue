<template>
    <v-ons-page>
        <!-- 툴바 -->
        <v-ons-toolbar>
            <div class="center"><b>User</b></div>
        </v-ons-toolbar>
 
        <div class="background">
            
        </div>

        <div class="content">
    <!-- 캐러셀 -->
            <div style="position:relative;">
                <v-ons-carousel swipeable auto-scroll overscrollable
                    
                    :index.sync="carouselIndex"
                >
                    <v-ons-carousel-item v-for="(value, index) in items" :key="index">
                        <div style="height:300px; text-align: center; font-size: 50px; color: #fff;">
                            <img :src="'http://www.mediper.net:8080/_Upload/hos/'+value.HOS_ID+'/view/'+value.SAVE_NM" 
                                onerror="this.src='http://www.mediper.net:8080/images/none_image.png'" style="width:100%;height:100%;"/>
                        </div>
                    </v-ons-carousel-item>
                </v-ons-carousel>

                <div :style="dots">
                    <span :index="dotIndex - 1" v-for="dotIndex in Object.keys(items).length" :key="dotIndex" style="cursor: pointer" @click="carouselIndex = dotIndex - 1">
                        {{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}
                    </span>
                </div>
            </div>

            <!-- 그리드 -->
            <v-ons-row>
                <v-ons-col width="66.6%"><div class="bg mint" @click="push('UserReserve','진료예약')">진료예약</div></v-ons-col>
                <v-ons-col><div class="bg puple" @click="push('UserFormula','서식신청')">서식신청</div></v-ons-col>
            </v-ons-row>
            <v-ons-row>
                <v-ons-col><div class="bg orange" @click="push('UserReserveList','예약조회')">예약조회</div></v-ons-col>
                <v-ons-col><div class="bg green" @click="push('UserSearchHospital','병원찾기')">병원찾기</div></v-ons-col>
                <v-ons-col><div class="bg blue" @click="push('UserOrder','상품주문')">상품주문</div></v-ons-col>
            </v-ons-row>

            <!-- 리스트 -->
            <ul class="list list--inset">
                <li class="list-header">
                    알림
                </li>
                <li class="list-item list-item--longdivider list-item--tappable"
                    v-for="list in notice" :key="list.WR_ID"
                >
                    <div class="list-item__center list-item--longdivider__center"
                        @click="pushNotice(list)"
                    >
                        {{list.WR_SUBJECT}}         
                    </div>
                </li>
            </ul>        

            <!-- 버튼 -->
            <v-ons-row>
                <v-ons-col><div class="bg skyblue" @click="logout">로그아웃</div></v-ons-col>
                <v-ons-col><div class="bg skyblue" @click="push('UserMyInfo','나의정보')">나의정보</div></v-ons-col>
                <v-ons-col><div class="bg skyblue" @click="push('UserSetting','환경설정')">환경설정</div></v-ons-col>
            </v-ons-row>
        </div>
        
    </v-ons-page>
</template>

<script>
import axios from 'axios'

import UserReserveList from './User/UserReserveList.vue'
//import Location from './User/Location.vue'
import UserSearchHospital from './User/UserSearchHospital.vue'
import Notice from './User/Notice.vue'
import UserMyInfo from './User/UserMyInfo.vue'
import UserSetting from './User/UserSetting.vue'

//import UserReserve from './User/UserReserve.vue'
//import UserFormula from './User/UserFormula.vue'
//import UserOrder from './User/UserOrder.vue'

export default {
    components: { 

    },
    created() {
        axios.get('http://49.50.160.174/comm/getImage',{

        }).then(res => {
            this.items = res.data.list;
        }).catch(err => {
            console.log('catch : '+err);
        });

        axios.get('http://49.50.160.174/user/getnotice',{
            
        }).then(res => {
            this.notice = res.data.list;
        }).catch(err => {
            console.log('catch : '+err);
        });


    },
    data(){
        return{
            notice:[],

            items: [],
            carouselIndex: 0,

            dots: {
                textAlign: 'center',
                fontSize: '20px',
                color: '#fff',
                position: 'absolute',
                bottom: '10px',
                left: 0,
                right: 0
            },
        }
    },
    methods: {
        push(e, t) {
            const getMenu = (type)=>{
                switch(type){
                    case 'UserReserve':
                        return UserSearchHospital;
                    case 'UserFormula':
                        return UserSearchHospital;
                    case 'UserReserveList':
                        return UserReserveList;
                    case 'UserSearchHospital':
                        return UserSearchHospital;
                    case 'UserOrder':
                        return UserSearchHospital;
                    case 'UserMyInfo':
                        return UserMyInfo;
                    case 'UserSetting':
                        return UserSetting;
                }
            }

            var pageToPush = {
                extends: getMenu(e),
                data(){
                    return{
                        title: t,
                        back:'',
                        menu: t 
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        },
        pushNotice(list){
            var pageToPush = {
                extends: Notice,
                data(){
                    return{
                        title: '공지사항',
                        list:list 
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);

        },
        logout(){
            this.$ons.notification.confirm({
                title: '로그아웃',
                message: '로그아웃 하시겠습니까??',
                buttonLabels: ['취소', '확인'],
                animation: 'default',
                primaryButtonIndex: 1,
                cancelable: true,
                callback: function (index) {
                    return index;  
                }
            }).then(result =>{
                if(result == 1){
                    this.$store.dispatch('procLogoutData');
                }
            })
            
        },
    }
}
</script>

<style scoped>
    ons-row{
        margin-top:0px;
        margin-bottom:0px;
    }
    ons-list{
        margin-top:4px;
        margin-bottom:4px;
    }
</style>
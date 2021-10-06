<template>
    <v-ons-page>
       <v-ons-toolbar>
            <div class="center">Hospital</div>
        </v-ons-toolbar>

        <!-- 캐러셀 -->
        <div style="position:relative;">
            <v-ons-carousel swipeable auto-scroll overscrollable
                
                :index.sync="carouselIndex"
            >
                <v-ons-carousel-item v-for="(value, index) in items" :key="index" :style="{backgroundColor: value}">
                    <div style="height:200px; text-align: center; font-size: 50px; padding-top: 20px; color: #fff;">{{index}}</div>
                </v-ons-carousel-item>
            </v-ons-carousel>

            <div :style="dots">
                <span :index="dotIndex - 1" v-for="dotIndex in Object.keys(items).length" :key="dotIndex" style="cursor: pointer" @click="carouselIndex = dotIndex - 1">
                    {{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}
                </span>
            </div>
        </div>

        <!-- 로그인정보 -->
        <v-ons-row>
            <v-ons-col><div class="bg" style="height:70px;">{{user.kor_nm}}병원 로그인하셨습니다.</div></v-ons-col>
            <v-ons-col width="80px"><div class="bg" @click="logout" style="height:70px;">로그아웃</div></v-ons-col>
        </v-ons-row>

        <!-- 그리드 -->
        <v-ons-row>
            <v-ons-col><div class="bg mint" @click="push('병원정보')">병원정보</div></v-ons-col>
            <v-ons-col><div class="bg puple" @click="push('월별내역')">월별내역</div></v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col><div class="bg orange" @click="push('주문하기')">주문하기</div></v-ons-col>
            <v-ons-col><div class="bg green" @click="push('주문조회')">주문조회</div></v-ons-col>
            <v-ons-col><div class="bg blue" @click="push('기간내역')">기간내역</div></v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col><div class="bg skyblue" @click="$ons.notification.alert('준비중입니다.',{title:'청구정보'})">청구정보</div></v-ons-col>
            <v-ons-col><div class="bg skyblue" @click="$ons.notification.alert('준비중입니다.',{title:'급여통계'})">급여통계</div></v-ons-col>
            <v-ons-col><div class="bg skyblue" @click="$ons.notification.alert('준비중입니다.',{title:'공지사항'})">공지사항</div></v-ons-col>
        </v-ons-row>
        
    </v-ons-page>
</template>

<script>
import {mapState} from 'vuex'

import HosInfo from './Hospital/HosInfo.vue'
import HosOrder from './Hospital/HosOrder.vue'
import HosOrderList from './Hospital/HosOrderList.vue'
import HosMonthList from './Hospital/HosMonthList.vue'
import HosPeriodList from './Hospital/HosPeriodList.vue'

import Page11 from './Page11.vue'

export default {

    components: { 
        
    },
    created() {
       this.nbr = this.user.relater_nbr;
    },
    computed:{
        ...mapState({
            user : state => state.user,
        }),
    },
    watch:{
        user(Val){
            console.log(Val);
            //this.nbr = newVal.relater_nbr;
        }
    },
    data(){
        return{
            nbr:'',
            carouselIndex: 0,
            items: {
                BLUE: '#085078',
                DARK: '#373B44',
                ORANGE: '#D38312'
            },
            dots: {
                textAlign: 'center',
                fontSize: '30px',
                color: '#fff',
                position: 'absolute',
                bottom: '30px',
                left: 0,
                right: 0
            }
        }
    },
    methods: {
        push(e) {
            const getMenu = (type)=>{
                switch(type){
                    case '병원정보':
                        return HosInfo;
                    case '주문하기':
                        return HosOrder;
                    case '주문조회':
                        return HosOrderList;
                    case '월별내역':
                        return HosMonthList;
                    case '기간내역':
                        return HosPeriodList;        
                    case 'Page11':
                        return Page11;
                }
            }
            let nbr = this.nbr; 
            var pageToPush = {
                extends: getMenu(e),
                data(){
                    return{
                        title: e,
                        back:'병원',
                        nbr : nbr, 
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        },

        logout(){
            this.$store.dispatch('procLogoutData');
        },
    }
}
</script>

<style scoped>

.bg{
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight:bold;
    border: 1px solid white;
    border-radius: 10px;
    height:100px;
    margin:5px;
}
.mint{
    background-color: #b2dfdb;
}
.puple{
    background-color: #e1bee7;
}
.orange{
    background-color: #ffe0b2;
}
.green{
    background-color: #dcedc8;
}
.blue{
    background-color: #bbdefb;
}
.skyblue{
    background-color: #e1f5fe;
}
</style>
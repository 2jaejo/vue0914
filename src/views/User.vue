<template>
    <v-ons-page>
        <!-- 툴바 -->
        <custom-toolbar></custom-toolbar>
 
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

        <!-- 그리드 -->
        <v-ons-row>
            <v-ons-col width="66.6%"><div class="bg mint" @click="push('UserReserve','진료예약')">진료예약</div></v-ons-col>
            <v-ons-col><div class="bg puple" @click="push('UserFormula')">서식신청</div></v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col><div class="bg orange" @click="push('UserSearchReserve','예약조회')">예약조회</div></v-ons-col>
            <v-ons-col><div class="bg green" @click="push('UserSearchHospital','병원찾기')">병원찾기</div></v-ons-col>
            <v-ons-col><div class="bg blue" @click="push('UserOrder','상품주문')">상품주문</div></v-ons-col>
        </v-ons-row>

        <!-- 리스트 -->
        <v-ons-list>
            <v-ons-list-item modifier="longdivider">
                <div class="center">예약된 병원이 없습니다.</div>
            </v-ons-list-item>
            <v-ons-list-item modifier="longdivider">
                <div class="center">테스트여부</div>
            </v-ons-list-item>
        </v-ons-list>

        <!-- 버튼 -->
        <v-ons-row>
            <v-ons-col><div class="bg skyblue" @click="push('Page11','로그아웃')">로그아웃</div></v-ons-col>
            <v-ons-col><div class="bg skyblue" @click="push('Page11','나의정보')">나의정보</div></v-ons-col>
            <v-ons-col><div class="bg skyblue" @click="push('Page11','환경설정')">환경설정</div></v-ons-col>
        </v-ons-row>
        
    </v-ons-page>
</template>

<script>
import customToolbar from '../components/Toolbar.vue'

import UserReserve from './User/UserReserve.vue'
import UserFormula from './User/UserFormula.vue'
import UserSearchReserve from './User/UserSearchReserve.vue'
import UserSearchHospital from './User/UserSearchHospital.vue'
import UserOrder from './User/UserOrder.vue'

import Page11 from './Page11.vue'

export default {
    components: { 
        customToolbar,
    },
    data(){
        return{
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
        push(e, t) {
            const getMenu = (type)=>{
                switch(type){
                    case 'UserReserve':
                        return UserReserve;
                    case 'UserFormula':
                        return UserFormula;
                    case 'UserSearchReserve':
                        return UserSearchReserve;
                    case 'UserSearchHospital':
                        return UserSearchHospital;
                    case 'UserOrder':
                        return UserOrder;        
                    case 'Page11':
                        return Page11;
                }
            }

            var pageToPush = {
                extends: getMenu(e),
                data(){
                    return{
                        title: t,
                        back:'사용자' 
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        }
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
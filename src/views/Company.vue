<template>
    <v-ons-page>
        <custom-toolbar title="Store"></custom-toolbar>

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
            <v-ons-col><div class="bg" style="height:70px;">{{user.kor_nm}} 로그인하셨습니다.</div></v-ons-col>
            <v-ons-col width="80px"><div class="bg" @click="logout" style="height:70px;">로그아웃</div></v-ons-col>
        </v-ons-row>

        <!-- 그리드 -->
        <v-ons-row>
            <v-ons-col><div class="bg mint" @click="push('상품관리')">상품관리</div></v-ons-col>
            <v-ons-col><div class="bg puple" @click="push('주문조회')">주문조회</div></v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col><div class="bg orange" @click="pop('거래처조회')">거래처조회</div></v-ons-col>
            <v-ons-col><div class="bg green" @click="splice('판매현황')">판매현황</div></v-ons-col>
        </v-ons-row>
        user_id : {{user.user_id}} <br>
        kor_nm : {{user.kor_nm}}
    </v-ons-page>
</template>

<script>
import {mapState} from 'vuex'
import customToolbar from '../components/Toolbar.vue'

import ComProduct from './Company/ComProduct.vue'
import ComOrderList from './Company/ComOrderList.vue'
import ComClientList from './Company/ComClientList.vue'
import ComSalesList from './Company/ComSalesList.vue'


export default {
    components: { 
        customToolbar, 
    },
    created() {

    },
    computed:{
        ...mapState({
            user : state => state.user,
        }),
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
            },
        }
    },
    methods: {
        push(e) {
            const getMenu = (type)=>{
                 switch(type){
                    case '상품관리':
                        return ComProduct;
                    case '주문조회':
                        return ComOrderList;
                    case '거래처조회':
                        return ComClientList;
                    case '판매현황':
                        return ComSalesList;        
                }
            }

            var pageToPush = {
                extends: getMenu(e),
                data(){
                    return{
                        title: e,
                        back:'Store',
                        cde: '',
                    }
                }
            }
          
            this.$store.dispatch('navigator/pushPage',pageToPush);
        },

        logout(){
            this.$store.dispatch('procLogoutData'); 
        },

        pop(){
            this.$store.dispatch('navigator/popPage');
        },

        splice(){
            this.$store.dispatch('navigator/splicePage');
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
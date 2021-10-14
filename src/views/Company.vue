<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="center"><b>Store</b></div>
        </v-ons-toolbar>

        <!-- 캐러셀 -->
        <div style="position:relative;">
            <v-ons-carousel swipeable auto-scroll overscrollable
                
                :index.sync="carouselIndex"
            >
                <v-ons-carousel-item v-for="(value, index) in items" :key="index">
                    <div style="height:300px; text-align: center; font-size: 50px; color: #fff;">
                        <img :src="'http://49.50.160.174/public/_Upload/sto/'+value" onerror="this.src='http://49.50.160.174/public/_Upload/imgError.jpg'" style="width:100%;height:100%;"/>
                    </div>
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
            <v-ons-col width="90px"><div class="bg" @click="logout" style="height:70px;">로그아웃</div></v-ons-col>
        </v-ons-row>

        <!-- 그리드 -->
        <v-ons-row>
            <v-ons-col><div class="bg mint" @click="push('상품관리')">상품관리</div></v-ons-col>
            <v-ons-col><div class="bg puple" @click="push('주문조회')">주문조회</div></v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col><div class="bg orange" @click="push('거래처조회')">거래처조회</div></v-ons-col>
            <v-ons-col><div class="bg green" @click="push('판매현황')">판매현황</div></v-ons-col>
        </v-ons-row>
       
    </v-ons-page>
</template>

<script>
import {mapState} from 'vuex'

import ComItem from './Company/ComItem.vue'
import ComOrderList from './Company/ComOrderList.vue'
import ComClientList from './Company/ComClientList.vue'
import ComSalesList from './Company/ComSalesList.vue'
import Page11 from './Page11.vue'


export default {
    components: { 

    },
    created() {
       this.nbr = this.user.relater_nbr;
       this.items = {
            BLUE: this.user.hcrm_id+'/carousel/sto1.jpg',
            DARK: this.user.hcrm_id+'/carousel/sto2.jpg',
            ORANGE: this.user.hcrm_id+'/carousel/sto3.jpg'
       }
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
            title:'Store',
            nbr:'',
            carouselIndex: 0,
            items: {
                BLUE: '',
                DARK: '',
                ORANGE: ''
            },
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
        push(e) {
          
            const getMenu = (type)=>{
                 switch(type){
                    case '상품관리':
                        return ComItem;
                    case '주문조회':
                        return ComOrderList;
                    case '거래처조회':
                        return ComClientList;
                    case '판매현황':
                        return ComSalesList;
                    case 'test':
                        return Page11;        
                }
            }
            let nbr = this.nbr;
            var pageToPush = {
                extends: getMenu(e),
                data(){
                    return{
                        title: e,
                        back:'',
                        nbr : nbr,
                    }
                }
            }
          
            this.$store.dispatch('navigator/pushPage',pageToPush);
        },

        logout(){
            let con = confirm("로그아웃 하시겠습니까?");
            if(con){
                this.$store.dispatch('procLogoutData');
            }
            
        },
    }
}
</script>

<style scoped>
    ons-row{
        margin:4px auto 0px auto;
    }
</style>
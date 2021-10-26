<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button></v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
        </v-ons-toolbar>
        
        <div class="content">
            <v-ons-card>
               <ul class="list">
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>진료과목</div>
                            <div>{{hospitalInfo.TRE_NM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>대표의사</div>
                            <div>{{hospitalInfo.DIRECTOR_NM}}</div>
                        </div>      
                    </li>
                  
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>전공</div>
                            <div>{{hospitalInfo.DIRECTOR_SPEC}}</div>
                        </div>      
                    </li>
               
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>전화</div>
                            <div>{{hospitalInfo.TEL_NBR}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>평일진료</div>
                            <div>{{hospitalInfo.WEEKDAY_STR}} ~ {{hospitalInfo.WEEKDAY_END}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>주말진료</div>
                            <div>{{hospitalInfo.WEEKEND_STR}} ~ {{hospitalInfo.WEEKEND_END}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>점심시간</div>
                            <div>{{hospitalInfo.LUNCH_STR}} ~ {{hospitalInfo.LUNCH_END}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>주소</div>
                            <div>{{hos.ADDR_MST}}</div>
                        </div>      
                    </li>
                                 
                </ul>
                <br>
                <div v-if="menu=='병원찾기'">
                    <v-ons-button  class="order-btn" modifier="large" style="width:100%; margin:5px 0px;" @click="push('진료예약')">진료예약</v-ons-button>
                    <v-ons-button class="order-btn" modifier="large" style="width:100%; margin:5px 0px;" @click="push('서식신청')">서식신청</v-ons-button>
                    <v-ons-button class="order-btn" modifier="large" style="width:100%; margin:5px 0px;" @click="push('상품주문')">상품주문</v-ons-button>
                </div>

                <div v-else-if="menu =='진료예약'">
                    <v-ons-button  class="order-btn" modifier="large" style="width:100%; margin:5px 0px;" @click="push('진료예약')">진료예약</v-ons-button>
                </div>

                <div v-else-if="menu =='서식신청'">
                    <v-ons-button class="order-btn" modifier="large" style="width:100%; margin:5px 0px;" @click="push('서식신청')">서식신청</v-ons-button>
                </div>
                <div v-else>
                    <v-ons-button class="order-btn" modifier="large" style="width:100%; margin:5px 0px;" @click="push('상품주문')">상품주문</v-ons-button>
                </div>

                <div>
                    <v-ons-button modifier="large" style="width:100%; margin:5px 0px;" @click="popMain()">닫기</v-ons-button>
                </div>
            </v-ons-card>
        
        </div>
    
    </v-ons-page>
</template>

<script>
import axios from 'axios'
import UserReserve from './UserReserve.vue'
import UserFormula from './UserFormula.vue'
import UserOrder from './UserOrder.vue'

export default {
    components: { 

    },
    created(){
        let data ={
            hos_id: this.hos.HOS_ID,
        }
        axios.post('http://49.50.160.174/user/hosinfo',{
            data
        })
        .then(res => {
            this.hospitalInfo = res.data.list[0];
        })
        .catch(err => {
            console.log('catch : '+err);
        });
    },
    data(){
        return{
            hospitalInfo:{},
        }
    },
    methods: {
        popMain() {
            this.$store.dispatch('navigator/mainPage');
        },
        push(e) {
            const getMenu = (type)=>{
                switch(type){
                    case '진료예약':
                        return UserReserve;
                    case '서식신청':
                        return UserFormula;
                    case '상품주문':
                        return UserOrder;
                }
            }
            let hos = this.hospitalInfo;
            let menu = this.menu;
            var pageToPush = {
                extends: getMenu(e),
                data(){
                    return{
                        title: hos.HOS_NM,
                        back:'',
                        hos: hos,
                        menu: menu
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        },
    }
}
</script>
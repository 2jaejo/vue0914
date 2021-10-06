<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button>{{ back }}</v-ons-back-button>
        </div>
        <div class="center">{{ item.PDC_NM }}</div>
        </v-ons-toolbar>

        <!-- 제품 추가 모달창 -->
        <v-ons-dialog :visible.sync="modalVisible" >

               <ul class="list">
                    <h3 style="text-align:center;">거래처정보</h3>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div><b>거래처명</b></div>
                            <div>{{comInfo.CUS_NM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div><b>대표</b></div>
                            <div>{{comInfo.CEO_NM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div><b>전화</b></div>
                            <div>{{comInfo.TEL_NBR}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div><b>주소</b></div>
                            <div>{{comInfo.ADDR_MST}}</div>
                        </div>      
                    </li>
               </ul>       
 
            <v-ons-button modifier="large" @click="modalVisible = false">닫기</v-ons-button>         
        </v-ons-dialog>

        <!-- 캐러셀 -->
        <div style="position:relative;">
            <v-ons-carousel swipeable auto-scroll overscrollable
                :index.sync="carouselIndex"
            >
                <v-ons-carousel-item v-for="(value, index) in items" :key="index" :style="{backgroundColor: value}">
                    <div style="height:200px; text-align:center; font-size: 50px; padding-top: 20px; color: #fff;">{{index}}</div>
                </v-ons-carousel-item>
            </v-ons-carousel>

            <div :style="dots">
                <span :index="dotIndex - 1" v-for="dotIndex in Object.keys(items).length" :key="dotIndex" style="cursor: pointer" @click="carouselIndex = dotIndex - 1">
                    {{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}
                </span>
            </div>
        </div>

        <v-ons-list>
            <v-ons-list-item>
                <div class="left">
                    제품수량
                </div>
                <div class="center" style="margin-left:10px; justify-content:right;">
                    <v-ons-select
                        style="width:30%;"
                        modifier="underbar"
                        v-model="pdc_cnt"
                    >
                        <option 
                            v-for="cnt in count" :key="cnt" 
                            :value="cnt"
                        >
                            {{cnt}}
                        </option>
                    </v-ons-select>
                    &nbsp; /  {{item.PDC_UNIT}}
                </div>
            </v-ons-list-item>
            <v-ons-list-item>
                <div class="left">
                    요청사항
                </div>
                <div class="center" style="margin-left:10px; justify-content:right;">
                    <v-ons-input modifier="underbar" v-model="remark"></v-ons-input>
                </div>
            </v-ons-list-item>

            <v-ons-list-item>
                <div class="left">
                    거래처정보
                </div>
                <div class="center" style="margin-left: 10px; justify-content:right;">
                    <v-ons-button modifier="cta" style="width:50%; text-align:center;" @click="getComInfo"> 보기 </v-ons-button>
                </div>
            </v-ons-list-item>
        </v-ons-list>
 
        <div class="submit">
            <v-ons-button modifier="large" style="height: 60px;font-size:30px;line-height:50px;" @click="order">주문</v-ons-button>
        </div>

    </v-ons-page>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {
    components: { 

    },

    computed:{
        ...mapState({
            user: state => state.user
        })
    },

    created(){
        //제품수량 10개까지 선택
        let cnt = this.item.PDC_UNIT;
        if(cnt > 10 ){
            cnt = 10;
        }
        for( let i =1; i <= cnt; i++){
            this.count.push(i);
        }
    },
    data(){
        return{
            //캐러셀 변수
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

            modalVisible:false,
            count:[],
            pdc_cnt:'1',
            remark:'',
            comInfo:{},

        }
    },
    
    methods: {
        pop() {
            //this.$emit('pop');
            this.$store.dispatch('navigator/popPage');
        },

        getComInfo(){
            let data = {
                cus_id : this.item.CUS_ID
            }
            axios.post('http://49.50.160.174/doctor/hoscominfo',{
                data
            }).then(res =>{            
                this.comInfo = res.data.list[0];
                this.modalVisible=true;
            }).catch(err =>{
                console.log('catch : '+err);
            });

        },
        
        order(){
            this.$ons.notification.confirm({
                title: '주문',
                message: '주문하시겠습니까?',
                buttonLabels: ['취소', '확인'],
                animation: 'default',
                primaryButtonIndex: 1,
                cancelable: true,
                callback: function (index) {
                    return index;  
                }
            }).then(result =>{
                if(result == 1){
                    this.orderSend();
                }
            })
           

        },

        orderSend(){
            let data = {
                pdc_cnt : this.pdc_cnt,
                remark : this.remark,
                item : this.item,
                user : this.user,
            }
            axios.post('http://49.50.160.174/doctor/hosordersend',{
                data
            }).then(res =>{            
                this.$ons.notification.alert(res.data);
                this.pop();
            }).catch(err =>{
                console.log('catch : '+err);
            });
        }
    }
}
</script>

<style scoped>
.list{
    font-size:18px;
}
.list-item__center{
    display: flex;
    justify-content: space-between;
}
.list-item__center > div:nth-child(2){
    width:70%;
    text-align: right;
}
</style>
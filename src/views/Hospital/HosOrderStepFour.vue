<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center"><b>{{ item.PDC_NM }}</b></div>
        </v-ons-toolbar>

<!-- 제품 추가 모달창 -->
        <v-ons-dialog :visible.sync="modalVisible" style="border-radius:10px;">

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
                <li class="list-item list-item--tappable">
                    <div class="list-item__center">
                        <v-ons-button modifier="large" @click="modalVisible = false">닫기</v-ons-button> 
                    </div>      
                </li>
            </ul>                  
        </v-ons-dialog>

        <div class="content">
<!-- 캐러셀 -->
            <div style="position:relative;">
                <v-ons-carousel swipeable auto-scroll overscrollable
                    :index.sync="carouselIndex"
                >
                    <v-ons-carousel-item v-for="(value, index) in items" :key="index" >
                        <div style="height:300px; text-align: center; font-size: 50px; color: #fff;">
                        <img :src="'http://www.mediper.net:8080/_Upload/cus/'+value" onerror="this.src='http://www.mediper.net:8080/images/none_image.png'" style="width:100%;height:100%;"/>
                    </div>
                    </v-ons-carousel-item>
                </v-ons-carousel>

                <div :style="dots">
                    <span :index="dotIndex - 1" v-for="dotIndex in Object.keys(items).length" :key="dotIndex" style="cursor: pointer" @click="carouselIndex = dotIndex - 1">
                        {{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}
                    </span>
                </div>
            </div>

            <div>
                <ul class="list">
                    <li class="list-item" style="margin-top:10px;">
                        <div class="list-item__center">
                            <div>제품번호</div>
                            <div>{{item.PDC_ID}}</div>
                        </div>      
                    </li>
                    <li class="list-item" style="margin-top:10px;">
                        <div class="list-item__center">
                            <div>제품가격</div>
                            <div>{{item.PDC_SALE_PRICE | getComma }} 원</div>
                        </div>      
                    </li>
                    <li class="list-item" style="margin-top:10px;">
                        <div class="list-item__center">
                            <div>제품수량</div>
                            <div>
                            
                                <select class="select-input select-input--underbar"  
                                    v-model="pdc_cnt"
                                    style="width:20%; vertical-align:middle;"
                                >
                                    <option v-for="cnt in count" :key="cnt" :value="cnt">
                                        {{cnt}}
                                    </option>
                                </select> 
                              
                                <span>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;{{item.PDC_UNIT}}</span>
                            </div>
                        </div>      
                    </li>
                    <li class="list-item" style="margin-top:10px;">
                        <div class="list-item__center">
                            <div>합계</div>
                            <div>{{item.PDC_SALE_PRICE * pdc_cnt | getComma }} 원</div>
                        </div>      
                    </li>
                    <li class="list-item">
                        <div class="list-item__center">
                            <div>요청사항</div>
                            <div>
                                <input type="text" class="text-input text-input--underbar" maxlength="50" v-model="remark">
                            </div>
                        </div>      
                    </li>
                    <li class="list-item">
                        <div class="list-item__center">
                            <div>거래처정보</div>
                            <div>
                                <button class="button button--outline" @click="getComInfo">보기</button>
                            </div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <v-ons-button modifier="large" class="order-btn" style="margin:0px; width:100%;" @click="order()">주문</v-ons-button>
                        </div>       
                    </li>
                </ul>
            </div>

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

        this.items = {
            BLUE: this.item.CUS_ID+'/'+this.item.PDC_ID+'/'+this.item.SAVE_NM,
            DARK: this.item.CUS_ID+'/'+this.item.PDC_ID+'/'+this.item.SAVE_NM,
            ORANGE: this.item.CUS_ID+'/'+this.item.PDC_ID+'/'+this.item.SAVE_NM
        }
    },
    data(){
        return{
            //캐러셀 변수
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

            modalVisible:false,
            count:[],
            pdc_cnt:'1',
            remark:'',
            comInfo:{},

        }
    },
    filters:{
        getComma: function (val){
            return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                if(res.data.status =='000'){
                    this.$ons.notification.alert("주문 성공!");
                    this.pop();
                }else{
                    this.$ons.notification.alert("주문 실패!");
                }    

            }).catch(err =>{        
                console.log('catch : '+err);
            });
        }
    }
}
</script>


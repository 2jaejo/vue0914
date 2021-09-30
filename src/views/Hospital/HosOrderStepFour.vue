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
            <div>
                <v-ons-row>
                    <v-ons-col>
                        <h3>거래처정보</h3>
                    </v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>거래처명</v-ons-col>
                    <v-ons-col>{{comInfo.CUS_NM}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>대표</v-ons-col>
                    <v-ons-col>{{comInfo.CEO_NM}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>전화번호</v-ons-col>
                    <v-ons-col>{{comInfo.TEL_NBR}}</v-ons-col>
                </v-ons-row><v-ons-row>
                    <v-ons-col>주소</v-ons-col>
                    <v-ons-col>{{comInfo.ADDR_MST}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>
                        <v-ons-button modifier="large" @click="modalVisible = false">닫기</v-ons-button>
                    </v-ons-col>
                </v-ons-row>     
            </div>
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
                <div class="center" style="margin-left: 10px;">
                    <v-ons-select
                        v-model="pdc_unit"
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
                <div class="center" style="margin-left: 10px;">
                    <v-ons-input v-model="request"></v-ons-input>
                </div>
            </v-ons-list-item>

            <v-ons-list-item>
                <div class="left">
                    거래처정보
                </div>
                <div class="center" style="margin-left: 10px;">
                    <v-ons-button @click="getComInfo"> 보기 </v-ons-button>
                </div>
            </v-ons-list-item>
        </v-ons-list>
 
        <div class="submit">
            <v-ons-button modifier="large" @click="order">주문</v-ons-button>
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
            pdc_unit:'1',
            request:'',
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
            console.log('order');

            let con = confirm('주문하시겠습니까?');
            if(con){
                let data = {
                    pdc_unit : this.pdc_unit,
                    request : this.request,
                    cus_id : this.item.CUS_ID,
                    user_id : this.user.user_id,
                    kor_nm : this.user.kor_nm,
                    relater_nbr : this.user.relater_nbr,
                    relater_div_cde : this.user.relater_div_cde,
                    is_login : this.user.is_login
                }
                axios.post('http://49.50.160.174/doctor/hosordersend',{
                    data
                }).then(res =>{            
                    console.log(res.data);
                }).catch(err =>{
                    console.log('catch : '+err);
                });
            }

        },
    }
}
</script>
<template>
    <v-ons-page
        :infinite-scroll="loadMore"    
    >
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center"><b>{{ title }}</b></div>
        </v-ons-toolbar>
     
        <div class="content">
<!-- 검색 -->
            <v-ons-list>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-input type="date" modifier="underbar" v-model="sdate"></v-ons-input>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-input type="date" modifier="underbar" v-model="edate"></v-ons-input>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <div style="margin-left:2%;width:20%;">
                            상태 : 
                        </div>
                        <div style="width:76%;">
                            <select class="long-select select-input select-input--underbar"  
                                v-model="stateSel"
                            >
                                <option v-for="state in stateSelect" :value="state.value" :key="state.text">
                                    {{state.text}}
                                </option>
                            </select>
                        </div>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-button modifier="large" @click="search">검색</v-ons-button>
                    </div>
                </v-ons-list-item>
            </v-ons-list>

<!-- 목록 -->
            <v-ons-card v-for="order in orderList" :key="order.HC_OM_ID">  
                <div class="title">
                   <b>{{order.OM_ORDER_DT | dateFormat }}</b>
                </div>
                <div class="content">
                    <v-ons-list>
                        <v-ons-list-item expandable>
                             
                            <li class="list-item list-item--tappable">           
                                <div class="list-item__center" style="padding-left:0px;">
                                    <div>주문번호</div>
                                    <div>{{order.HC_OM_ID}}</div>
                                </div>
                            </li>

                            <div class="expandable-content">
                                <ul class="list">
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>상태</div>
                                            <div>{{order.OM_STATE_NM}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>주문자</div>
                                            <div>{{order.OM_NM}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>연락처</div>
                                            <div>{{order.OM_TEL}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>요청사항</div>
                                            <div>{{order.OM_REMARK}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>판매처</div>
                                            <div>{{order.CUS_NM}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>전화</div>
                                            <div>{{order.TEL_NBR}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>주소</div>
                                            <div>{{order.ADDR_MST}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>제품명</div>
                                            <div>{{order.PDC_NM}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>가격</div>
                                            <div>{{order.PDC_SALE_PRICE | getComma }}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>수량</div>
                                            <div>{{order.OM_NUM}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>합계</div>
                                            <div>{{order.TOTAL_PRICE | getComma }}</div>
                                        </div>      
                                    </li>
                                </ul>    
                            </div>
                        </v-ons-list-item>
                    </v-ons-list> 

                </div>
            </v-ons-card>

<!-- 무한스크롤 로딩바 -->
            <div class="after-list" style="text-align:center; padding:10px;">
                <div class="true" v-if="show">
                    <v-ons-icon icon="fa-spinner" size="36px" spin></v-ons-icon>
                </div>
                <div class="false" v-else>
                    <p>마지막 페이지입니다.</p>
                </div>
            </div> 

        </div>
    </v-ons-page>
</template>

<script>
import dayjs from 'dayjs'
import axios from 'axios'
export default {

    components: { 

    },

    created(){
        this.$store.dispatch('chkLoginData');
        //dayjs 플러그인사용
        this.sdate = dayjs().format("YYYY-MM-DD");
        this.edate = dayjs().format("YYYY-MM-DD");


    },
    mounted() {
        this.getOrderList();
    },
    
    computed:{
 
    },
    data(){
        return{
            stateSelect:[
                { text: '전체', value: 'state_all' },
                { text: '주문취소', value: '01' },
                { text: '주문', value: '02' },
                { text: '입고중', value: '03' },
                { text: '입고', value: '04' },
                { text: '교환', value: '05' },
                { text: '출고', value: '06' },
                { text: '환불', value: '07' },
                { text: '주문보류', value: '08' },
            ],
            stateSel:'state_all',
            
            sdate:'',
            edate:'',
            comOrderList:[],

            //인피니트-스크롤 변수
            nextItem:0,
			maxItem:0,
			count:0,
			show:false,
			orderList:[],

        }
    },
    filters:{
        getComma: function (val){
            return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        dateFormat: function (val){
            return dayjs(val).format("YYYY-MM-DD");
        }
    },
    methods: {
        search(){
            this.orderList.splice(0);
            this.getOrderList();
        },

        getOrderList(){
            let data ={
                nbr:this.nbr,
                state:this.stateSel,
                sdate:this.sdate,
                edate:this.edate,
            }

            axios.post('http://49.50.160.174/store/orderlist',{
                data
            }).then(res =>{           
                if(res.data.list.length > 0){
                    this.comOrderList = (JSON.parse(JSON.stringify(res.data.list)));
                    let num;
                    if(this.comOrderList.length > 10){
                        num = 10;
                    }else{
                        num = this.comOrderList.length
                    }
                    //무한스크롤
                    for(let i = 0; i < num; i++) {
                        let data = this.comOrderList[i];
                        this.orderList.push(data);
                    }
                    this.maxItem = this.comOrderList.length;
                    this.nextItem = num;
                    this.count = 5;
                }            

            }).catch(err =>{
                console.log('catch : '+err);
            });
        },

        //무한스크롤 메서드
        loadMore(done) {
            console.log('load');
            this.show=true;

            if(this.nextItem == this.maxItem){
                    this.show=false;
            }
			if ( this.count + this.nextItem > this.maxItem ){
				this.count = this.maxItem - this.nextItem ;
				setTimeout(()=>{
					this.show=false;
				},1000)
            }

			setTimeout(() => {	
				for (let i = this.nextItem ; i < this.nextItem + this.count ; i++) {
					let data = JSON.parse(JSON.stringify(this.comOrderList[i]));  
                    this.orderList.push(data);
				}
				this.nextItem += this.count;
				done();
			}, 600)
		}      
  
    }
}
</script>



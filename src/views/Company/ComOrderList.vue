<template>
    <!-- :infinite-scroll="loadMore" -->
    <v-ons-page>

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
                   <b>{{order.OM_ORDER_DT}}</b>
                </div>
                <div class="content">
                              
                    <div class="list-item__center">
                        <div>주문번호</div>
                        <div>{{order.HC_OM_ID}}</div>
                    </div>
                   
                    <v-ons-list>
                        <v-ons-list-item expandable> 
                            <li class="list-item list-item--tappable">
                                <div class="list-item__center" style="padding-left:0px;">
                                    <div>주문자</div>
                                    <div>{{order.OM_NM}}</div>
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
                                            <div>{{order.PDC_SALE_PRICE}}</div>
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
                                            <div>{{order.TOTAL_PRICE}}</div>
                                        </div>      
                                    </li>
                                </ul>    
                            </div>
                        </v-ons-list-item>
                    </v-ons-list> 

                </div>
            </v-ons-card>

        </div>

        <!-- 로딩바 -->
        <!-- <div class="after-list" style="text-align:center; padding:10px;">
			<v-ons-icon v-if="show" icon="fa-spinner" size="26px" spin></v-ons-icon>
			<p v-else>마지막 페이지입니다. </p>
		</div>  -->

    </v-ons-page>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'
export default {

    components: { 

    },

    created(){
        //dayjs 플러그인사용
        this.sdate = dayjs().format("YYYY-MM-DD");
        this.edate = dayjs().format("YYYY-MM-DD");

        this.search();

        // for(let i = 0; i < 20; i++) {
        //     this.list.push(this.orderList[i]);
        //     }
        // this.maxItem = this.orderList.length;
        // this.nextItem = 20;
        // this.count = 5;
    },
    mounted() {
        
    },
    
    computed:{
        ...mapState({
            orderList : state => state.companyStore.orderList
        })
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
            searchSelect: [
                { text: '주문번호', value: 'HC_OM_ID' },
                { text: '상품코드', value: 'PDC_ID' },
            ],
            searchSel: 'HC_OM_ID',
            keyword:'',
            sdate:'',
            edate:'',

            //인피니트-스크롤 변수
            nextItem:0,
			maxItem:0,
			count:0,
			show:false,
			List: [],

        }
    },
    methods: {
        search(){
            let data = {
                nbr:this.nbr,
                sdate:this.sdate,
                edate:this.edate,
                state:this.stateSel,
                search:this.searchSel,
                keyword:this.keyword,
            };
            this.$store.dispatch('companyStore/searchOrder',data);
            this.keyword = '';
        },

        // loadMore(done) {
            
		// 	if ( this.count + this.nextItem > this.maxItem ){
		// 		this.count = this.maxItem - this.nextItem ;
		// 		setTimeout(()=>{
		// 			this.show=true;
		// 		},1000)
		// 	}
		// 	setTimeout(() => {	
		// 		for (let i = this.nextItem ; i < this.nextItem + this.count ; i++) {
		// 			this.list.push(this.orderList[i]);
		// 		}
		// 		this.nextItem += this.count;
		// 		done();
		// 	}, 600)
		// }        
    }
}
</script>



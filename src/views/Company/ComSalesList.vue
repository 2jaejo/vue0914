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

<!-- 검색 -->
        <div class="content">
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
                        <v-ons-button modifier="large" @click="search">검색</v-ons-button>
                    </div>
                </v-ons-list-item>
            </v-ons-list>     

<!-- 목록 -->
            <v-ons-card v-for="sales in salesList" :key="sales.HC_OM_ID">  
                <div class="title">
                    <b>{{sales.OM_ORDER_DT | dateFormat }}</b>
                </div>
                <div class="content">
                              
                    <div class="list-item__center">
                        <div>주문번호</div>
                        <div>{{sales.HC_OM_ID}}</div>
                    </div>
                   
                    <v-ons-list>
                        <v-ons-list-item expandable> 
                            <li class="list-item list-item--tappable">
                                <div class="list-item__center" style="padding-left:0px;">
                                    <div>주문자</div>
                                    <div>{{sales.OM_NM}}</div>
                                </div>      
                            </li>

                            <div class="expandable-content">
                                <ul class="list">
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>상태</div>
                                            <div>{{sales.OM_STATE_NM}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>연락처</div>
                                            <div>{{sales.OM_TEL}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>요청사항</div>
                                            <div>{{sales.OM_REMARK}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>판매처</div>
                                            <div>{{sales.CUS_NM}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>전화</div>
                                            <div>{{sales.TEL_NBR}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>주소</div>
                                            <div>{{sales.ADDR_MST}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>제품명</div>
                                            <div>{{sales.PDC_NM}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>가격</div>
                                            <div>{{sales.PDC_SALE_PRICE | getComma }}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>수량</div>
                                            <div>{{sales.OM_NUM}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>합계</div>
                                            <div>{{sales.TOTAL_PRICE | getComma }}</div>
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
     mounted(){
        this.getSalesList();
    },
    computed:{
        
    },
    
    data(){
        return{
            sdate:'',
            edate:'',
            comSalesList:[],

            //인피니트-스크롤 변수
            nextItem:0,
			maxItem:0,
			count:0,
			show:false,
			salesList:[],

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
            this.salesList.splice(0);
            this.getSalesList();
        },

        getSalesList(){
            let data ={
                nbr:this.nbr,
                sdate:this.sdate,
                edate:this.edate,
            }

            axios.post('http://49.50.160.174/store/saleslist',{
                data
            }).then(res =>{           
                if(res.data.list.length > 0){
                    this.comSalesList = (JSON.parse(JSON.stringify(res.data.list)));
                    let num;
                    if(this.comSalesList.length > 10){
                        num = 10;
                    }else{
                        num = this.comSalesList.length
                    }
                    //무한스크롤
                    for(let i = 0; i < num; i++) {
                        let data = this.comSalesList[i];
                        this.salesList.push(data);
                    }
                    this.maxItem = this.comSalesList.length;
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
					let data = JSON.parse(JSON.stringify(this.comSalesList[i]));  
                    this.salesList.push(data);
				}
				this.nextItem += this.count;
				done();
			}, 600)
		}      
  
    }
}
</script>


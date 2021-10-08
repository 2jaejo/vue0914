<template>
    <v-ons-page 
        :infinite-scroll="loadMore"
    >
<!-- 툴바 -->
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center"><b>{{ title }}</b></div>
        </v-ons-toolbar>



        <div class="content">
<!-- 검색창 -->
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

<!-- 리스트 -->
        <v-ons-card v-for="(list,i) in orderList" :key="i+list.HC_OM_ID">  
            <div class="title">
                {{list.OM_ORDER_DT}}
            </div>
            <div class="content">
                <v-ons-list >
                    <v-ons-list-item expandable>
                        
                        <b>{{list.PDC_NM}}</b>
               
                        <div class="expandable-content">
                            <ul class="list">
                                <li class="list-item list-item--tappable">
                                    <div class="list-item__center">
                                        <div>주문자</div>
                                        <div>{{list.OM_NM}}</div>
                                    </div>      
                                </li>
                                <li class="list-item list-item--tappable">
                                    <div class="list-item__center">
                                        <div>연락처</div>
                                        <div>{{list.OM_TEL}}</div>
                                    </div>      
                                </li>
                                <li class="list-item list-item--tappable">
                                    <div class="list-item__center">
                                        <div>요청사항</div>
                                        <div>{{list.OM_REMARK}}</div>
                                    </div>      
                                </li>
                                <li class="list-item list-item--tappable">
                                    <div class="list-item__center">
                                        <div>업체명</div>
                                        <div>{{list.CUS_NM}}</div>
                                    </div>      
                                </li>
                                <li class="list-item list-item--tappable">
                                    <div class="list-item__center">
                                        <div>제품명</div>
                                        <div>{{list.PDC_NM}}</div>
                                    </div>      
                                </li>
                                <li class="list-item list-item--tappable">
                                    <div class="list-item__center">
                                        <div>가격</div>
                                        <div>{{list.PDC_PRICE}}</div>
                                    </div>      
                                </li>
                                <li class="list-item list-item--tappable">
                                    <div class="list-item__center">
                                        <div>수량</div>
                                        <div>{{list.OM_NUM}}</div>
                                    </div>      
                                </li>
                                <li class="list-item list-item--tappable">
                                    <div class="list-item__center">
                                        <div>합계</div>
                                        <div>{{list.OM_NUM * list.PDC_PRICE}}</div>
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
import axios from "axios"

export default {
    components: { 

    },
    created(){
        this.sdate = dayjs().format("YYYY-MM-DD");
        this.edate = dayjs().format("YYYY-MM-DD");
        this.getOrderList();
    },
    mounted(){
    },
    updated(){

    },
    computed:{
        
    },
    data(){
        return{
            sdate:'',
            edate:'',
            hosOrderList:[],

            //인피니트-스크롤 변수
            nextItem:0,
			maxItem:0,
			count:0,
			show:false,
			orderList:[],
        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        },

        search(){
            this.orderList.splice(0);
            this.getOrderList();
        },

        getOrderList(){
            let data ={
                nbr:this.nbr,
                sdate:this.sdate,
                edate:this.edate,
            }

            axios.post('http://49.50.160.174/doctor/orderlist',{
                data
            }).then(res =>{
                if(res.data.list.length >0){            
                    this.hosOrderList = (JSON.parse(JSON.stringify(res.data.list)));
                    let num;
                    this.hosOrderList.length > 15 ? num = 15 : num = this.hosOrderList.length;
                    //무한스크롤
                    for(let i = 0; i < num; i++) {
                        let data = this.hosOrderList[i];
                        this.orderList.push(data);
                    }
                    this.maxItem = this.hosOrderList.length;
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
					let data = JSON.parse(JSON.stringify(this.hosOrderList[i]));  
                    this.orderList.push(data);
				}
				this.nextItem += this.count;
				done();
			}, 600)
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
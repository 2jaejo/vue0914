<template>
    <v-ons-page 
        :infinite-scroll="loadMore"
    >
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button>{{ back }}</v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
        </v-ons-toolbar>

    <div class="content">
        <v-ons-list>
            <v-ons-list-item>
                <div class="center" style="padding-top:28px;">
                    <select class="long-select select-input select-input--underbar"
                        v-model="selectYear"
                    >
                        <option v-for="year in years" :key="year" :value="year">{{year}} 년</option>
                    </select>
                </div>
            </v-ons-list-item>
            <v-ons-list-item>
                <div class="center">
                    <select class="long-select select-input select-input--underbar"
                        v-model="selectMonth"
                    >
                        <option v-for="mon in month" :key="mon" :value="mon">{{mon}} 월</option>
                    </select>
                </div>
            </v-ons-list-item>
            <v-ons-list-item>
                    <div class="center">
                        <v-ons-button modifier="large" @click="getMonthList()">검색</v-ons-button>
                    </div>
            </v-ons-list-item>
        </v-ons-list>

            <v-ons-card v-for="(list,i) in monthList" :key="i+list.HC_OM_ID">  
                <div class="title">
                    주문번호 / {{list.HC_OM_ID}}
                </div>
                <div class="content">
                    <v-ons-list>
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
        this.selectYear = dayjs().format("YYYY");
        let year = this.selectYear;
        //현재년도부터 2년전까지
        for( let i = year; i > (year -3); i --){
            this.years.push(i);
        }

        let month = dayjs().format("M");
        month <10 ? this.selectMonth = '0'+month : this.selectMonth = month;

        //현재월부터 1월까지
        for( let i = month; i >= 1; i --){
            i < 10 ? i='0'+i : i ;
            this.month.push(i);
        }

    },
    mounted(){
        this.getMonthList();
    },
    updated(){

    },
    computed:{
        
    },
    data(){
        return{
            years:[],
            selectYear:'',
            month:[],
            selectMonth:'',
            orderMonthList:[],

            //인피니트-스크롤 변수
            nextItem:0,
			maxItem:0,
			count:0,
			show:false,
			monthList:[],
        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        },

        changeYear(){
            this.selectMonth= '01';
            this.monthList.splice(0);
        },
        changeMonth(){
            this.monthList.splice(0);
        },

        getMonthList(){
            this.monthList.splice(0);
            let data ={
                nbr:this.nbr,
                sdate:this.selectYear+this.selectMonth+'01',
                edate:this.selectYear+this.selectMonth+'31',
            };

            axios.post('http://49.50.160.174/doctor/monthlist',{
                data
            }).then(res =>{
                if(res.data.list.length >0){
                    this.orderMonthList = (JSON.parse(JSON.stringify(res.data.list)));
                    let num;
                    if(this.orderMonthList.length > 15){
                        num = 15;
                    }else{
                        num = this.orderMonthList.length
                    }
                    //무한스크롤
                    for(let i = 0; i < num; i++) {
                        let data = this.orderMonthList[i];
                        this.monthList.push(data);
                    }
                    this.maxItem = this.orderMonthList.length;
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
					let data = JSON.parse(JSON.stringify(this.orderMonthList[i]));  
                    this.monthList.push(data);
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
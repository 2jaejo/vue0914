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

        <div class="term" style="margin-top:56px;">
            <v-ons-row>
                <v-ons-col>
                    <v-ons-select  style="width:30%;"
                        v-model="selectYear"
                        @change="changeYear"
                    >
                        <option v-for="year in years" :key="year" :value="year">{{year}}</option>
                    </v-ons-select>
                    <v-ons-select  style="width:20%; margin-left:20px;"
                        v-model="selectMonth"
                        @change="changeMonth"
                    >
                        <option v-for="mon in month" :key="mon" :value="mon">{{mon}}</option>
                    </v-ons-select>
                </v-ons-col>
            </v-ons-row>
        </div>

        <div class="content" style="top:88px;">
            <v-ons-list>
                <v-ons-list-item 
                    expandable
                    modifier="tappable longdivider"
                    v-for="list in monthList" :key="list.HC_OM_ID"
                >
                    <div class="center">
                       {{list.HC_OM_ID}}
                    </div>
                    <div class="expandable-content">
                        {{list}}
                    </div>        
                </v-ons-list-item>
            </v-ons-list>

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
            this.getMonthList();
        },
        changeMonth(){
            this.monthList.splice(0);
            this.getMonthList();
        },

        getMonthList(){
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
                    //무한스크롤
                    for(let i = 0; i < 15; i++) {
                        let data = this.orderMonthList[i];
                        this.monthList.push(data);
                    }
                    this.maxItem = this.orderMonthList.length;
                    this.nextItem = 15;
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
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

        <div class="fixed">
            <v-ons-row style="margin-top:56px;">
                <v-ons-col>
                    <v-ons-input type="date" style="margin:5px 5px; width:80%;" v-model="sdate"></v-ons-input>
                </v-ons-col>
                <v-ons-col>
                    <v-ons-input type="date" style="margin:5px 5px; width:80%;" v-model="edate"></v-ons-input>
                </v-ons-col>
            </v-ons-row>
            <v-ons-button modifier="large" @click="search">검색</v-ons-button>
        </div>

        <div class="content" style="top:140px;">
            <v-ons-list>
                <v-ons-list-item 
                    expandable
                    modifier="tappable longdivider"
                    v-for="list in orderList" :key="list.HC_OM_ID"
                >
                    <div class="center">
                       주문번호 {{list.HC_OM_ID}}
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
<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button></v-ons-back-button>
            </div>
            <div class="center">{{ title }}</div>
        </v-ons-toolbar>
        
        <div class="content">

            <v-ons-card
                v-for="report in reportList" :key="report.GH_OM_ID"
            >
                <v-ons-list>
                    <v-ons-list-item expandable>
                        <div class="list-item__title">
                            주문번호 : {{report.GH_OM_ID}}
                        </div>
                        <div class="list-item__subtitle" style="text-align: left;">
                            {{report.PDC_NM}}
                        </div>
                
                        <div class="expandable-content">
                            <ul class="list">
                                <li class="list-item list-item">
                                    <div class="list-item__center">
                                        <div>주문일자</div>
                                        <div>{{report.OM_ORDER_DT | dateFormat}}</div>
                                    </div>      
                                </li>
                                <li class="list-item list-item">
                                    <div class="list-item__center">
                                        <div>주문자</div>
                                        <div>{{report.OM_NM}}</div>
                                    </div>      
                                </li>
                                <li class="list-item list-item">
                                    <div class="list-item__center">
                                        <div>연락처</div>
                                        <div>{{report.OM_TEL}}</div>
                                    </div>      
                                </li>
                                <li class="list-item list-item">
                                    <div class="list-item__center">
                                        <div>상품가격</div>
                                        <div>{{report.OD_PRICE | getComma}}</div>
                                    </div>      
                                </li>
                                <li class="list-item list-item">
                                    <div class="list-item__center">
                                        <div>수량</div>
                                        <div>{{report.OD_NUM}}</div>
                                    </div>      
                                </li>
                                <li class="list-item list-item">
                                    <div class="list-item__center">
                                        <div>합계</div>
                                        <div>{{report.OD_TOTAL_PRICE | getComma}}</div>
                                    </div>      
                                </li>
                            </ul>
                            <ul class="list">
                                <li class="list-item list-item">
                                    <div class="list-item__center">
                                        <v-ons-button class="del-btn" style="width:100%;" @click="orderCancel(report)">주문취소</v-ons-button>
                                    </div>      
                                </li>
                            </ul>   
                        </div>
                    </v-ons-list-item>
                </v-ons-list>    
            </v-ons-card>
        </div>
    
    </v-ons-page>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'

export default {
    components: { 
        
    },
    computed:{
       
        
    },
    created(){
        this.getReportList();
    },
    data(){
        return{
            reportList:[],
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
        pop() {
            this.$store.dispatch('navigator/popPage');
        },

        getReportList(){
            axios.get('http://49.50.160.174/user/reportlist',{

            }).then(res => {
                this.reportList = res.data.list;

            }).catch(err => {
                console.log('catch : '+err);
            });
        },

        orderCancel(report){

            let data = report;
            axios.post('http://49.50.160.174/user/ordercancel',{
                data
            }).then(res => {
               if(res.data.status =='000'){
                    this.$ons.notification.alert({
                        title: "CODE : "+res.data.status,
                        message: res.data.message
                    }); 
                    this.getReportList();
                }else{
                    this.$ons.notification.alert("취소 실패!");
                }    

            }).catch(err => {
                console.log('catch : '+err);
            });
        }


    }
}
</script>
<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button>{{ back }}</v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
        </v-ons-toolbar>
        
        <div class="content">
            <ul class="list">
                <li class="list-item" style="margin-top:10px;">
                    <div class="list-item__center">
                        <div>
                            진료과목
                        </div>
                        <div>
                            <select class="long-select select-input select-input--underbar" 
                                v-model="tre_id"
                            >
                                <option v-for="list in treatList" :value="list.TRE_ID" :key="list.TRE_ID">
                                    {{list.TRE_NM}}
                                </option>
                            </select>
                        </div>
                    </div>      
                </li>

                <li class="list-item" style="margin-top:10px;">
                    <div class="list-item__center">
                        <div>
                            예약일자
                        </div>
                        <div>
                            <select class="long-select select-input select-input--underbar" 
                                v-model="res_date"
                            >
                                <option v-for="list in resDateList" :value="list.date_cde" :key="list.date_cde">
                                    {{list.date_cde}}
                                </option>
                            </select>
                        </div>
                    </div>      
                </li>

                <li class="list-item" style="margin-top:10px;">
                    <div class="list-item__center">
                        <div>
                            예약시간
                        </div>
                        <div>
                            <select class="long-select select-input select-input--underbar" 
                                v-model="res_time"
                            >
                                <option v-for="list in resTimeList" :value="list.TIME_STR" :key="list.TIME_STR">
                                    {{list.TIME_STR}}
                                </option>
                            </select>
                        </div>
                    </div>      
                </li>

                <li class="list-item" style="margin-top:10px;">
                    <div class="list-item__center">
                        <div>
                            예약사유
                        </div>
                        <div>
                            <input type="text" class="text-input text-input--underbar" maxlength="50" v-model="res_remark" >
                        </div>
                    </div>      
                </li>

                <li class="list-item list-item--tappable">
                    <div class="list-item__center">
                        <v-ons-button class="order-btn" modifier="large" @click="careReservation()">진료예약</v-ons-button>
                    </div>       
                </li>

            </ul>

        </div>
    
    </v-ons-page>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'

export default {
    components: { 

    },
    created(){
///        

        for(let i = 0; i < 7; i++){
            let today = dayjs();
            today = today.add(i,'day');

            let next = dayjs(today).format('YYYY-MM-DD');
            let date = {
                date_cde : next
            }
            this.resDateList.push(date);   
        }
            this.res_date = dayjs().format('YYYY-MM-DD');
    

///
        let data ={
            hos_id: this.hos.HOS_ID,
        }

        axios.post('http://49.50.160.174/user/treatlist',{
            data
        })
        .then(res => {
            this.treatList = res.data.list;
            this.tre_id = res.data.list[0].TRE_ID;
        })
        .catch(err => {
            console.log('catch : '+err);
        });
///
        axios.post('http://49.50.160.174/user/restimelist',{
            data
        })
        .then(res => {
            this.resTimeList = res.data.list;
            this.res_time = res.data.list[0].TIME_STR;
        })
        .catch(err => {
            console.log('catch : '+err);
        });

    },
    data(){
        return{
            today:'',
            treatList:[],
            tre_id:'',
            resDateList:[],
            res_date:'',
            resTimeList:[],
            res_time:'',
            res_remark:'',
        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        },

        careReservation(){
            let data = {
                hos_id:this.hos.HOS_ID,
                tre_id:this.tre_id,
                res_date:this.res_date,
                res_time:this.res_time,
                res_remark:this.res_remark
            }

            axios.post('http://49.50.160.174/user/carereserve',{
                data
            })
            .then(res => {
                if(res.data.status =='000'){
                    this.$ons.notification.alert("예약 성공!");
                    this.pop();
                }else{
                    this.$ons.notification.alert("예약 실패!");
                }    
            })
            .catch(err => {
                console.log('catch : '+err);
            });

        }

    }
}
</script>
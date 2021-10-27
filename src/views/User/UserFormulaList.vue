<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button></v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
        </v-ons-toolbar>
        
        <div class="content">

            <v-ons-list>
                <v-ons-list-header>
                    서식신청리스트
                </v-ons-list-header>
                <v-ons-list-item 
                    expandable
                    v-for="formula in formulaList" :key="formula.FOR_ID"
                >
    
                    <div class="list-item__title">
                        {{formula.FOR_DT}}
                    </div>
                    <div class="list-item__subtitle" style="text-align: left;">
                        {{formula.HOS_NM}}
                    </div>
               
                    <div class="expandable-content">
                        <ul class="list">
                            <li class="list-item list-item">
                                <div class="list-item__center">
                                    <div>신청번호</div>
                                    <div>{{formula.FOR_ID}}</div>
                                </div>      
                            </li>
                            <li class="list-item list-item">
                                <div class="list-item__center">
                                    <div>서식명</div>
                                    <div>{{formula.KOR_NM}}</div>
                                </div>      
                            </li>
                            <li class="list-item list-item">
                                <div class="list-item__center">
                                    <div>수량</div>
                                    <div>{{formula.FOR_NUM}}</div>
                                </div>      
                            </li>
                        </ul>
                        <ul class="list">
                            <li class="list-item list-item">
                                <div class="list-item__center">
                                    <v-ons-button class="del-btn" style="width:100%;" @click="formulaCancel(formula)">서식신청 취소</v-ons-button>
                                </div>      
                            </li>
                        </ul>   
                    </div>
                </v-ons-list-item>
            </v-ons-list>
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

        let today = dayjs().format('YYYY-MM-DD');
        let data = {
            hos_id:this.hos.HOS_ID,
            for_dt:today
        }
        axios.post('http://49.50.160.174/user/formulalist',{
            data
        })
        .then(res => {
            this.formulaList = res.data.formulaList;

        })
        .catch(err => {
            console.log('catch : '+err);
        });


    },
    data(){
        return{
            formulaList:[],
        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        },

        formulaCancel(formula){
            console.log(formula);

            let data = {
                for_id:formula.FOR_ID
            }
            axios.post('http://49.50.160.174/user/formulacancel',{
                data
            })
            .then(res => {
                if(res.data.status =='000'){
                    this.$ons.notification.alert("신청 취소!");
                    this.pop();
                }else{
                    this.$ons.notification.alert("취소 실패!");
                }    
                this.search();
            })
            .catch(err => {
                console.log('catch : '+err);
            });
        }
    }
}
</script>
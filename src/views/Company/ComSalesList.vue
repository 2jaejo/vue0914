<template>
    <v-ons-page>

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
                    {{sales}}
                </div>
                <div class="content">
                    <v-ons-list>
                        <v-ons-list-item expandable>
                            <div style="display:flex; justify-content: space-between;">
                                <div>{{sales.PDC_NM}}</div>
                            </div>
                            <div class="expandable-content">
                                <ul class="list">
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>주문자</div>
                                            <div>{{sales.OM_NM}}</div>
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
                                            <div>업체명</div>
                                            <div>{{sales.CUS_NM}}</div>
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
                                            <div>{{sales.PDC_PRICE}}</div>
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
                                            <div>{{sales.OM_NUM * sales.PDC_PRICE}}</div>
                                        </div>      
                                    </li>
                                </ul>    
                            </div>
                        </v-ons-list-item>
                    </v-ons-list>  
                </div>
            </v-ons-card>

        </div>

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
        let data = {
            nbr:this.nbr,
            sdate:this.sdate,
            edate:this.edate,
            search:this.searchSel,
            keyword:this.keyword,
        };
       
        this.$store.dispatch('companyStore/searchSales',data);
        
    },

    computed:{
        ...mapState({
            salesList : state => state.companyStore.salesList
        })
    },
    data(){
        return{
            searchSelect: [
                { text: '주문번호', value: 'HC_OM_ID' },
                { text: '상품코드', value: 'PDC_ID' },
            ],
            searchSel: 'HC_OM_ID',

            keyword:'',
            sdate:'',
            edate:'',

        }
    },
    methods: {
        search(){
            let data = {
                nbr:this.nbr,
                sdate:this.sdate,
                edate:this.edate,
                search:this.searchSel,
                keyword:this.keyword,
            };
            this.$store.dispatch('companyStore/searchSales',data);
            this.keyword = '';
        },      
    }
}
</script>

<style scoped>

</style>

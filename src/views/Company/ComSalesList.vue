<template>
    <v-ons-page>

        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center"><b>{{ title }}</b></div>
        </v-ons-toolbar>

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
                        <input type="text" class="text-input text-input--underbar" placeholder="제품번호 or 제품명"  float v-model="keyword">
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-button modifier="large" @click="search">검색</v-ons-button>
                    </div>
                </v-ons-list-item>
            </v-ons-list>     

            <v-ons-list>
                <v-ons-list-item expandable
                    v-for="sales in salesList" :key="sales.HC_OM_ID"
                >
                    <div class="center">

                    주문번호 {{sales.HC_OM_ID}}
                    </div>
                    <div class="expandable-content">
                        {{sales}}
                    </div>
                </v-ons-list-item>
            </v-ons-list>
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

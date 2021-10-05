<template>
    <v-ons-page>

        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center">{{ title }}</div>
        </v-ons-toolbar>

        <v-ons-row>
            <v-ons-col class="col" vertical-align="center">
                기간 : 
            </v-ons-col>
            <v-ons-col class="col">
               <v-ons-input type="date" v-model="sdate" style="margin:5px 0; width:90%;"></v-ons-input>~
            </v-ons-col>
            <v-ons-col class="col">
               <v-ons-input type="date" v-model="edate" style="margin:5px 0; width:90%;"></v-ons-input>
            </v-ons-col>
        </v-ons-row>

        <v-ons-row>

            <v-ons-col class="col" width="30%" vertical-align="center">
                <v-ons-select style="width:80%;" height="200" v-model="searchSel">
                    <option v-for="search in searchSelect" :value="search.value" :key="search.text">
                        {{search.text}}
                    </option>
                </v-ons-select>
            </v-ons-col>

            <v-ons-col class="col">
                <v-ons-input placeholder="Search something" style="width:95%; margin-top:10px;" v-model="keyword" float></v-ons-input>
            </v-ons-col>

            <v-ons-col class="col" width="60px"> 
                <v-ons-button @click="search" style="width:100%;">검색</v-ons-button>
            </v-ons-col> 

        </v-ons-row>

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

<template>
    <v-ons-page>

        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center">{{ title }}</div>
        </v-ons-toolbar>

        <v-ons-row style="height:30px;">
            <v-ons-col class="col" width="25%">
                기간
            </v-ons-col>
            <v-ons-col class="col">
               <input type="date" v-model="sdate" style="height:95%;">
            </v-ons-col>
            <v-ons-col class="col">
               <input type="date" v-model="edate" style="height:95%;">
            </v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col class="col" width="25%">
                <v-ons-select style="width:100%;"
                    v-model="searchSel"
                >
                    <option v-for="search in searchSelect" :value="search.value" :key="search.text">
                        {{search.text}}
                    </option>
                </v-ons-select>
            </v-ons-col>
            <v-ons-col class="col">
                <v-ons-input style="width:75%; " v-model="keyword"></v-ons-input>
                <v-ons-button @click="search" style="width:25%;">검색</v-ons-button>
            </v-ons-col> 
        </v-ons-row>
  
        <v-ons-list>
            <v-ons-list-item expandable
                v-for="sales in salesList" :key="sales.HC_OM_ID"
            >
                <div class="center">

                {{sales.HC_OM_ID}}
                </div>
                <div class="expandable-content">
                    주문일자 : {{sales.OM_ORDER_DT}} <br>
                    제품코드 : {{sales.PDC_ID}}<br>
                    {{sales.OM_NM}} <br>
                    {{sales.OM_TEL}} <br>
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
                { text: '주문일자', value: 'OM_ORDER_DT' },
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
                state:this.stateSel,
                search:this.searchSel,
                nbr:this.nbr,
                keyword:this.keyword,
            };
            this.$store.dispatch('companyStore/searchOrder',data);
            this.keyword = '';
        },      
    }
}
</script>

<style scoped>
.col{
    border: 1px solid black;
}

</style>

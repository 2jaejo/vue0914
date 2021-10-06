<template>
    <v-ons-page>

        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center">{{ title }}</div>
        </v-ons-toolbar>

        <div class="fixed" style="margin-top:70px;">
            <v-ons-list>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-input type="date" style="margin:0px 5px; width:95%;" modifier="underbar" v-model="sdate"></v-ons-input>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-input type="date" style="margin:0px 5px; width:95%;" modifier="underbar" v-model="edate"></v-ons-input>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                         <v-ons-select style="margin:0px 5px; width:95%;" height="200" v-model="searchSel">
                            <option v-for="search in searchSelect" :value="search.value" :key="search.text">
                                {{search.text}}
                            </option>
                        </v-ons-select>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-input placeholder="Search something" style="width:95%;" v-model="keyword" float></v-ons-input>
                    </div>
                </v-ons-list-item>
            </v-ons-list>
            <v-ons-button modifier="large" style="height:60px;font-size:30px;line-height:60px;" @click="search">검색</v-ons-button>
            
        </div>        

        <div class="content" style="margin-top:300px;">
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

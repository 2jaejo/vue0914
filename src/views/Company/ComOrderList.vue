<template>
    <!-- :infinite-scroll="loadMore" -->
    <v-ons-page>

        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center">{{ title }}</div>
        </v-ons-toolbar>

        <v-ons-row>
            <v-ons-col class="col" width="15%" vertical-align="center">
                기간 : 
            </v-ons-col>
            <v-ons-col class="col">
               <input type="date" v-model="sdate" style="width:99%; height:90%;">
            </v-ons-col>
            <v-ons-col class="col">
               <input type="date" v-model="edate" style="width:99%; height:90%;">
            </v-ons-col>
        </v-ons-row>

        <v-ons-row>
            <v-ons-col class="col" width="25%" vertical-align="center">
                검색조건 : 
            </v-ons-col>
            <v-ons-col class="col">
                <v-ons-select style="width:80%;" v-model="searchSel">
                    <option v-for="search in searchSelect" :value="search.value" :key="search.text">
                        {{search.text}}
                    </option>
                </v-ons-select>
            </v-ons-col>
            <v-ons-col class="col" width="15%" vertical-align="center">
                상태 :           
            </v-ons-col>
            <v-ons-col class="col">
                <v-ons-select style="width:80%" v-model="stateSel">
                    <option v-for="state in stateSelect" :value="state.value" :key="state.text">
                        {{state.text}}
                    </option>
                </v-ons-select>
            </v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col class="col">
                <v-ons-input placeholder="Search something" style="width:90%; margin-left:5%; margin-top:30px;" float v-model="keyword"></v-ons-input>
            </v-ons-col>
            <v-ons-col class="col" width="60px">      
                <v-ons-button @click="search" style="width:100%;"><p>검색</p></v-ons-button>
            </v-ons-col>  
        </v-ons-row>
  
        <v-ons-list>
            <v-ons-list-item expandable
                v-for="order in orderList" :key="order.HC_OM_ID"
            >
                <div class="center">

                {{order.HC_OM_ID}}
                </div>
                <div class="expandable-content">
                    주문일자 : {{order.OM_ORDER_DT}} <br>
                    제품코드 : {{order.PDC_ID}}<br>
                    이름     : {{order.OM_NM}} <br>
                    연락처   : {{order.OM_TEL}} <br>
                    상태     : {{order.OM_STATE_CDE}}
                </div>
            </v-ons-list-item>
        </v-ons-list>
       
        <!-- 로딩바 -->
        <!-- <div class="after-list" style="text-align:center; padding:10px;">
			<v-ons-icon v-if="show" icon="fa-spinner" size="26px" spin></v-ons-icon>
			<p v-else>마지막 페이지입니다. </p>
		</div>  -->

    </v-ons-page>
</template>

<script>
import { mapState } from 'vuex'
export default {

    components: { 

    },

    created(){
        let data = {
            state:this.stateSel,
            search:this.searchSel,
            nbr:this.nbr,
            keyword:this.keyword,
        };
        this.$store.dispatch('companyStore/searchOrder',data);

        // for(let i = 0; i < 20; i++) {
        //     this.list.push(this.orderList[i]);
        //     }
        // this.maxItem = this.orderList.length;
        // this.nextItem = 20;
        // this.count = 5;
    },
    mounted() {
        
    },
    
    computed:{
        ...mapState({
            orderList : state => state.companyStore.orderList
        })
    },
    data(){
        return{
            stateSelect:[
                { text: '전체', value: 'state_all' },
                { text: '주문취소', value: '01' },
                { text: '주문', value: '02' },
                { text: '입고중', value: '03' },
                { text: '입고', value: '04' },
                { text: '교환', value: '05' },
                { text: '출고', value: '06' },
                { text: '환불', value: '07' },
                { text: '주문보류', value: '08' },
            ],
            stateSel:'state_all',
            searchSelect: [
                { text: '주문번호', value: 'HC_OM_ID' },
                { text: '상품코드', value: 'PDC_ID' },
                { text: '주문일자', value: 'OM_ORDER_DT' },
            ],
            searchSel: 'HC_OM_ID',
            keyword:'',

            //인피니트-스크롤 변수
            nextItem:0,
			maxItem:0,
			count:0,
			show:false,
			list: [],

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

        // loadMore(done) {
            
		// 	if ( this.count + this.nextItem > this.maxItem ){
		// 		this.count = this.maxItem - this.nextItem ;
		// 		setTimeout(()=>{
		// 			this.show=true;
		// 		},1000)
		// 	}
		// 	setTimeout(() => {	
		// 		for (let i = this.nextItem ; i < this.nextItem + this.count ; i++) {
		// 			this.list.push(this.orderList[i]);
		// 		}
		// 		this.nextItem += this.count;
		// 		done();
		// 	}, 600)
		// }        
    }
}
</script>

<style scoped>
.col{
    
}

</style>

<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center">{{ title }}</div>
        </v-ons-toolbar>

       <v-ons-row>
            <v-ons-col class="col" width="25%" vertical-align="center">
                <p style="margin-left:10px;">대분류 : </p>
            </v-ons-col>
            <v-ons-col class="col">
               <v-ons-select style="width:90%; margin-top:10px;" @change="selectStepOne()" v-model="sel_step1">
                    <option v-for="Step1 in itemStepOne" :value="Step1.CLS_ID" :key="Step1.CLS_ID">
                        {{Step1.CLS_NM}}
                    </option>
                </v-ons-select>
            </v-ons-col>
       </v-ons-row>

       <v-ons-row v-show="select_step2">    
            <v-ons-col class="col" width="25%" vertical-align="center">
                <p style="margin-left:10px;">소분류 : </p>
            </v-ons-col>
            <v-ons-col class="col">
               <v-ons-select style="width:90%; margin-top:10px;" v-model="sel_step2">
                    <option v-for="Step2 in itemClassStep2" :value="Step2.CLS_ID" :key="Step2.CLS_ID">
                        {{Step2.CLS_NM}}
                    </option>
                </v-ons-select>
            </v-ons-col>
        </v-ons-row>

        <v-ons-row>
            <v-ons-col class="col" width="30%">
                <v-ons-select style="width:80%" v-model="searchSel">
                    <option v-for="search in searchSelect" :value="search.value" :key="search.text">
                        {{search.text}}
                    </option>
                </v-ons-select>
            </v-ons-col>
            <v-ons-col class="col">
                <v-ons-input placeholder="Search something" style="width:90%; margin-left:5%; margin-top:30px;" float v-model="keyword"></v-ons-input>
            </v-ons-col>
            <v-ons-col class="col" width="60px">      
                <v-ons-button @click="search" style="width:100%;"><p>검색</p></v-ons-button>
            </v-ons-col>  
        </v-ons-row>

        <v-ons-list>
            <v-ons-list-item expandable
                v-for="item in itmeList" :key="item.CLS_ID"
            >
                <!-- <div class="left">
                    {{item.PDC_ID}}
                </div> -->
                <div class="center">
                    {{item.PDC_NM}}
                </div>
                <!-- <div class="right">
                    {{item.PDC_STD}}
                </div> -->
                <div class="expandable-content">
                    제품수량 : {{item.PDC_UNIT}} <br>
                    제품금액 : {{item.PDC_UNIT_PRICE}} <br>
                    할인금액 : {{item.PDC_SALE_PRICE}} <br>
                    내용     : {{item.CONTENT}} <br>
                    내용코드 : {{item.CONTENT_CDE}} <br>
                    상태코드 : {{item.PDC_STATE_CDE}}
                </div>
            </v-ons-list-item>
        </v-ons-list>

    </v-ons-page>
</template>

<script>
import { mapState } from 'vuex'
export default {
    created(){  
        this.$store.dispatch('companyStore/itemSelectStepOne');
    },
    mounted(){
        let data = {
            nbr:this.nbr,
        };
        this.$store.dispatch('companyStore/itemList', data);
    },
    components: { 

    },
    computed:{
        ...mapState({
            itmeList: state => state.companyStore.itmeList,
            itemStepOne: state => state.companyStore.itemStepOne,
            itemStepTwo: state => state.companyStore.itemStepTwo,
        })
    },
    watch:{
        itemStepTwo(val){    
            this.itemClassStep2 = val;          
        }
    },
    data(){
        return{
            sel_step1:'0',
            itemClassStep2:[],
            sel_step2:'0',
            select_step2:false,
            searchSelect: [
                { text: '상품코드', value: 'PDC_ID' },
                { text: '상품명', value: 'PDC_NM' },
            ],
            searchSel:'PDC_ID',
            keyword:'',
        }
    },
    methods: {
        search(){

        },

        selectStepOne(){
            if( this.sel_step1 == '0'){
                this.sel_step2='0';
                this.select_step2= false;
                this.itemClassStep2.splice();
            }else{
                let data = {
                    key: this.sel_step1,
                };
                this.select_step2= true;
                this.$store.dispatch('companyStore/itemSelectStepTwo',data);
            }
        }
    }
}
</script>
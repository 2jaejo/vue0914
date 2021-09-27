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
                    <option v-for="Step1 in itemClassOne" :value="Step1.CLS_ID" :key="Step1.CLS_ID">
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
               <v-ons-select style="width:90%; margin-top:10px;" @change="selectStepTwo()" v-model="sel_step2">
                    <option v-for="Step2 in itemClassTwo" :value="Step2.CLS_ID" :key="Step2.CLS_ID">
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
                v-for="item in list" :key="item.CLS_ID"
            >
                <div class="center">
                    {{item.PDC_ID}} / {{item.PDC_NM}}
                </div>
                <div class="right">
                </div>
               
                <div class="expandable-content">
                    <v-ons-row>
                        {{item.CLS_ID}}
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>제품수량</v-ons-col>
                        <v-ons-col>{{item.PDC_UNIT}}</v-ons-col>
                        <v-ons-col><input type="text" v-model="modData.PDC_UNIT"></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>제품금액</v-ons-col>
                        <v-ons-col>{{item.PDC_UNIT_PRICE}}</v-ons-col>
                        <v-ons-col><input type="text" v-model="modData.PDC_UNIT_PRICE"></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>할인금액</v-ons-col>
                        <v-ons-col>{{item.PDC_SALE_PRICE}}</v-ons-col>
                        <v-ons-col><input type="text" v-model="modData.PDC_SALE_PRICE"></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>내용</v-ons-col>
                        <v-ons-col>{{item.CONTENT}}</v-ons-col>
                        <v-ons-col><input type="text" v-model="modData.CONTENT"></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>내용코드</v-ons-col>
                        <v-ons-col>{{item.CONTENT_CDE}}</v-ons-col>
                        <v-ons-col><input type="text" v-model="modData.CONTENT_CDE"></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>상태코드</v-ons-col>
                        <v-ons-col>{{item.PDC_STATE_CDE}}</v-ons-col>
                        <v-ons-col><input type="text" v-model="modData.PDC_STATE_CDE"></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col><button @click="del(item)">삭제</button></v-ons-col>
                        <v-ons-col></v-ons-col>
                        <v-ons-col><button @click="mod(item)">수정</button></v-ons-col>
                    </v-ons-row>
                    
                    
                    
                </div>
            </v-ons-list-item>
        </v-ons-list>

    </v-ons-page>
</template>

<script>
import axios from "axios"
import { mapState } from 'vuex'
export default {
    created(){  
        this.$store.commit('companyStore/itemSelectStepOne');

    },
    mounted(){
        this.search();
        
    },
    components: { 

    },
    computed:{
        ...mapState({
            itemList: state => state.companyStore.itemList,
            itemStepOne: state => state.companyStore.itemStepOne,
            itemStepTwo: state => state.companyStore.itemStepTwo,
        })
    },
    watch:{
        itemList(val){
            this.list = val;
        },
        itemStepOne(val){       
            this.itemClassOne = val;
            this.sel_step1 = val[0].CLS_ID; 
        },
        itemStepTwo(val){   
            this.itemClassTwo = val;
            this.sel_step2 = val[0].CLS_ID;           
        }
    },
    data(){
        return{
            list:[],
            itemClassOne:[],
            sel_step1:'',
            itemClassTwo:[],
            sel_step2:'',
            select_step2:true,
            searchSelect: [
                { text: '상품코드', value: 'PDC_ID' },
                { text: '상품명', value: 'PDC_NM' },
            ],
            searchSel:'PDC_ID',
            keyword:'',

            //수정 데이터
            modData:{
                PDC_UNIT:'',
                PDC_UNIT_PRICE:'',
                PDC_SALE_PRICE:'',
                CONTENT:'',
                CONTENT_CDE:'',
                PDC_STATE_CDE:'',
            }
        }
    },
    methods: {

        //검색
        search(){
            let data = {
                nbr:this.nbr,
                step1:this.sel_step1,
                step2:this.sel_step2,
                search:this.searchSel,
                keyword:this.keyword,
            };
            this.$store.dispatch('companyStore/searchItem', data);
        },

        //대분류 change event
        selectStepOne(){    
                //this.itemClassTwo.splice();
                let data = {
                    step1: this.sel_step1,
                };
                this.select_step2= true;
                this.$store.dispatch('companyStore/itemSelectStepTwo',data);
        },

        //소분류 change event
        selectStepTwo(){
            // this.search();
            // this.keyword = '';
        },

        mod(item){
            alert("수정");
            let data = {
                item: item,
                modData: this.modData
            }
  
            axios.post('http://49.50.160.174/store/itemmodify',{
                data
            })
            .then(res => {
                console.log(res.data);
                alert(res.data.list);
            })
            .catch( error => {
                console.log('catch : ' + error);
            })
            .finally(() =>{
                this.search();
                this.modData.PDC_UNIT='';
                this.modData.PDC_UNIT_PRICE='';
                this.modData.PDC_SALE_PRICE='';
                this.modData.CONTENT='';
                this.modData.CONTENT_CDE='';
                this.modData.PDC_STATE_CDE='';
            });


        },

        del(item){
            alert("삭제");
            console.log(item);
        }
    }
}
</script>
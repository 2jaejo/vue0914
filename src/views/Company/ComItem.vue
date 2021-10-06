<template>
    <v-ons-page>

<!-- 툴바 -->
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center">{{ title }}</div>
        </v-ons-toolbar>

        <v-ons-bottom-toolbar style="height:36px;">
            <v-ons-button @click="modalVisible = true" modifier="large" style="background-color:#fc4e03;">상품추가</v-ons-button>
        </v-ons-bottom-toolbar>

<!-- 검색창 -->
        <div class="fixed" style="margin-top:70px;">
            <v-ons-list>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-select style="width:95%;" @change="selectStepOne()" v-model="sel_step1">
                            <option v-for="Step1 in itemClassOne" :value="Step1.CLS_ID" :key="Step1.CLS_ID">
                                {{Step1.CLS_NM}}
                            </option>
                        </v-ons-select>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-select style="width:95%;" @change="selectStepTwo()" v-model="sel_step2">
                            <option v-for="Step2 in itemClassTwo" :value="Step2.CLS_ID" :key="Step2.CLS_ID">
                                {{Step2.CLS_NM}}
                            </option>
                        </v-ons-select>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-select style="width:95%" v-model="searchSel">
                            <option v-for="search in searchSelect" :value="search.value" :key="search.text">
                                {{search.text}}
                            </option>
                        </v-ons-select>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-input placeholder="Search something" style="width:95%;" float v-model="keyword"></v-ons-input>
                    </div>
                </v-ons-list-item>
            </v-ons-list>
            <v-ons-button modifier="large" style="height:60px;font-size:30px;line-height:60px;" @click="search">검색</v-ons-button>
        </div>

            


<!-- 제품 추가 모달창 -->
        <v-ons-dialog :visible.sync="modalVisible" >
            <div class="addData">
                <div class="title">
                    <h1>상품추가</h1>
                </div>
                <v-ons-row>
                    <v-ons-col>제품분류</v-ons-col>
                    <v-ons-col><v-ons-input type="text" v-model="addData.CLS_ID"></v-ons-input></v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>제품명</v-ons-col>
                    <v-ons-col><v-ons-input type="text" v-model="addData.PDC_NM"></v-ons-input></v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>제품규격</v-ons-col>
                    <v-ons-col><v-ons-input type="text" v-model="addData.PDC_STD"></v-ons-input></v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>제품수량</v-ons-col>
                    <v-ons-col><v-ons-input type="text" v-model="addData.PDC_UNIT"></v-ons-input></v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>제품금액</v-ons-col>
                    <v-ons-col><v-ons-input type="text" v-model="addData.PDC_UNIT_PRICE"></v-ons-input></v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>할인금액</v-ons-col>
                    <v-ons-col><v-ons-input type="text" v-model="addData.PDC_SALE_PRICE"></v-ons-input></v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>내용</v-ons-col>
                    <v-ons-col><v-ons-input type="text" v-model="addData.CONTENT"></v-ons-input></v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>내용코드</v-ons-col>
                    <v-ons-col><v-ons-input type="text" v-model="addData.CONTENT_CDE"></v-ons-input></v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>상태코드</v-ons-col>
                    <v-ons-col><v-ons-input type="text" v-model="addData.PDC_STATE_CDE"></v-ons-input></v-ons-col>
                </v-ons-row>
            </div>
            <div class="submit">
                <v-ons-button style="width:30%; margin:5px;" @click="modalVisible = false">취소</v-ons-button>

                <v-ons-button style="width:60%; margin:5px; background-color:#fc4e03;" @click="add">추가</v-ons-button>
            </div>
        </v-ons-dialog>

    <div class="background"></div> 

    <!-- 리스트 -->
    <div class="content" style="top:360px; margin:5px 0px;">
        <v-ons-list>
            <v-ons-list-item 
                expandable
                modifier="tappable longdivider"
                v-for="item in list" :key="item.PDC_ID"
            >
                {{item.PDC_ID}} / {{item.PDC_NM}}
               
                <div class="expandable-content">
                    <v-ons-row>
                        <h3>제품분류 : {{item.CLS_ID}}</h3>
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
                    <v-ons-row style="margin-top:5px;">
                        <v-ons-col><v-ons-button @click="del(item)">삭제</v-ons-button></v-ons-col>
                        <v-ons-col></v-ons-col>
                        <v-ons-col><v-ons-button @click="mod(item)">수정</v-ons-button></v-ons-col>
                    </v-ons-row>
                    {{item}}                 
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </div>

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
        //alert("mounted");
        
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
            this.search();
        }
    },
    data(){
        return{
            modalVisible:false,
            timeoutID:0,
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
            },

            //추가 데이터
            addData:{
                CLS_ID:'',
                PDC_NM:'',
                PDC_STD:'',
                PDC_UNIT:'',
                PDC_UNIT_PRICE:'',
                PDC_SALE_PRICE:'',
                CONTENT:'',
                CONTENT_CDE:'',
                PDC_STATE_CDE:'',
            },

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
            this.search();
            this.keyword = '';
        },

        //수정
        mod(item){
            let con = confirm("수정하시겠습니까?");
            if(con){
                let data = {
                    item: item,
                    modData: this.modData
                }
    
                axios.post('http://49.50.160.174/store/itemmodify',{
                    data
                })
                .then(res => {
                    alert(res.data.list);
                    this.search();
                    this.modData.PDC_UNIT='';
                    this.modData.PDC_UNIT_PRICE='';
                    this.modData.PDC_SALE_PRICE='';
                    this.modData.CONTENT='';
                    this.modData.CONTENT_CDE='';
                    this.modData.PDC_STATE_CDE='';
                })
                .catch( error => {
                    console.log('catch : ' + error);
                })
                .finally(() =>{

                });
            }

        },

        //삭제
        del(item){
            let con = confirm("삭제하시겠습니까?");
            if(con){
                let data = {
                    cus_id : item.CUS_ID,
                    pdc_id : item.PDC_ID,
                }
                axios.post('http://49.50.160.174/store/itemdelete',{
                    data
                })
                .then(res => {
                    alert(res.data.list);
                    this.search();           
                })
                .catch( error => {
                    console.log('catch : ' + error);
                });
            }
        },

        //추가
        add(){
            let data = this.addData;
            data.nbr = this.nbr;  

            for (let k in data){
                if(data[k]==''){
                    alert("값을 입력하세요");
                    return false;
                }
            }
          
            axios.post('http://49.50.160.174/store/itemadd',{
                    data
                })
                .then(res => {
                    alert(res.data.list);
                    this.search();
                    this.addData.CLS_ID='',
                    this.addData.PDC_NM='',
                    this.addData.PDC_STD='',
                    this.addData.PDC_UNIT='';
                    this.addData.PDC_UNIT_PRICE='';
                    this.addData.PDC_SALE_PRICE='';
                    this.addData.CONTENT='';
                    this.addData.CONTENT_CDE='';
                    this.addData.PDC_STATE_CDE='';
                })
                .catch( error => {
                    console.log('catch : ' + error);
                });
            
        },

    }
}


</script>
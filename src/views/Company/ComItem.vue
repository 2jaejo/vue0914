<template>
    <v-ons-page
        :infinite-scroll="loadMore"
    >

<!-- 툴바 -->
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center"><b>{{ title }}</b></div>
        </v-ons-toolbar>
           
<!-- 검색창 -->
        <div class="content">
            <v-ons-list>
                <v-ons-list-item>
                    <div class="center">
                        <select class="long-select select-input select-input--underbar"
                            @change="selectStepOne()" 
                            v-model="sel_step1"
                            style="margin-top:10px;"
                        >
                            <option v-for="Step1 in itemClassOne" :value="Step1.CLS_ID" :key="Step1.CLS_ID">
                                {{Step1.CLS_NM}}
                            </option>
                        </select>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <select class="long-select select-input select-input--underbar"
                            @change="selectStepTwo()" 
                            v-model="sel_step2"
                        >
                            <option v-for="Step2 in itemClassTwo" :value="Step2.CLS_ID" :key="Step2.CLS_ID">
                                {{Step2.CLS_NM}}
                            </option>
                        </select>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-input placeholder="제품번호 or 제품명" 
                                float 
                                type="text" 
                                style="width:96%; margin:10px auto;"
                                modifier="underbar"
                                v-model="keyword"
                                @keyup.enter="search"
                                maxlength="50"
                            >
                            </v-ons-input>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                        <v-ons-button class="search-btn-large" modifier="large" @click="search">검색</v-ons-button>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="center">
                    <v-ons-button class="add-btn-large" @click="addModalVisible = true" modifier="large">상품추가</v-ons-button>
                    </div>
                </v-ons-list-item>

                
            </v-ons-list>

<!-- 제품 추가 모달창 -->
            <v-ons-dialog :visible.sync="addModalVisible">
                <div class="showModal">
                    <div class="title">
                        <h1>상품추가</h1>
                    </div>
                    <v-ons-row>
                        <v-ons-col>
                            <select class="long-select select-input select-input--underbar"
                                @change="selectStepOne()" 
                                v-model="sel_step1"
                                style="width:100%;"
                            >
                                <option v-for="Step1 in itemClassOne" :value="Step1.CLS_ID" :key="Step1.CLS_ID">
                                    {{Step1.CLS_NM}}
                                </option>
                            </select>
                        </v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>
                            <select class="long-select select-input select-input--underbar"
                                @change="selectStepTwo()" 
                                v-model="sel_step2"
                                style="width:100%;"
                            >
                                <option v-for="Step2 in itemClassTwo" :value="Step2.CLS_ID" :key="Step2.CLS_ID">
                                    {{Step2.CLS_NM}}
                                </option>
                            </select>
                        </v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>상품명</v-ons-col>
                        <v-ons-col><v-ons-input type="text" modifier="underbar" maxlength="50" v-model="addData.PDC_NM"></v-ons-input></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>상품규격</v-ons-col>
                        <v-ons-col><v-ons-input type="text" modifier="underbar" maxlength="10" v-model="addData.PDC_STD"></v-ons-input></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>상품수량</v-ons-col>
                        <v-ons-col><v-ons-input type="text" modifier="underbar" maxlength="10" v-model="addData.PDC_UNIT"></v-ons-input></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>상품금액</v-ons-col>
                        <v-ons-col><v-ons-input type="text" modifier="underbar" maxlength="10" v-model="addData.PDC_UNIT_PRICE"></v-ons-input></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>할인금액</v-ons-col>
                        <v-ons-col><v-ons-input type="text" modifier="underbar" maxlength="10" v-model="addData.PDC_SALE_PRICE"></v-ons-input></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>내용</v-ons-col>
                        <v-ons-col><v-ons-input type="text" modifier="underbar" maxlength="2" v-model="addData.CONTENT"></v-ons-input></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>내용코드</v-ons-col>
                        <v-ons-col><v-ons-input type="text" modifier="underbar" maxlength="2" v-model="addData.CONTENT_CDE"></v-ons-input></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>상태코드</v-ons-col>
                        <v-ons-col><v-ons-input type="text" modifier="underbar" maxlength="2" v-model="addData.PDC_STATE_CDE"></v-ons-input></v-ons-col>
                    </v-ons-row>
                    <v-ons-row style="margin-top:10px;">
                        <v-ons-col><v-ons-button class="cancel-btn" @click="addModalVisible = false; cleanAdd(); ">취소</v-ons-button></v-ons-col>
                        <v-ons-col><v-ons-button class="add-btn" @click="add">추가</v-ons-button></v-ons-col>
                    </v-ons-row>
                </div>
            </v-ons-dialog>

<!-- 제품 수정 모달창 -->
            <v-ons-dialog :visible.sync="modModalVisible">
                <div class="showModal">
                    <div class="title">
                        <h1>상품수정</h1>
                    </div>
                    <v-ons-row>
                        <v-ons-col><p><b>상품코드</b></p></v-ons-col>
                        <v-ons-col><p><b>{{modData.PDC_ID}}</b></p></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>상품수량</v-ons-col>
                        <v-ons-col><v-ons-input type="text" modifier="underbar" maxlength="10" v-model="modData.PDC_UNIT"></v-ons-input></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>상품금액</v-ons-col>
                        <v-ons-col><v-ons-input type="text" modifier="underbar" maxlength="10" v-model="modData.PDC_UNIT_PRICE"></v-ons-input></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>할인금액</v-ons-col>
                        <v-ons-col><v-ons-input type="text" modifier="underbar" maxlength="10" v-model="modData.PDC_SALE_PRICE"></v-ons-input></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>내용</v-ons-col>
                        <v-ons-col><v-ons-input type="text" modifier="underbar" maxlength="100" v-model="modData.CONTENT"></v-ons-input></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>내용코드</v-ons-col>
                        <v-ons-col><v-ons-input type="text" modifier="underbar" maxlength="10" v-model="modData.CONTENT_CDE"></v-ons-input></v-ons-col>
                    </v-ons-row>
                    <v-ons-row>
                        <v-ons-col>상태코드</v-ons-col>
                        <v-ons-col><v-ons-input type="text" modifier="underbar" maxlength="10" v-model="modData.PDC_STATE_CDE"></v-ons-input></v-ons-col>
                    </v-ons-row>
                    <v-ons-row style="margin-top:10px;">
                        <v-ons-col><v-ons-button class="cancel-btn" @click="modModalVisible = false;">취소</v-ons-button></v-ons-col>
                        <v-ons-col><v-ons-button class="mod-btn" @click="mod()">수정</v-ons-button></v-ons-col>
                    </v-ons-row>       
                </div>
            </v-ons-dialog>

<!-- 목록 -->
            <v-ons-card v-for="item in itemList" :key="item.PDC_ID">  
                <div class="title">
                    <b>{{item.PDC_NM}}</b>
                </div>
                <div class="content">

                    <v-ons-list>
                        <v-ons-list-item expandable>
                        
                            <div class="list-item__center" style="padding-left:0px;">
                                <div>상품코드</div>
                                <div>{{item.PDC_ID}}</div>
                            </div>

                            <div class="expandable-content">
<!-- 캐러셀 -->
                                <div style="position:relative;">
                                    <v-ons-carousel 
                                        swipeable 
                                        auto-scroll 
                                        overscrollable    
                                        :index.sync="carouselIndex"
                                    >
                                        <v-ons-carousel-item v-for="(value, index) in items" :key="index">
                                            <div style="height:300px; text-align: center; font-size: 50px; color: #fff;">
                                                <img :src="value" onerror="this.src='http://www.mediper.net:8080/images/none_image.png'" style="width:100%;height:100%;"/>
                                            </div>
                                        </v-ons-carousel-item>
                                    </v-ons-carousel>

                                    <div :style="dots">
                                        <span :index="dotIndex - 1" v-for="dotIndex in Object.keys(items).length" :key="dotIndex" style="cursor: pointer" @click="carouselIndex = dotIndex - 1">
                                            {{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}
                                        </span>
                                    </div>
                                </div>

                                <ul class="list">
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>상품수량</div>
                                            <div>{{item.PDC_UNIT}}</div>
                                        </div>      
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>상품금액</div>
                                            <div>{{item.PDC_UNIT_PRICE}}</div>
                                        </div>
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>할인금액</div>
                                            <div>{{item.PDC_SALE_PRICE}}</div>
                                        </div>
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>내용</div>
                                            <div>{{item.CONTENT}}</div>
                                        </div>
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>내용코드</div>
                                            <div>{{item.CONTENT_CDE}}</div>
                                        </div>
                                    </li>
                                    <li class="list-item list-item--tappable">
                                        <div class="list-item__center">
                                            <div>상태코드</div>
                                            <div>{{item.PDC_STATE_CDE}}</div>
                                        </div>
                                    </li>
                                    <li class="list-item">
                                        <div class="list-item__center">
                                            <div><v-ons-button class="del-btn" @click="del(item)">삭제</v-ons-button></div>
                                            <div><v-ons-button class="mod-btn" @click="modModalOpen(item)">수정</v-ons-button></div>
                                        </div>
                                    </li>
                                </ul> 

                            </div>
                        </v-ons-list-item>
                    </v-ons-list>
                </div>
            </v-ons-card>

<!-- 무한스크롤 로딩바 -->
            <div class="after-list" style="text-align:center; padding:10px;">
                <div class="true" v-if="show">
                    <v-ons-icon icon="fa-spinner" size="36px" spin></v-ons-icon>
                </div>
                <div class="false" v-else>
                    <p>마지막 페이지입니다.</p>
                </div>
            </div> 

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
        this.getItemList();
    },
    components: { 
        
        },
    computed:{
        ...mapState({
            itemStepOne: state => state.companyStore.itemStepOne,
            itemStepTwo: state => state.companyStore.itemStepTwo,
        })
    },
    watch:{
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
            //캐러셀
            carouselIndex: 0,
            items: {
                BLUE: '#085078',
                DARK: '#373B44',
                ORANGE: '#D38312'
            },
            dots: {
                textAlign: 'center',
                fontSize: '20px',
                color: '#fff',
                position: 'absolute',
                bottom: '10px',
                left: 0,
                right: 0
            },


            addModalVisible:false,
            modModalVisible:false,

            itemClassOne:[],
            sel_step1:'',
            itemClassTwo:[],
            sel_step2:'',
            keyword:'',

            //수정 데이터
            modData:{
                CUS_ID:'',
                PDC_ID:'',
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
            
            //인피니트-스크롤 변수
            nextItem:0,
			maxItem:0,
			count:0,
			show:false,
			itemList:[],
            comItemList:[],

        }
    },
    methods: {
        upload(e){
            var file = e.target.files;
            let url = URL.createObjectURL(file[0]);
            this.image = url;
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
        //수정 모달 열기
        modModalOpen(item){
            this.modData.CUS_ID = item.CUS_ID;
            this.modData.PDC_ID = item.PDC_ID;
            this.modData.PDC_UNIT = item.PDC_UNIT;
            this.modData.PDC_UNIT_PRICE = item.PDC_UNIT_PRICE;
            this.modData.PDC_SALE_PRICE = item.PDC_SALE_PRICE;
            this.modData.CONTENT = item.CONTENT;
            this.modData.CONTENT_CDE = item.CONTENT_CDE;
            this.modData.PDC_STATE_CDE = item.PDC_STATE_CDE;

            this.modModalVisible = true;
        },
        //수정
        mod(){
            let con = confirm("수정하시겠습니까?");
            if(con){
                let data = {
                    modData: this.modData,
                    nbr:this.nbr
                }
    
                axios.post('http://49.50.160.174/store/itemmodify',{
                    data
                })
                .then(res => {
                    alert(res.data.list);
                    this.modModalVisible = false;
                    this.search();
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
            this.sel_step2 == '0' ? data.CLS_ID = this.sel_step1 : data.CLS_ID = this.sel_step2;
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
                    this.addModalVisible = false;
                    this.search();
                    this.cleanAdd();
                })
                .catch( error => {
                    console.log('catch : ' + error);
                });
            
        },
        cleanAdd(){
            this.addData.CLS_ID='',
            this.addData.PDC_NM='',
            this.addData.PDC_STD='',
            this.addData.PDC_UNIT='';
            this.addData.PDC_UNIT_PRICE='';
            this.addData.PDC_SALE_PRICE='';
            this.addData.CONTENT='';
            this.addData.CONTENT_CDE='';
            this.addData.PDC_STATE_CDE='';
        },

        search(){
            this.itemList.splice(0);
            this.keyword='';
            this.getItemList();
        },

        getItemList(){
            let data ={
                nbr:this.nbr,
                step1:this.sel_step1,
                step2:this.sel_step2,
                keyword:this.keyword,
            }

            axios.post('http://49.50.160.174/store/itemlist',{
                data
            }).then(res =>{           
                if(res.data.list.length > 0){
                    this.comItemList = (JSON.parse(JSON.stringify(res.data.list)));
                    let num;
                    if(this.comItemList.length > 10){
                        num = 10;
                    }else{
                        num = this.comItemList.length
                    }
                    //무한스크롤
                    for(let i = 0; i < num; i++) {
                        let data = this.comItemList[i];
                        this.itemList.push(data);
                    }
                    this.maxItem = this.comItemList.length;
                    this.nextItem = num;
                    this.count = 5;
                }            

            }).catch(err =>{
                console.log('catch : '+err);
            });
        },

        //무한스크롤 메서드
        loadMore(done) {
            console.log('load');
            this.show=true;

            if(this.nextItem == this.maxItem){
                    this.show=false;
            }
			if ( this.count + this.nextItem > this.maxItem ){
				this.count = this.maxItem - this.nextItem ;
				setTimeout(()=>{
					this.show=false;
				},1000)
            }

			setTimeout(() => {	
				for (let i = this.nextItem ; i < this.nextItem + this.count ; i++) {
					let data = JSON.parse(JSON.stringify(this.comItemList[i]));  
                    this.itemList.push(data);
				}
				this.nextItem += this.count;
				done();
			}, 600)
		}    

    }
}

</script>

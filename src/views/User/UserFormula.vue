<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button></v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
        </v-ons-toolbar>
        
        <div class="content">
            <ul class="list">
                <li class="list-item" style="margin-top:10px;">
                    <div class="list-item__center">
                        <div>
                            서식종류
                        </div>
                        <div>
                            <select class="long-select select-input select-input--underbar" 
                                v-model="sel_doc"
                            >
                                <option v-for="list in forDocCdeList" :value="list.CDE" :key="list.CDE">
                                    {{list.KOR_NM}}
                                </option>
                            </select>
                        </div>
                    </div>      
                </li>

                <li class="list-item" style="margin-top:10px;">
                    <div class="list-item__center">
                        <div>
                            수량
                        </div>
                        <div>
                            <select class="select-input select-input--underbar"  
                                v-model="for_num"
                                style="width:70%; vertical-align:middle;"
                            >
                                <option v-for="cnt in count" :key="cnt" :value="cnt">
                                    {{cnt}}
                                </option>
                            </select> 
                            <span>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;10</span>
                        </div>
                    </div>      
                </li>

                <li class="list-item" style="margin-top:10px;">
                    <div class="list-item__center">
                        <div>
                            수령방법
                        </div>
                        <div>
                            <select class="long-select select-input select-input--underbar" 
                                v-model="sel_rec"
                                @change="clean()"
                            >
                                <option v-for="list in comforReceiptList" :value="list.CDE" :key="list.CDE">
                                    {{list.KOR_NM}}
                                </option>
                            </select>
                        </div>
                    </div>      
                </li>

                <li class="list-item" style="margin-top:10px;" v-show="sel_rec == '02'">
                    <div class="list-item__center">
                        <div>
                            이메일주소
                        </div>
                        <div>
                            <input type="email" class="text-input text-input--underbar" maxlength="50" ref="email" v-model="email">
                        </div>
                    </div>      
                </li>
                <li class="list-item" style="margin-top:10px;" v-show="sel_rec == '03'">
                    <div class="list-item__center">
                        <div>
                            팩스번호
                        </div>
                        <div>
                            <input type="text" class="text-input text-input--underbar" maxlength="20" ref="fax" v-model="fax">
                        </div>
                    </div>      
                </li>



                <li class="list-item" style="margin-top:10px;">
                    <div class="list-item__center">
                        <div>
                            결제방법
                        </div>
                        <div>
                            <select class="long-select select-input select-input--underbar" 
                                v-model="sel_pay"
                            >
                                <option v-for="list in comforPayTypeList" :value="list.CDE" :key="list.CDE">
                                    {{list.KOR_NM}}
                                </option>
                            </select>
                        </div>
                    </div>      
                </li>

                <li class="list-item" style="margin-top:10px;">
                    <div class="list-item__center">
                        <div>
                            요청사항
                        </div>
                        <div>
                            <input type="text" class="text-input text-input--underbar" maxlength="50" v-model="remark" >
                        </div>
                    </div>      
                </li>

                <li class="list-item list-item--tappable">
                    <div class="list-item__center">
                        <v-ons-button class="order-btn" modifier="large" @click="formulaSend()">서식신청</v-ons-button>
                    </div>       
                </li>
            </ul>

            <v-ons-list>
                <v-ons-list-header v-show="formulaList.length > 0">
                    나의 서식신청 내역
                </v-ons-list-header>
                <v-ons-list-item 
                    expandable
                    v-for="formula in formulaList" :key="formula.FOR_ID"
                >
    
                    <div class="list-item__title">
                        {{formula.FOR_DT}}
                    </div>
                    <div class="list-item__subtitle" style="text-align: left;">
                        {{formula.HOS_NM}}
                    </div>
               
                    <div class="expandable-content">
                        <ul class="list">
                            <li class="list-item list-item">
                                <div class="list-item__center">
                                    <div>신청번호</div>
                                    <div>{{formula.FOR_ID}}</div>
                                </div>      
                            </li>
                            <li class="list-item list-item">
                                <div class="list-item__center">
                                    <div>서식명</div>
                                    <div>{{formula.KOR_NM}}</div>
                                </div>      
                            </li>
                            <li class="list-item list-item">
                                <div class="list-item__center">
                                    <div>수량</div>
                                    <div>{{formula.FOR_NUM}}</div>
                                </div>      
                            </li>
                        </ul>
                        <ul class="list">
                            <li class="list-item list-item">
                                <div class="list-item__center">
                                    <v-ons-button class="del-btn" style="width:100%;" @click="formulaCancel(formula)">서식신청 취소</v-ons-button>
                                </div>      
                            </li>
                        </ul>   
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </div>
    
    </v-ons-page>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'

export default {
    components: { 

    },
    computed:{
        //수령방법 제한
        comforReceiptList: function (){
            return this.forReceiptList.filter( i => i.CDE == '01')
        },
        //결제방법 제한
        comforPayTypeList: function (){
            return this.forPayTypeList.filter( i => i.CDE == '1' )
        }
        
    },
    created(){
        //제품수량 10개까지 선택
        //let cnt = this.item.PDC_UNIT;
        //if(cnt > 10 ){
            let  cnt = 10;
        //}
        for( let i =1; i <= cnt; i++){
            this.count.push(i);
        }

        this.getFormulaList();
    },
    data(){
        return{
            forDocCdeList:[],
            sel_doc:'',

            forReceiptList:[],
            sel_rec:'',

            forPayTypeList:[],
            sel_pay:'',

            formulaList:[],

            count:[],
            for_num:'1',

            email:'',
            fax:'',
            remark:'',

        }
    },
    methods: {
        popMain() {
            this.$store.dispatch('navigator/mainPage');
        },

        clean(){
            this.email='';
            this.fax='';
        },

        getFormulaList(){
            let today = dayjs().format('YYYY-MM-DD');
            let data = {
                hos_id:this.hos.HOS_ID,
                for_dt:today
            }
            axios.post('http://49.50.160.174/user/formulalist',{
                data
            })
            .then(res => {
                this.forDocCdeList = res.data.forDocList;
                this.sel_doc = res.data.forDocList[0].CDE;

                this.forReceiptList = res.data.forRecList;
                this.sel_rec = res.data.forRecList[0].CDE;

                this.forPayTypeList = res.data.forPayList;
                this.sel_pay = res.data.forPayList[0].CDE;

                this.formulaList = res.data.formulaList;

            })
            .catch(err => {
                console.log('catch : '+err);
            });
        },

        formulaSend(){
            let for_dt = dayjs().format('YYYY-MM-DD');
            let data = {
                for_doc_cde: this.sel_doc,
                for_receipt_cde: this.sel_rec,
                for_pay_type: this.sel_pay,
                for_num: this.for_num,
                email: this.email,
                fax: this.fax,
                remrk: this.remark,
                hos_id:this.hos.HOS_ID,
                for_dt:for_dt
            };

            if(data.sel_rec == '02' && data.email == ''){
                this.$ons.notification.toast({
                    message: '이메일주소를 입력하세요.',
                    timeout:1000,
                });
                this.$refs.email.focus();
                return false;
            }

            if(data.sel_rec =='02' && data.email !=''){
                var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                if(!regExp.test(data.email)){
                    this.$ons.notification.toast({
                        message: '이메일주소가 올바르지 않습니다.',
                        timeout:1000,
                    });
                    this.$refs.email.focus();
                    return false;
                }
            }

            if(data.sel_rec == '03' && data.fax == ''){
                this.$ons.notification.toast({
                    message: '팩스번호를 입력하세요.',
                    timeout:1000,
                });
                this.$refs.fax.focus();
                return false;
            }

            axios.post('http://49.50.160.174/user/formulasend',{
                data
            })
            .then(res => {
                if(res.data.status =='000'){
                    this.$ons.notification.alert("서식신청 성공!");
                    this.getFormulaList();
                }else{
                    this.$ons.notification.alert("서식신청 실패!");
                }    
            })
            .catch(err => {
                console.log('catch : '+err);
            });
        },

        formulaCancel(formula){
            let data = {
                for_id:formula.FOR_ID
            }
            axios.post('http://49.50.160.174/user/formulacancel',{
                data
            })
            .then(res => {
                if(res.data.status =='000'){
                    this.$ons.notification.alert("신청 취소!");
                    this.getFormulaList();
                }else{
                    this.$ons.notification.alert("취소 실패!");
                }    
                this.search();
            })
            .catch(err => {
                console.log('catch : '+err);
            });
        }
    }
}
</script>
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
                                v-model="pdc_cnt"
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
                                <option v-for="list in forReceiptList" :value="list.CDE" :key="list.CDE">
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
                                <option v-for="list in forPayTypeList" :value="list.CDE" :key="list.CDE">
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
        </div>
    
    </v-ons-page>
</template>

<script>
import axios from 'axios'

export default {
    components: { 

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

        axios.get('http://49.50.160.174/user/formulalist',{
            
        })
        .then(res => {
            this.forDocCdeList = res.data.forDocList;
            this.sel_doc = res.data.forDocList[0].CDE;

            this.forReceiptList = res.data.forRecList;
            this.sel_rec = res.data.forRecList[0].CDE;

            this.forPayTypeList = res.data.forPayList;
            this.sel_pay = res.data.forPayList[0].CDE;

        })
        .catch(err => {
            console.log('catch : '+err);
        });


    },
    data(){
        return{
            forDocCdeList:[],
            sel_doc:'',

            forReceiptList:[],
            sel_rec:'',

            forPayTypeList:[],
            sel_pay:'',

            count:[],
            pdc_cnt:'1',

            email:'',
            fax:'',
            remark:'',

        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        },

        formulaSend(){
            let data = {
                sel_doc: this.sel_doc,
                sel_rec: this.sel_rec,
                sel_pay: this.sel_pay,
                pdc_cnt: this.pdc_cnt,
                email: this.email,
                fax: this.fax,
                remark: this.remark
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
                console.log(res.data);
            })
            .catch(err => {
                console.log('catch : '+err);
            });
        },
        clean(){
            this.email='';
            this.fax='';
        }
    }
}
</script>
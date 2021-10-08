<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center">{{title}}</div>
        </v-ons-toolbar>

       <div class="content">
           <v-ons-card>
               <ul class="list">
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>진료과목</div>
                            <div>{{cli.TREAT_SUB}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>대표의사</div>
                            <div>{{cli.DIRECTOR_NM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>학력</div>
                            <div>{{cli.DIRECTOR_HIS}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>전공</div>
                            <div>{{cli.DIRECTOR_SPEC}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>대표자명</div>
                            <div>{{cli.HOS_REG_NM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>사업자번호</div>
                            <div>{{cli.HOS_REG_NBR}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>전화</div>
                            <div>{{cli.TEL_NBR}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>팩스</div>
                            <div>{{cli.FAX_NBR}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>평일진료</div>
                            <div>{{cli.WEEKDAY_STR}} ~ {{cli.WEEKDAY_END}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>주말진료</div>
                            <div>{{cli.WEEKEND_STR}} ~ {{cli.WEEKEND_END}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>점심시간</div>
                            <div>{{cli.LUNCH_STR}} ~ {{cli.LUNCH_END}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>주소</div>
                            <div style="width:70%;">{{cli.ADDR_MST}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>우편번호</div>
                            <div>{{cli.ADDR_POST}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>은행명</div>
                            <div>{{cli.BANK_NM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>계좌번호</div>
                            <div>{{cli.BANK_ACCT_NUM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>지역</div>
                            <div>{{cli.LOC_NM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>kind_cde</div>
                            <div>{{cli.KIND_NM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>파일경로</div>
                            <div style="width:70%;">{{cli.HOS_ORI_NM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>파일명</div>
                            <div>{{cli.HOS_SAVE_NM}}</div>
                        </div>      
                    </li>      
                </ul>
                
                <br>
                <v-ons-button modifier="large" style="width:100%;" @click="pop()">닫기</v-ons-button>

            </v-ons-card>
       </div>
       
    </v-ons-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
    components: { 
        
    },
    created(){
        let data = {
            nbr : this.nbr
        }
        this.$store.dispatch('hospitalStore/hosInfo', data);
    },
    computed:{
        ...mapState({
            hospitalInfo: state => state.hospitalStore.hospitalInfo,
        })
    },
    data(){
        return{

        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        }
    }
}
</script>

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
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>병원명</div>
                            <div>{{hospitalInfo.HOS_NM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>진료과목</div>
                            <div>{{hospitalInfo.TREAT_SUB}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>대표의사</div>
                            <div>{{hospitalInfo.DIRECTOR_NM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>학력</div>
                            <div>{{hospitalInfo.DIRECTOR_HIS}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>전공</div>
                            <div>{{hospitalInfo.DIRECTOR_SPEC}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>대표자명</div>
                            <div>{{hospitalInfo.HOS_REG_NM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>사업자번호</div>
                            <div>{{hospitalInfo.HOS_REG_NBR}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>전화</div>
                            <div>{{hospitalInfo.TEL_NBR}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>팩스</div>
                            <div>{{hospitalInfo.FAX_NBR}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>평일진료</div>
                            <div>{{hospitalInfo.WEEKDAY_STR}} ~ {{hospitalInfo.WEEKDAY_END}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>주말진료</div>
                            <div>{{hospitalInfo.WEEKEND_STR}} ~ {{hospitalInfo.WEEKEND_END}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>점심시간</div>
                            <div>{{hospitalInfo.LUNCH_STR}} ~ {{hospitalInfo.LUNCH_END}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>주소</div>
                            <div>{{hospitalInfo.ADDR_MST}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>우편번호</div>
                            <div>{{hospitalInfo.ADDR_POST}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>은행명</div>
                            <div>{{hospitalInfo.BANK_NM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>계좌번호</div>
                            <div>{{hospitalInfo.BANK_ACCT_NUM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>지역코드</div>
                            <div>{{hospitalInfo.LOC_CDE}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>kind_cde</div>
                            <div>{{hospitalInfo.KIND_CDE}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>파일경로</div>
                            <div>{{hospitalInfo.HOS_ORI_NM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center" style="display: flex;justify-content: space-between;">
                            <div>파일명</div>
                            <div>{{hospitalInfo.HOS_SAVE_NM}}</div>
                        </div>      
                    </li>              
                </ul>
                
                <v-ons-button modifier="large" @click="pop()">닫기</v-ons-button>
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

<style scoped>
.list{font-size:18px;}
</style>
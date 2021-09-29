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
                <v-ons-row>
                    <v-ons-col>병원명</v-ons-col>
                    <v-ons-col>{{hospitalInfo.HOS_NM}}</v-ons-col>
                </v-ons-row>
                    <v-ons-row>
                    <v-ons-col>진료과목</v-ons-col>
                    <v-ons-col>{{hospitalInfo.TREAT_SUB}}</v-ons-col>
                </v-ons-row>
                    <v-ons-row>
                    <v-ons-col>대표의사</v-ons-col>
                    <v-ons-col>{{hospitalInfo.DIRECTOR_NM}}</v-ons-col>
                </v-ons-row>
                    <v-ons-row>
                    <v-ons-col>대표의사 학력</v-ons-col>
                    <v-ons-col>{{hospitalInfo.DIRECTOR_HIS}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>대표의사 전공</v-ons-col>
                    <v-ons-col>{{hospitalInfo.DIRECTOR_SPEC}}</v-ons-col>
                </v-ons-row>
                    <v-ons-row>
                    <v-ons-col>대표자명</v-ons-col>
                    <v-ons-col>{{hospitalInfo.HOS_REG_NM}}</v-ons-col>
                </v-ons-row>
                    <v-ons-row>
                    <v-ons-col>사업자번호</v-ons-col>
                    <v-ons-col>{{hospitalInfo.HOS_REG_NM}}</v-ons-col>
                </v-ons-row>
                    <v-ons-row>
                    <v-ons-col>전화</v-ons-col>
                    <v-ons-col>{{hospitalInfo.TEL_NBR}}</v-ons-col>
                </v-ons-row>
                    <v-ons-row>
                    <v-ons-col>팩스</v-ons-col>
                    <v-ons-col>{{hospitalInfo.FAX_NBR}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>평일 진료</v-ons-col>
                    <v-ons-col>{{hospitalInfo.WEEKDAY_STR}} ~ {{hospitalInfo.WEEKDAY_END}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>주말 진료</v-ons-col>
                    <v-ons-col>{{hospitalInfo.WEEKEND_STR}} ~ {{hospitalInfo.WEEKEND_END}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>점심 시간</v-ons-col>
                    <v-ons-col>{{hospitalInfo.LUNCH_STR}} ~ {{hospitalInfo.LUNCH_END}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>휴무코드</v-ons-col>
                    <v-ons-col>{{hospitalInfo.HOLIDAY_CDE}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>휴무여부</v-ons-col>
                    <v-ons-col>{{hospitalInfo.HOLIDAY_YN}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>휴무기간</v-ons-col>
                    <v-ons-col>{{hospitalInfo.HOLYDAY_STR}} ~ {{hospitalInfo.HOLYDAY_END}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>주소</v-ons-col>
                    <v-ons-col>{{hospitalInfo.ADDR_MST}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>우편번호</v-ons-col>
                    <v-ons-col>{{hospitalInfo.ADDR_POST}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>은행명</v-ons-col>
                    <v-ons-col>{{hospitalInfo.BANK_NM}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>계좌번호</v-ons-col>
                    <v-ons-col>{{hospitalInfo.BANK_ACCT_NUM}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>지역코드</v-ons-col>
                    <v-ons-col>{{hospitalInfo.LOC_CDE}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>KIND_CDE</v-ons-col>
                    <v-ons-col>{{hospitalInfo.KIND_CDE}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>파일경로</v-ons-col>
                    <v-ons-col>{{hospitalInfo.HOS_ORI_NM}}</v-ons-col>
                </v-ons-row>
                <v-ons-row>
                    <v-ons-col>파일명</v-ons-col>
                    <v-ons-col>{{hospitalInfo.HOS_SAVE_NM}}</v-ons-col>
                </v-ons-row>
                <v-ons-button @click="pop()">Pop Page</v-ons-button>
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

</style>
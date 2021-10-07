<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button>{{ back }}</v-ons-back-button>
        </div>
        <div class="center"><b>{{ title }}</b></div>
        </v-ons-toolbar>
        <v-ons-list>
            
            <v-ons-list-item expandable
                v-for="cli in clientList" :key="cli.HOS_iD"
                style="padding-left:2%;"
            >
                {{cli.HOS_NM}}
                <div class="expandable-content">
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
                        <!-- <li class="list-item list-item--tappable">
                            <div class="list-item__center">
                                <div>kind_cde</div>
                                <div>{{cli.KIND_NM}}</div>
                            </div>      
                        </li> -->
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
                </div>
            </v-ons-list-item>
        </v-ons-list>
      
    </v-ons-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
    created(){
        this.$store.dispatch('companyStore/clientList',this.nbr);
    },

    components: { 

    },
    computed:{
        ...mapState({
            clientList : state => state.companyStore.clientList
        })
    },
    data(){
        return{
            
        }
    },
    methods: {
            
    }
}
</script>

<style scoped>
.list{
    font-size:18px;
}
.list-item__center{
    padding-left: 2%;
    display: flex;
    justify-content: space-between;
}
.list-item__center > div:nth-child(2){
    text-align: right;
}
</style>
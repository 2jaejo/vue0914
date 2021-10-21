<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button></v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
        </v-ons-toolbar>
        
        <div class="content">
            <v-ons-card>
               <ul class="list">
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>진료과목</div>
                            <div>{{hospitalInfo.TRE_NM}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>대표의사</div>
                            <div>{{hospitalInfo.DIRECTOR_NM}}</div>
                        </div>      
                    </li>
                  
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>전공</div>
                            <div>{{hospitalInfo.DIRECTOR_SPEC}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>대표자명</div>
                            <div>{{hospitalInfo.HOS_REG_NM}}</div>
                        </div>      
                    </li>
               
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>전화</div>
                            <div>{{hospitalInfo.TEL_NBR}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>평일진료</div>
                            <div>{{hospitalInfo.WEEKDAY_STR}} ~ {{hospitalInfo.WEEKDAY_END}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>주말진료</div>
                            <div>{{hospitalInfo.WEEKEND_STR}} ~ {{hospitalInfo.WEEKEND_END}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>점심시간</div>
                            <div>{{hospitalInfo.LUNCH_STR}} ~ {{hospitalInfo.LUNCH_END}}</div>
                        </div>      
                    </li>
                    <li class="list-item list-item--tappable">
                        <div class="list-item__center">
                            <div>주소</div>
                            <div>{{hos.ADDR_MST}}</div>
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
import axios from 'axios'

export default {
    components: { 

    },
    created(){
        let data ={
            hos_id: this.hos.HOS_ID,
        }
        axios.post('http://49.50.160.174/user/hosinfo',{
            data
        })
        .then(res => {
            this.hospitalInfo = res.data.list[0];
        })
        .catch(err => {
            console.log('catch : '+err);
        });
    },
    data(){
        return{
            hospitalInfo:{},
        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        },
        push(loc) {

            var pageToPush = {
                extends: loc,
                data(){
                    return{
                        title: loc.LOC_NM,
                        loc:loc
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        },
    }
}
</script>
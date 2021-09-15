<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button>{{ back }}</v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
        </v-ons-toolbar>
        <v-ons-list>
            
            <v-ons-list-item expandable
                v-for="cli in clientList" :key="cli.HOS_iD"
            >
                {{cli.HOS_NM}}
                <div class="expandable-content">
                    진료과목 : {{cli.DIRECTOR_SPEC}} <br>
                    {{cli.DIRECTOR_NM}} 원장 <br>
                    학력/경력 : {{cli.DIRECTOR_HIS}} <br>
                    전화 : {{cli.TEL_NBR}} <br>
                    진료시간 평일 : {{cli.WEEKDAY_STR}} ~ {{cli.WEEKDAY_END}}<br>
                    진료시간 토요일 : {{cli.WEEKEND_STR}} ~ {{cli.WEEKEND_END}} <br>
                    일요일 휴무 <br>
                </div>
            </v-ons-list-item>
        </v-ons-list>
      
    </v-ons-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
    created(){
        this.$store.dispatch('companyStore/itemManagement',this.nbr);
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
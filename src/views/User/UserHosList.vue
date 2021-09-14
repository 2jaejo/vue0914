<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center">{{ title }}</div>
        </v-ons-toolbar>

        <div>
            <v-ons-list v-for="hos in $store.state.hospital.hosList" :key="hos.hos_id"
                style="margin:1px;"
            >
                <v-ons-list-item modifier="chevron" tappable
                    v-if="cde == hos.loc_cde" @click="push(hos)"
                >
                    {{hos.hos_nm}}
                </v-ons-list-item>
            </v-ons-list>
        </div>

    </v-ons-page>
</template>

<script>
import UserHosInfo from './UserHosInfo.vue'

export default {
    components: { 

    },
    methods: {
       push(e){
           var pageToPush = {
                extends: UserHosInfo,
                data(){
                    return{
                        back: '병원목록', 
                        title: e.hos_nm,
                        hos_id: e.hos_id, 
                        hos_nm: e.hos_nm, 
                        director_nm: e.director_nm,
                        director_his: e.director_his, 
                        director_spec: e.director_spec, 
                        loc_cde: e.loc_cde, 
                        kind_cde: e.kind_cde,
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('clearAxios');
            this.$store.dispatch('navigator/pushPage',pageToPush);

       }
    }
}
</script>
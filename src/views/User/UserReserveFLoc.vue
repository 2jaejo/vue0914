<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ back }}</v-ons-back-button>
            </div>
            <div class="center">{{ title }}</div>
        </v-ons-toolbar>

        <div>
            <v-ons-list v-for="loc in $store.state.user.location" :key="loc.loc_nm"
                style="margin:1px;"
            >
                <v-ons-list-item modifier="chevron" tappable
                    v-if="loc.loc_cde.includes('F') && loc.loc_cde != 'F'" @click="push(loc.loc_cde, loc.loc_nm)"
                >
                    {{loc.loc_nm}}
                </v-ons-list-item>
            </v-ons-list>
        </div>

    </v-ons-page>
</template>

<script>
import UserHosList from './UserHosList.vue'

export default {
    components: { 

    },
    methods: {
        push(cde,name) {
            console.log(cde);
            console.log(name);

            var pageToPush = {
                extends: UserHosList,
                data(){
                    return{
                        cde: cde,
                        title: '병원목록',
                        back: name 
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        }
    }
}
</script>
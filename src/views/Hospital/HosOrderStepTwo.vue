<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button>{{ back }}</v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
        </v-ons-toolbar>

        <div class="content">
            
            <v-ons-list>
                <v-ons-list-item 
                    modifier="chevron" 
                    tappable
                    v-for="step in itemStepTwo" :key="step.CLS_ID"
                    @click="getItemList(step)"
                >
                    {{step.CLS_NM}}
                </v-ons-list-item>
            </v-ons-list>
        
        </div>
    </v-ons-page>
</template>

<script>
import HosOrderStepThree from '../Hospital/HosOrderStepThree.vue'
export default {
    components: { 

    },
    created(){

    },
    data(){
        return{
           
        }
    },
    methods: {
        pop() {
            //this.$emit('pop');
            this.$store.dispatch('navigator/popPage');
        },

        getItemList(step){
            var pageToPush = {
                extends: HosOrderStepThree,
                data(){
                    return{
                        title:step.CLS_NM,
                        back:'',
                        cls_id:step.CLS_ID 
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        }
    }
}
</script>
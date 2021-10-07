<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button>{{ back }}</v-ons-back-button>
        </div>
        <div class="center"><b>{{ title }}</b></div>
        </v-ons-toolbar>

        <div class="content">
            <v-ons-list>
                <v-ons-list-item
                    modifier="chevron" 
                    tappable
                    v-for="item in itemList" :key="item.PDC_ID"
                    @click="getItemInfo(item)"
                >
                    {{item.PDC_NM}}
                </v-ons-list-item>
            </v-ons-list>
        </div>
    </v-ons-page>
</template>

<script>
import axios from 'axios'
import HosOrderStepFour from '../Hospital/HosOrderStepFour.vue'
export default {
    components: { 

    },
    created(){
       
        let data = {
            cls_id : this.cls_id
        }
        axios.post('http://49.50.160.174/doctor/hositemlist',{
            data
        }).then(res =>{            
            this.itemList = res.data.list;
        }).catch(err =>{
            console.log('catch : '+err);
        });
        
    },
    data(){
        return{
            itemList:[],
            modalVisible:false,
            itemInfo:[],
        }
    },
    methods: {
        pop() {
            //this.$emit('pop');
            this.$store.dispatch('navigator/popPage');
        },

        getItemInfo(item){
            var pageToPush = {
                extends: HosOrderStepFour,
                data(){
                    return{
                        back:'',
                        item,
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);     
        },
        
    }
}
</script>
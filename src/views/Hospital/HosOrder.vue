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
                    v-for="step in itemStepOne" :key="step.CLS_ID"
                    @click="stepTwo(step)"
                >
                    {{step.CLS_NM}}
                </v-ons-list-item>
            </v-ons-list>
        </div>
    </v-ons-page>
</template>

<script>
import axios from 'axios'
import HosOrderStepTwo from '../Hospital/HosOrderStepTwo.vue'
import HosOrderStepThree from '../Hospital/HosOrderStepThree.vue'

export default {
    components: { 
        
    },
    created(){
        axios.get('http://49.50.160.174/doctor/hositemstepone',{
                
            }).then(res =>{            
                this.itemStepOne = res.data.list;
            }).catch(err =>{
                console.log('catch : '+err);
            });
    },
    data(){
        return{
            itemStepOne:[],
        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        },

        stepTwo(step){
            let data = {
                cls_parent : step.CLS_PARENT
            }
            axios.post('http://49.50.160.174/doctor/hositemsteptwo',{
                data
            }).then(res =>{
                let leng = res.data.list.length; 
          
                const getMenu = (leng)=>{
                    if(leng >0){
                        return HosOrderStepTwo;
                    }else{
                        return HosOrderStepThree;     
                    }
                }

                var pageToPush = {
                extends: getMenu(leng),
                    data(){
                        return{
                            title:step.CLS_NM,
                            back:'',
                            itemStepTwo:res.data.list,
                            cls_id:step.CLS_ID 
                        }
                    }
                }
                //this.$emit('push',pageToPush);
                this.$store.dispatch('navigator/pushPage',pageToPush);
            }).catch(err =>{
                console.log('catch : '+err);
            });
        
        }

    }
}
</script>
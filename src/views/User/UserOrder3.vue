<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button></v-ons-back-button>
            </div>
            <div class="center">
                {{ title }}
            </div>
        </v-ons-toolbar>

        <div class="content">
            <ul class="list">
                <li class="list-item list-item--chevron"
                    v-for="list in orderlist" :key="list.CLS_ID"
                    @click="push(list)"
                >   
                    <div class="list-item__center list-item--chevron__center">
                        {{list.CLS_NM}}
                    </div>
                </li>         
            </ul>
        </div>

    </v-ons-page>
</template>

<script>
import axios from 'axios'
import UserOrder4 from './UserOrder4.vue'

export default {

    components: { 

    },
    created(){
        axios.get('http://49.50.160.174/user/itemlist',{

            })
            .then(res => {
                this.orderlist = res.data.list;
            })
            .catch(err => {
                console.log('catch : '+err);
            });
    },
    data(){
        return{
            orderlist:{},

        }
    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        },
        push(list) {

            var pageToPush = {
                extends: UserOrder4,
                data(){
                    return{
                        title: list.CLS_NM,  
                        list:list            
                    }
                }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        },
    }
}
</script>
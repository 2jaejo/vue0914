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
                   
                >   
                    <div class="list-item__center list-item--chevron__center">
                       상품주문창
                    </div>
                </li>         
            </ul>
        </div>

    </v-ons-page>
</template>

<script>

export default {

    components: { 

    },
    created(){
        
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
       
    }
}
</script>
<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button>{{ back }}</v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
        </v-ons-toolbar>
        <v-ons-row>
            <v-ons-col class="col">
                <v-ons-select style="width:100%;"
                    v-model="stateSel"
                >
                    <option v-for="state in stateSelect" :value="state.value" :key="state.text">
                        {{state.text}}
                    </option>
                </v-ons-select>
            </v-ons-col>
            <v-ons-col class="col">
                <v-ons-select style="width:100%;"
                    v-model="searchSel"
                >
                    <option v-for="search in searchSelect" :value="search.value" :key="search.text">
                        {{search.text}}
                    </option>
                </v-ons-select>
            </v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col class="col">
            <span>
                <v-ons-input placeholder="Search something" style="width:80%;" v-model="query"></v-ons-input>
            </span>    
                 <v-ons-button style="width:20%;">검색</v-ons-button>
            </v-ons-col>
           
        </v-ons-row>

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
            stateSelect:[
                { text: '전체', value: 'state_all' },
                { text: '주문', value: 'state_order' },
                { text: '출고', value: 'state_out' },
                { text: '입고', value: 'state_in' },
            ],
            stateSel:'state_all',
            searchSelect: [
                { text: '상품명', value: 'order_item' },
                { text: '주문번호', value: 'order_num' },
                { text: '주문일자', value: 'order_dt' },
            ],
            searchSel: 'order_item',

        }
    },
    methods: {
            
    }
}
</script>
<style scoped>
.col{
    border: 1px solid black;
}

</style>
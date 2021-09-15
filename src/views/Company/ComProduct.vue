<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button>{{ back }}</v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
        </v-ons-toolbar>

       
 
    </v-ons-page>
</template>

<script>

export default {
    created(){
        this.$store.dispatch('companyStore/itemManagement',this.nbr);
    },
    components: { 

    },
    data(){
        return{
         
        }
    },
    methods: {
        
    }
}
</script>
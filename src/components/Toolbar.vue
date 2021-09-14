<template>
    <v-ons-toolbar>

        <div class="center">{{ title }}</div>
    </v-ons-toolbar>
</template>

<script>
export default {
    props: ['title'],
    methods:{
        action(){
            this.$store.dispatch('splitter/isOpen');
        }
    }
}
</script>
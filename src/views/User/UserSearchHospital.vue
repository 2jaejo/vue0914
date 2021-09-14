<template>
    <v-ons-page>
        <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button>{{ back }}</v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
        </v-ons-toolbar>

        <p style="text-align: center">
        Welcome {{title}}
        </p>
        <v-ons-button @click="pop()">Pop Page</v-ons-button>
    </v-ons-page>
</template>

<script>

export default {
    components: { 

    },
    methods: {
        pop() {
            this.$store.dispatch('navigator/popPage');
        }
    }
}
</script>
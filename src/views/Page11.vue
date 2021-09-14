<template>
    <v-ons-page>
      <v-ons-toolbar>
        <div class="left">
          <v-ons-back-button>{{back}}</v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
      </v-ons-toolbar>

        <p style="text-align: center">
        Welcome page11.
        </p>
        <v-ons-button @click="push()">Push Page111</v-ons-button>
        <v-ons-button @click="pop()">Pop Page</v-ons-button>
    </v-ons-page>
</template>

<script>

import Page111 from '../views/Page111.vue'

export default {
    components: { 
     
    },
    methods: {
      push() {
        var pageToPush = {
          extends: Page111,
              data(){
                return{
                  title:'page111',
                      back:'Page11' 
                  }
              }
            }
            //this.$emit('push',pageToPush);
            this.$store.dispatch('navigator/pushPage',pageToPush);
        },
        pop() {
          //this.$emit('pop');
          this.$store.dispatch('navigator/popPage');
        }
    }
}
</script>
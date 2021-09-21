<template>
    <v-container fluid class="my-5 mx-5">
        <v-layout row> 
            <v-flex xs12 class="my-5"></v-flex>
            <v-flex xs12 class="my-5"></v-flex>
            <v-flex xs12 class="my-5"></v-flex>
            <v-flex xs5 class="my-5">
            </v-flex>
            <v-flex xs2 class="my-5 mx-3">
                <div v-if=" getUserError.type == 'verifySuccess' " class="success-message">
                    Account verified successfully. Go to <a href="/home">home</a> page to login.
                </div>
                <div v-if="getUserError && getUserError.type == 'verifyError' ">
                    <span v-for="(key,index) in getUserError" v-bind:key="index" > <li class="error-message"  v-if="index != 'type'">{{ key }}</li> </span>
                </div>
                <v-btn color="success" small @click="verify" :loading="loadingForm">
                    Verify Account
                </v-btn>    
            </v-flex>
            <v-flex xs12 class="mx-auto my-5"></v-flex>
            <v-flex xs12 class="mx-auto my-5"></v-flex>
            <v-flex xs12 class="mx-auto my-5"></v-flex>
            <v-flex xs12 class="mx-auto my-5"></v-flex>
            <v-flex xs12 class="mx-auto my-5"></v-flex>
            <v-flex xs12 class="mx-auto my-1"></v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    computed: {
      ...mapGetters(["getUserError"]),
    },
    methods: {
        ...mapActions(["verifyAccount",]),
        verify() {
            this.verifyAccount({
                signature: this.access_token,
            });
            this.loadingForm = true;
        },  
        
    },
    data: () => ({
      valid: true,
      dialog: false,
      loadingForm: false,
      access_token: "",
      show1: false,
    }),
    created() {
        this.access_token = this.$route.query.access_token;
        this.unwatch = this.$store.watch(
            (state, getters) => getters.getUserError,
            (newValue, oldVal) => {
              oldVal;
              this.loadingForm = false;
            }
        );
    }
}
</script>



<style scoped>
    .dialog-btn{
      font-size: 11px !important;
      font-weight: 400 !important;
      color: red !important;
    }
    .error-message{
        font-size: 11px !important;
        font-weight: 400 !important;
        color: red !important;
    }
    .success-message{
        font-size: 11px !important;
        font-weight: 400 !important;
        color: green !important;
    }
</style>
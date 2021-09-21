<template>
    <v-container fluid class="my-5 mx-5">
        <v-layout row> 
            <v-flex xs12 class="mx-auto my-5"></v-flex>
            <v-flex xs12 class="mx-auto my-5"></v-flex>
            <v-flex xs4 class="mx-auto my-5">
                <v-form ref="editAccount"  v-model="valid" lazy-validation>
                    <v-layout row>
                        <v-flex xs12 sm12 class="ml-5 pa-5">
                            <span v-if=" getUserError.type == 'passwordForgotSuccess' " class="success-message">
                                Password successfully reseted. Go to <a href="/home">home</a> page to login.
                            </span>
                            <span v-if="getUserError && getUserError.type == 'resetPasswordError' ">
                                <span v-for="(key,index) in getUserError" v-bind:key="index" > <li class="error-message"  v-if="index != 'type'">{{ key }}</li> </span>
                            </span>
                        </v-flex>
                    </v-layout>
                    <v-list-item >
                        <v-list-item-content>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field dense v-model="password" class="account-card-data" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="New Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field dense block v-model="verify" class="account-card-data" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-btn color="success ml-2" small @click="validate" :loading="loadingForm">
                                        Change Password
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-list-item-content>
                    </v-list-item>
                </v-form>
            </v-flex>
            <v-flex xs12 class="mx-auto my-5"></v-flex>
            <v-flex xs12 class="mx-auto my-5"></v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    computed: {
      ...mapGetters(["getUserError"]),
      passwordMatch() {
        return () => this.password === this.verify || "Password must match";
      }
    },
    methods: {
        ...mapActions(["forgottenPassword",]),
        validate() {
            if (this.$refs.editAccount.validate()) {
                this.forgottenPassword({
                    signature: this.access_token,
                    password: this.password,
                });
                this.loadingForm = true;
            }
        },  
        
    },
    data: () => ({
      valid: true,
      dialog: false,
      loadingForm: false,
      password: "",
      verify: "",
      access_token: "",
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => (v && v.length >= 8) || "Min 8 characters"
      }
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
<template>
    <div class="text-center">
        <v-dialog
            v-model="dialog"
            class="font-weight-medium"
            persistent
            max-width="570"
            max-height="200"
        >
            <template v-slot:activator="{ on, attrs }" class="ma-0">
                <v-btn color="red" v-bind="attrs" class="dialog-btn" v-on="on" text @click="dialog = true" small>
                    Forgotten Password
                </v-btn>
            </template>
            <v-card class="mx-auto" tile   :loading="loadingForm" >
                <v-card-title> 
                    Reset Password <v-icon small color="red" >mdi-security</v-icon>   
                </v-card-title>
          
                <v-container>
                    <v-list>
                        <v-form ref="editAccount"  v-model="valid" lazy-validation>
                            <v-layout row>
                                <v-flex xs12 sm12 class="ml-5 pa-5">
                                    <span v-if=" getUserError.type == 'passwordResetSuccess' " class="success-message">
                                        Password resent link sent! please check both your inbox and promotion folder.
                                    </span>
                                    <span v-if="getUserError && getUserError.type == 'resetPassword' ">
                                        <span v-for="(key,index) in getUserError" v-bind:key="index" > <li class="error-message"  v-if="index != 'type'">{{ key }}</li> </span>
                                    </span>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-list-item >
                                        <v-list-item-content>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-text-field dense v-model="email" class="account-card-data" :rules="emailRules" label="E-mail" required></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </v-list-item>

                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-list>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false" small>
                        Close
                    </v-btn>
                    <v-btn color="success ml-2" text small @click="validate">
                        Send Reset Link
                    </v-btn>
                </v-card-actions>
            </v-card>
                                 
        </v-dialog>
  </div>
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
        ...mapActions(["sendResetPassword",]),
        validate() {
            if (this.$refs.editAccount.validate()) {
                this.sendResetPassword({
                    email: this.email,
                });
                this.loadingForm = true;
            }
        },  
        
    },
    data: () => ({
      valid: true,
      dialog: false,
      loadingForm: false,
      email: "",
      show1: false,
      emailRules: [
        v => !!v || "Required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
    }),
    created() {
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
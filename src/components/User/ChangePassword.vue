<template>
    <div class="text-center">
        <v-dialog
            v-model="dialog"
            class="font-weight-medium"
            persistent
            max-width="600"
            max-height="200"
        >
            <template v-slot:activator="{ on, attrs }" class="ma-0">
                <v-btn color="red" v-bind="attrs" class="dialog-btn" v-on="on" text @click="dialog = true" x-small>
                    Password <v-icon x-small> mdi-security</v-icon>
                </v-btn>
            </template>
            <v-card class="mx-auto" tile   :loading="loadingForm" >
                <v-card-title> 
                    Change Password <v-icon small color="red" >mdi-security</v-icon>   
                </v-card-title>
          
                <v-container class="mt-5">
                        <v-list>
                            <v-form ref="editAccount"  v-model="valid" lazy-validation>
                                <v-layout row>
                                    <v-flex xs12 sm12 class="ml-5 pa-5">
                                        <span v-if=" getUserError.type == 'passwordSuccess' " class="success-message">
                                            Password changed successfully.
                                        </span>
                                        <span v-if="getUserError && getUserError.type == 'changePassword' ">
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
                                                        <v-text-field dense v-model="old_password" class="account-card-data" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Old Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-text-field dense v-model="password" class="account-card-data" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="New Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-text-field dense block v-model="verify" class="account-card-data" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
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
                        Update
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
        ...mapActions(["changePassword",]),
        validate() {
            if (this.$refs.editAccount.validate()) {
                this.changePassword({
                    password: this.password,
                    old_password: this.old_password
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
      old_password: "",
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => (v && v.length >= 8) || "Min 8 characters"
      }
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
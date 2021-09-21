<template>
  <div  class="pa-5">
    <v-dialog v-model="dialog" max-width="600px" min-width="360px">
      <template v-slot:activator="{ on }">
        <v-layout row>
          <v-flex xs6>     
            <v-btn
              x-small
              text
              v-on="on"
              @click="tab=0"
              tile
              class="py-5"
            >
              <v-icon small class="mr-2">mdi-login-variant</v-icon>  <span v-if="!$vuetify.breakpoint.xsOnly">Login</span> 
            </v-btn>
          </v-flex>
          <v-flex xs6>
            <v-btn
              class="mr-2 py-5"
              x-small
              text
              @click="tab=1"
              v-on="on"
            >
              <v-icon small class="mr-2">mdi-account-plus-outline</v-icon> <span v-if="!$vuetify.breakpoint.xsOnly">Register</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </template>
            <div>
                <v-tabs v-model="tab" show-arrows icons-and-text dense grow>
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab v-for=" (icons, i) in tabs" :key="i">
                        <v-icon large>{{ i.icon }}</v-icon>
                        <div class="caption py-1">{{ icons.name }}</div>
                    </v-tab>
                    <v-tab-item>
                        <v-card class="px-4 mt-1" loader-height="2"   :loading="loadingForm" > 
                            <span class="ml-5 my-3" v-if="getUserError && getUserError.type == 'login' ">
                                <span v-for="(key,index) in getUserError" v-bind:key="index" > <li class="error-message"  v-if="index != 'type'">{{ key }}</li> </span>
                            </span>
                            <v-card-text>
                                <v-form ref="loginForm"  v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field dense class="account-card-data" v-model="loginEmail"  label="E-mail" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field dense class="account-card-data" v-model="loginPassword" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"  :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="d-flex" cols="3" >
                                          <v-btn small block text color="success" @click="validate">Login</v-btn>
                                        </v-col>
                                        <v-col class="d-flex" cols="4"  v-if="!$vuetify.breakpoint.xsOnly"  > </v-col>
                                        <v-col class="d-flex">
                                          <ResetPassword/>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card class="px-4 mt-1" loader-height="2"   :loading="loadingForm" >
                            <span class="ml-5 my-3" v-if="getUserError && getUserError.type == 'register' ">
                                <span v-for="(key,index) in getUserError" v-bind:key="index" > <li class="error-message"  v-if="index != 'type'">{{ key }}</li> </span>
                            </span>
                            <v-card-text>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field dense v-model="firstName" class="account-card-data" :rules="[rules.required]" label="First Name" maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field dense v-model="lastName" class="account-card-data" :rules="[rules.required]" label="Last Name" maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field dense v-model="email" class="account-card-data" :rules="emailRules" label="E-mail" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field dense v-model="password" class="account-card-data" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field dense block v-model="verify" class="account-card-data" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                    </v-row>
                                    <v-row>
                                        <v-col class="d-flex ml-auto" cols="12">
                                          <v-spacer></v-spacer>  <v-btn small block text color="success" @click="validate">Register</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ResetPassword from "@/components/Public/ResetPassword";

export default {
    components: {
      ResetPassword,
    },
    computed: {
      ...mapGetters(["getUserError", "getUser"]),
      passwordMatch() {
        return () => this.password === this.verify || "Password must match";
      }
    },
    methods: {
      ...mapActions(["registerUser","loginUser"]),
      validate() {
        if (this.tab == 0 && this.$refs.loginForm.validate()) {
            this.loginUser({
              password: this.loginPassword,
              email: this.loginEmail,
            })
        }else if(this.tab == 1 && this.$refs.registerForm.validate()){
            let user = {
              name: this.firstName + "/%/" + this.lastName,
              password: this.password,
              email: this.email,
            }
            console.log(user)
            this.registerUser(user);
        }
        this.loadingForm = 'success';
      },
      reset() {
        this.$refs.form.reset();
      },
      resetValidation() {
        this.$refs.form.resetValidation();
      }
    },
    data: () => ({
      dialog: false,
      loadingForm: false,
      tab: 0,
      tabs: [
          {name:"Login", icon:"mdi-account"},
          {name:"Register", icon:"mdi-account-outline"}
      ],
      valid: true,
      
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      verify: "",
      loginPassword: "",
      loginEmail: "",
      loginEmailRules: [
        v => !!v || "Required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      emailRules: [
        v => !!v || "Required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],

      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => (v && v.length >= 8) || "Min 8 characters"
      }
    }),
    created() {
      this.unwatch = this.$store.watch(
        (state, getters) => getters.getUser,
        (newValue, oldVal) => {
          oldVal;
          if (newValue) {
            this.dialog =false;
          }
          this.loadingForm = false;
        }
      );
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
.account-card-data{
  font-size: 11px !important;
  font-weight: 400 !important;
}
.error-message{
  font-size: 11px !important;
  font-weight: 400 !important;
  color: red !important;
}
</style>
<template>
    <div class="text-center">
        <v-dialog
            v-model="getAddCompanyDialogState"
            class="font-weight-medium"
            :max-width="length"
            max-height="800"
            persistent
        >   
            <v-card class="tender-dialog-card" rounded=false :loading="loadingForm">
                <v-card-title class="headline grey lighten-2 tender-card-title" >
                    Add Company  
                    <span v-if="userServicePage" class="ml-auto text--secondary"> My Service <v-icon>mdi-account-circle</v-icon></span> 
                    <v-icon color="gray" :class="(!userServicePage)? 'ml-auto': ''" class="ml-5" @click="add_dialog();"> mdi-close</v-icon>
                </v-card-title>

                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container fluid>
                        <v-layout row class="ml-5 pa-5">
                            <span v-if="getCompanyError && getCompanyError.type == 'companyAddError' ">
                                <span v-for="(key,index) in getCompanyError" v-bind:key="index" > <li class="error-message"  v-if="index != 'type'">{{ key }}</li> </span>
                            </span>
                        </v-layout>
                  </v-container>
                  <v-container>
                      <div class="text-xs-center">
                        <v-row class="ma-3">
                          <v-col cols="12"> Company Information</v-col>
                          <v-col cols="12" sm="12">
                              <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Title" required
                              ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="ma-3">
                          <v-col cols="12" >Company Address</v-col>
                          <v-col cols="12" sm="6">
                              <v-text-field v-model="physicalAddress" :counter="10" :rules="physicalAddressRules" label="Address" required
                              ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                              <v-text-field v-model="phoneNumber" :counter="10" :rules="phoneNumberRules" label="Phone number" required
                              ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                              <v-text-field v-model="website" :counter="10" :rules="websiteRules" label="Website" required
                              ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                              <v-text-field v-model="email" :counter="10" :rules="emailRules" label="Email" required
                              ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                              <v-text-field v-model="pobox" :counter="10" :rules="poboxRules" label="P.O obox" required
                              ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                              <v-text-field v-model="fax" :counter="10" :rules="faxRules" label="Fax" required
                              ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                              <v-combobox
                                  clearable
                                  v-model="country"
                                  :rules="countryRules" 
                                  dense
                                  required
                                  label = "Country"
                                  :items= "getCompanyCountries"
                                  >
                              </v-combobox>
                          </v-col>
                          <v-col cols="12" sm="6">
                              <v-combobox
                                  v-model="category"
                                  :rules="categoryRules" 
                                  chips
                                  clearable
                                  deletable-chips
                                  multiple
                                  small-chips
                                  dense
                                  label = "Category"
                                  :items= "getCompanyCategories"
                                  >
                              </v-combobox>
                          </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="ma-3">
                          <v-col cols="12"> Description</v-col>
                          <v-col cols="12">
                              <vue-editor v-model="description" :rules="descriptionRules" ></vue-editor> 
                          </v-col>
                        </v-row>
                      </div>
                  </v-container>
                </v-form>

                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="orange" text @click="reset()" class="tender-card-data">
                        Clear
                    </v-btn> 
                    <v-btn color="success" text @click="validate()" class="tender-card-data" :loading="loadingForm">
                        Save
                    </v-btn>
                    <v-btn color="primary" text @click="add_dialog()" class="tender-card-data">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
           
        </v-dialog>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapGetters, mapActions } from "vuex";

export default {
    components: {
        VueEditor
    },
    computed: {
      ...mapGetters(["getAddCompanyDialogState", "getCompanyCategories", "getCompanyCountries", "getCompanyError"]),
      userServicePage() {
        return this.$route.name == 'my-service';
      }
    },
    data: () => ({
      dialog: false,
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 2) || 'Name must be greater than 2 characters',
      ],
      category:'',
      categoryRules: [
        v => !!v || 'Category is required',
      ],
      physicalAddress:'',
      physicalAddressRules: [
        v => !!v || 'Physical address is required',
      ],
      phoneNumber:'',
      phoneNumberRules: [
        v => !!v || 'Phone number is required',
      ],
      website:'',
      websiteRules: [
      ],
      email:'',
      emailRules: [
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      description:"<h5>Company description will come here...</h5>",
      descriptionRules: [
        v => !!v || 'Description is required',
      ],
      country:'',
      countryRules: [
        v => !!v || 'Country is required',
      ],
      pobox:'',
      poboxRules: [
       
      ],
      fax:'',
      faxRules: [
        
      ],
      items: [ 'XADA', 'CAD','FGA','PLOA'],
      deleteDialog:false,
      editDialog:false,
      loadingForm: false,
      length : '1000px',
    }),

    methods: {
      ...mapActions(["setAddCompanyDialogState", "addCompany" , "setSnakBarMessage"]),
      validate () {
        if( this.$refs.form.validate()) {
            this.loadingForm = true;

            let company = {
              name: this.name,
              category: this.category,
              physical_address: this.physicalAddress,
              phone_number: this.phoneNumber,
              website: this.website,
              email: this.email,
              description: this.description,
              country: this.country,
              pobox: this.pobox,
              fax: this.fax,
            }

            if(this.userServicePage){
                company.myService = true;
            }

            this.addCompany(company);
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      add_dialog(){
          this.setAddCompanyDialogState(false);
      }
    },
    created(){
        this.unwatch = this.$store.watch(
            (state, getters) => getters.getCompanyError,
            (newValue, oldVal) => {
              oldVal;
              this.loadingForm = false;

              if(newValue.type == 'companyAddSuccess'){
                this.add_dialog();
                let message = (this.$route.name != 'my-service')?  'Award added successfully.' : 'Your Award will be under review. we will respond as soon as possible! :)';
                this.setSnakBarMessage({message: message, random: new Date().getTime() })
              }

            }
        );
    },

    dialog: false,
    props: ['tenderData'],
}
</script>


<style scoped>

.tender-card-chip{
  font-size: 9px !important;
  font-weight: 400 !important;
  line-height: 6px !important;
}
.tender-card-title{
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 24px !important;
}
.tender-card-sub-title{
  font-size: 10px !important;

}
.tender-card-data{
  font-size: 11px !important;
  font-weight: 400 !important;
}
.tender-icons{
  font-size: 17px !important;
  font-weight: 400 !important;

}
.tender-dialog-card{
    border-radius:0px !important;
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
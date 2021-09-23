<template>
    <div class="text-center">
        <v-dialog
            v-model="dialog"
            class="font-weight-medium"
            :max-width="length"
            max-height="800"
            persistent
        >
            <template v-slot:activator="{ on, attrs }" class="ma-0">
                <v-card-actions class="ma-0">
                    <CompanyFileDialog :companyData=companyData />
                    <v-icon small class="mr-3" color="teal accent-4" @click="openFileDialog();">mdi-attachment</v-icon>
                    <v-icon small color="teal accent-4" @click="editDialog = true; close_fab(); length = '1000px'" v-bind="attrs" v-on="on" >mdi-grease-pencil</v-icon>
                    <v-icon small class="ml-3 px-0" color="red" @click="deleteDialog = true; length = '450px'" v-bind="attrs" v-on="on" >mdi-delete</v-icon>
                </v-card-actions>
            </template>

            <v-card v-if="deleteDialog" >
              <v-card-title class="headline text-center">
                Do you want to delete this company?
              </v-card-title>
              <v-card-text class="">Once you have agreed to delete this tender it will be permanently removed from the system.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="deleteDialog = false; dialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="red darken-1"
                  text
                  @click="delete_company()"
                  :loading="loadingForm"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
            
            <v-card class="tender-dialog-card" rounded=false  v-if="editDialog" :loading="loadingForm">
                <v-card-title class="headline grey lighten-2 tender-card-title" >
                    Edit company informations
                    <span v-if="userServicePage" class="ml-auto text--secondary"> My Service <v-icon>mdi-account-circle</v-icon></span> 
                    <v-icon color="gray" class="ml-5" :class="(!userServicePage)? 'ml-auto': ''" @click="editDialog = false; dialog= false; open_fab();"> mdi-close</v-icon>
                </v-card-title>

                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container fluid>
                        <v-layout row class="ml-5 pa-5">
                            <span v-if="getCompanyError && getCompanyError.type == 'companyEditError' ">
                                <span v-for="(key,index) in getCompanyError" v-bind:key="index" > <li class="error-message"  v-if="index != 'type'">{{ key }}</li> </span>
                            </span>
                        </v-layout>
                  </v-container>
                  <v-container>
                      <div class="text-xs-center">
                        <v-row class="ma-3">
                          <v-col cols="12"> Company Information</v-col>
                          <v-col cols="12" sm="1">
                            <v-btn color="white--text green lighten-3 mx-3 mt-2"  fab x-small class="text-none"  depressed :loading="isSelecting"  @click="onButtonClick">
                              <v-img class="profile-img" width="80"   :src="companyData.avatar ? companyData.avatar : '/logo/tendermap.png' " ></v-img>
                            </v-btn>
                            <input ref="uploader" class="d-none" type="file" accept="image/*" @change="changePicture" >     
                          </v-col>
                          <v-col cols="12" sm="11">
                              <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name of the company" required
                              ></v-text-field>
                          </v-col>
                        </v-row>
                        <!-- <v-file-input
                            @change="changePicture" class="inline-block" label="Change Company Logo" chips color = "white" small-chips truncate-length="15" accept="image/*"
                        >
                        </v-file-input> -->
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
                    <v-btn :color=" getCompanyError.type == 'companyEditError' ? 'red': 'success' " text @click="validate()" class="tender-card-data" :loading="loadingForm">
                        Save
                        <v-icon small color="red" v-if="getCompanyError.type == 'companyEditError' ">mdi-exclamation</v-icon>
                    </v-btn>
                    <v-btn color="primary" text @click="editDialog = false; dialog= false; open_fab()" class="tender-card-data">
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
import CompanyFileDialog from '@/components/Company/CompanyFileDialog';

export default {
    components: {
        VueEditor,
        CompanyFileDialog
    },
    computed: {
      ...mapGetters(["getAddCompanyDialogState", "getCompanyCategories", "getCompanyCountries", "getCompanyError"]),
      userServicePage() {
        return this.$route.name == 'my-service';
      },
      adminServicePage() {
          return this.$route.name == 'admin-service';
      },
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
      items: [ 'XADA', 'CAD', 'FGA','PLOA'],
      deleteDialog:false,
      editDialog:false,
      loadingForm: false,
      length : '1000px',
      //------ company logo --- //
      show1: false,
      defaultButtonText: 'Change company logo',
      selectedFile: null,
      isSelecting: false,
    }),

    methods: {
      ...mapActions(["setFabVisibility", "updateCompany", "deleteCompany", "setCompanyFileDialogState", "updateCompanyLogo", "setSnakBarMessage"]),
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

            let companyParams = {
              param: true,
              params: {
                company_id : this.companyData._id
              }
            }

            let companyObject = { companyParams: companyParams, companyData : company }

            if(this.userServicePage){
                companyObject.myService = true;
            }

            if(this.adminServicePage){
                companyObject.adminService = true;
            }

            this.updateCompany( companyObject );
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      close_fab() {
        this.setFabVisibility(false);
      },
      open_fab() {
        this.setFabVisibility(true);
      },
      delete_company(){
        this.loadingForm = true;
        let companyParams = {
          param: true,
          params: {
            company_id : this.companyData._id
          }
        }

        if(this.userServicePage){
            companyParams.myService = true;
        }

        if(this.adminServicePage){
            companyParams.adminService = true;
        }

        this.deleteCompany(companyParams)
      },
      openFileDialog(){
        this.setCompanyFileDialogState(true);
      },
      changePicture(file){
        file = file.target.files[0]

        this.loadingForm = true;
        let formData = new FormData();
        formData.append("file",  file);

        let companyParams = {
          param: true,
          params: {
            company_id : this.companyData._id
          }
        }

        let companyData = { params : companyParams, logo: formData } 
        if(this.userServicePage){
          companyData.myService = true;
        }

        if(this.adminServicePage){
            companyData.adminService = true;
        }

        this.updateCompanyLogo( companyData );
      },
      onButtonClick() {
          this.isSelecting = true
          window.addEventListener('focus', () => {
              this.isSelecting = false
          }, { once: true })

          this.$refs.uploader.click()
      },
    },

    created(){
        this.name = this.companyData.name 
        this.category = this.companyData.category
        this.physicalAddress = this.companyData.physical_address
        this.phoneNumber = this.companyData.phone_number
        this.website = this.companyData.website
        this.email = this.companyData.email
        this.description = this.companyData.description
        this.country = this.companyData.country
        this.pobox = this.companyData.pobox
        this.fax =this.companyData.fax

        this.unwatch = this.$store.watch(
            (state, getters) => getters.getCompanyError,
            (newValue, oldVal) => {
              oldVal;
              this.loadingForm = false;

              if(newValue.type == 'companyDeleteSuccess'){
                this.deleteDialog = false;
                this.dialog = false;
                this.$emit('close_dialog' , false);
                let message = (this.$route.name != 'my-service')?  'Company deleted successfully.' : 'Your delete operation will be under review. we will respond as soon as possible! :)';
                this.setSnakBarMessage({message: message, random: new Date().getTime() })
              }

              if(newValue.type == 'companyEditSuccess'){
                this.open_fab()
                let message = (this.$route.name != 'my-service')?  'Company changes saved successfully.' : 'Your company will be under review. we will respond as soon as possible! :)';
                this.setSnakBarMessage({message: message, random: new Date().getTime() })
              }

              if(newValue.logo){
                this.companyData.avatar = newValue.logo;
              }
            }
        );
    },

    dialog: false,
    props: ['companyData'],
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
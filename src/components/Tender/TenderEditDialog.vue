<template>
    <div class="text-center">
        <v-dialog
            v-model="dialog"
            class="font-weight-medium"
            :max-width="length"
            max-height="800"
            persistent
        >
            <template v-slot:activator="{ on, attrs }" class="mx-0 px-0">
                <v-card-actions class="mx-0 px-0">
                    <TenderFileDialog :tenderData=tenderData />
                    <v-icon small class="mr-3" color="teal accent-4" @click="openFileDialog();">mdi-attachment</v-icon>
                    <v-icon small class="mr-3" color="teal accent-4" @click=" editDialog = true; close_fab(); length = '1000px'" v-bind="attrs" v-on="on" >mdi-grease-pencil</v-icon>
                    <v-icon small class="mx-0 px-0" color="red" @click="deleteDialog = true; length = '420px'" v-bind="attrs" v-on="on" >mdi-delete</v-icon>
                </v-card-actions>
            </template>

            <v-card v-if="deleteDialog">
              <v-card-title class="headline text-center">
                Do you want to delete this tender?
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
                  @click="delete_tender()"
                  :loading="loadingForm"
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-card class="tender-dialog-card" rounded=false  v-if="editDialog">
                <v-card-title class="headline grey lighten-2 tender-card-title" >
                    Edit Tender informations
                    <span v-if="userServicePage" class="ml-auto text--secondary"> My Service <v-icon>mdi-account-circle</v-icon></span> 
                    <v-icon color="gray" class="ml-5" :class="(!userServicePage)? 'ml-auto': ''" @click="editDialog = false; dialog= false; open_fab();"> mdi-close</v-icon>

                </v-card-title>

                <v-form ref="form" v-model="valid" lazy-validation >
                    <v-container fluid>
                        <v-layout row class="ml-5 pa-5">
                            <span v-if="getTenderError && getTenderError.type == 'tenderEditError' ">
                                <span v-for="(key,index) in getTenderError" v-bind:key="index" > <li class="error-message"  v-if="index != 'type'">{{ key }}</li> </span>
                            </span>
                        </v-layout>
                    </v-container>
                    <v-container>
                        <div class="text-xs-center">
                        <v-row class="ma-3">
                            <v-col cols="12"> Tender Identification</v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="title" :counter="10" :rules="titleRules" label="Title" required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="tenderId" :counter="10" :rules="tenderIdRules" label="Tender Id" required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="ma-3">
                            <v-col cols="12" >Tender Information</v-col>
                            <v-col cols="12" sm="6">
                                <v-combobox
                                    v-model="type"
                                    :rules="typeRules" 
                                    clearable
                                    dense
                                    required
                                    label = "Type"
                                    :items= "getTenderProcurments"
                                    >
                                </v-combobox>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-combobox
                                    clearable
                                    v-model="sector"
                                    :rules="sectorRules" 
                                    dense
                                    required
                                    label = "Sector"
                                    :items= "getTenderSector"
                                    >
                                </v-combobox>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-combobox
                                    clearable
                                    v-model="country"
                                    :rules="countryRules" 
                                    dense
                                    required
                                    label = "Country"
                                    :items= "getTenderCountries"
                                    >
                                </v-combobox>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-combobox
                                    clearable
                                    v-model="modOfProcurment"
                                    :rules="modOfProcurmentRules" 
                                    dense
                                    required
                                    label = "Mode of Procurment"
                                    :items= "getTenderType"
                                    >
                                </v-combobox>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="ma-3">
                            <v-col cols="12">Relationships</v-col>
                            <v-col cols="12" sm="6">
                                <v-autocomplete
                                    clearable
                                    v-model="company"
                                    :rules="companyRules" 
                                    dense
                                    required
                                    label = "Company"
                                    :items= "getCompanyNames"
                                    >
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-autocomplete
                                    clearable
                                    v-model="award"
                                    :rules="awardRules" 
                                    dense
                                    required
                                    label = "Award(Optional)"
                                    :items= "getAwardTitle"
                                    >
                                </v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="ma-3">
                            <v-col cols="12" sm="5" >Tender Date</v-col>
                            <v-col cols="12" sm="6" >
                                <DatePicker label = "Bid Opening date"  @date="updateOpeningDateEnd" :date_value="bidOpeningDate" /> 
                                <DatePicker  label = "Bid Closing date"  @date="updateClosingDateEnd" :date_value="bidClosingDate" /> 
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="ma-3">
                            <v-col cols="12"> Details</v-col>
                            <v-col cols="12">
                                <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="details" :rules="detailsRules"></vue-editor> 
                            </v-col>
                        </v-row>
                        </div>
                    </v-container>
                </v-form>

                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :color=" getTenderError.type == 'tenderEditError'? 'red': 'success' " text @click="validate()" class="tender-card-data" :loading="loadingForm">
                        Save
                        <v-icon small color="red" v-if="getTenderError.type == 'tenderEditError'">mdi-exclamation</v-icon>
                    </v-btn>
                    <v-btn color="primary" text @click="editDialog = false; dialog= false; open_fab();" class="tender-card-data">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
           
        </v-dialog>
  </div>
</template>

<script>
import DatePicker from '@/components/common/DatePicker'
import { VueEditor } from "vue2-editor";
import { mapGetters, mapActions } from "vuex";
import TenderFileDialog from '@/components/Tender/TenderFileDialog';

export default {
    components: {
        DatePicker,
        VueEditor,
        TenderFileDialog
    },
    computed: {
      ...mapGetters(["getTenderEditDialogState", "getTenderError", "getTenderSector", "getTenderType", "getTenderCountries", "getCompanyNames", "getAwardTitle", "getAwardTitlesDict", "getTenderProcurments"]),
      userServicePage() {
        return this.$route.name == 'my-service';
      },
      adminServicePage() {
          return this.$route.name == 'admin-service';
      },
    },
    data: () => ({
      deleteDialog:false,
      editDialog:false,
      dialog: false,
      valid: true,
      title: '',
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length >= 3) || 'Title must be greater than 3 characters',
      ],
      tenderId: '',
      tenderIdRules: [
        v => (v && v.length >= 3) || 'Tender Id must be greater than 3 characters',
      ],
      modOfProcurment:'',
      modOfProcurmentRules: [
        v => !!v || 'Mode Of Procurment is required',
      ],
      bidOpeningDate:'',
      bidOpeningDateRules: [
        v => !!v || 'Bid opening date is required',
      ],
      bidClosingDate:'',
      bidClosingDateRules: [
        v => !!v || 'Bid closing date is required',
      ],
      country:'',
      countryRules: [
        v => !!v || 'Country is required',
      ],
      award:'',
      awardRules: [
      ],
      sector:'',
      sectorRules: [
        v => !!v || 'Sector is required',
      ],
      type:'',
      typeRules: [
        v => !!v || 'Type is required',
      ],
      details:'<h5>Tender Details will come here...</h5>',
      detailsRules: [
        v => !!v || 'Detail is required',
      ],
      company: '',
      companyRules: [
        v => !!v || 'Company is required',
      ],
      items: [ 'XADA', 'CAD', 'FGA','PLOA'],
      length : '1000px',
      loadingForm: false,
    }),

    methods: {
      ...mapActions(["setFabVisibility","setTenderEditDialogState", "setTenderErrorData", "updateTender", "deleteTender", "setTenderFileDialogState", "addTenderFile", "setSnakBarMessage"]),
      validate () {
        if( this.$refs.form.validate()) {
            this.loadingForm = true;

            let tender = {
              title: this.title,
              issued_date: this.bidOpeningDate,
              closing_date: this.bidClosingDate,
              sector: this.sector,
              tender_id: this.tenderId,
              procurement_type: this.type,
              mode_of_procurement: this.modOfProcurment,
              details: this.details,
              country: this.country,
              company: this.company,
            }

            if (this.award)
                tender.award_id = this.getAwardTitlesDict[this.award] 

            let tenderParams = {
              param: true,
              params: {
                tender_id : this.tenderData._id
              }
            }

            let tender_closing_date = new String(tender.closing_date)
            let tender_issued_date = new String(tender.issued_date)

            if(tender_closing_date.includes('T'))
                tender.closing_date = tender_closing_date.split('T')[0]

            if(tender_issued_date.includes('T'))
                tender.issued_date = tender_issued_date.split('T')[0]

            let tenderObject = { tenderParams : tenderParams, tenderData : tender  }

            if(this.userServicePage){
                tenderObject.myService = true;
            }

            if(this.adminServicePage){
                tenderObject.adminService = true;
            }

            this.updateTender(tenderObject);
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
      updateOpeningDateEnd(date){
        this.bidOpeningDate = date || this.bidOpeningDate;
      },
      updateClosingDateEnd(date){
        this.bidClosingDate = date || this.bidClosingDate;
      },
      delete_tender(){
        this.loadingForm = true;
        let tenderParams = {
          param: true,
          params: {
            tender_id : this.tenderData._id
          }
        }

        if(this.userServicePage){
            tenderParams.myService = true;
        }

        if(this.adminServicePage){
            tenderParams.adminService = true;
        }

        this.deleteTender(tenderParams)
      },
      openFileDialog(){
        this.setTenderFileDialogState(true);
      },
      handleImageAdded(file, Editor, cursorLocation, resetUploader){
           this.loadingForm = true;
              console.log('here')

           let formData = new FormData();
           formData.append("file",  file);
           
           let tenderParams = {
             param: true,
             params: {
               tender_id : this.tenderData._id
             }
           }
           
          this.addTenderFile( { file: formData, params: tenderParams } ).then( (fileData) => {
              Editor.insertEmbed(cursorLocation, "image", fileData.link);
              resetUploader();
          });

      },
    },
    created(){
      this.title = this.tenderData.title
      this.bidOpeningDate = this.tenderData.issued_date //new Date(this.tenderData.issued_date).toLocaleDateString()
      this.bidClosingDate = this.tenderData.closing_date //new Date(this.tenderData.closing_date).toLocaleDateString()
      this.sector = this.tenderData.sector
      this.tenderId = this.tenderData.tender_id
      this.type = this.tenderData.procurement_type
      this.modOfProcurment = this.tenderData.mode_of_procurement
      this.details = this.tenderData.details
      this.country = this.tenderData.country
      this.company = this.tenderData.company_id.name

      if (this.tenderData.award_id)
        this.award = this.tenderData.award_id.title 

      this.unwatch = this.$store.watch(
        (state, getters) => getters.getTenderError,
        (newValue, oldVal) => {
          oldVal;
          this.loadingForm = false;

          if(newValue.type == 'tenderDeleteSuccess'){
            this.deleteDialog = false;
            this.dialog = false;
            this.open_fab();
            this.$emit('close_dialog' , false);
            let message = (this.$route.name != 'my-service')?  'Tender deleted successfully.' : 'Your delete operation will be under review. we will respond as soon as possible! :)';
            this.setSnakBarMessage({message: message, random: new Date().getTime() })
          }

          if(newValue.type == 'tenderEditSuccess'){
            this.open_fab()
            let message = (this.$route.name != 'my-service')?  'Tender changes saved successfully.' : 'Your Tender will be under review. we will respond as soon as possible! :)';
            this.setSnakBarMessage({message: message, random: new Date().getTime() })
          }

        }
      );
    },

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
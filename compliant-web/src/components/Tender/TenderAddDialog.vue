<template>
    <div class="text-center">
        <v-dialog
            v-model="getTenderEditDialogState"
            class="font-weight-medium"
            :max-width="length"
            max-height="800"
            persistent
        >
            <v-card class="tender-dialog-card" rounded=false  :loading="loadingForm" >
                <v-card-title class="headline grey lighten-2 tender-card-title" >
                    Add Tender  
                    <span v-if="userServicePage" class="ml-auto text--secondary"> My Service <v-icon>mdi-account-circle</v-icon></span> 
                    <v-icon color="gray" :class="(!userServicePage)? 'ml-auto': ''" class="ml-5" @click="tenderAddState();"> mdi-close</v-icon>
                </v-card-title>

                <v-form ref="form" v-model="valid" lazy-validation >
                    <v-container fluid>
                        <v-layout row class="ml-5 pa-5">
                            <span v-if="getTenderError && getTenderError.type == 'tenderAddError' ">
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
                                <DatePicker label = "Bid Opening date"  @date="updateOpeningDateEnd" /> 
                                <DatePicker  label = "Bid Closing date"  @date="updateClosingDateEnd"  /> 
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="ma-3">
                            <v-col cols="12"> Details</v-col>
                            <v-col cols="12">
                                <vue-editor v-model="details" :rules="detailsRules"></vue-editor> 
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
                    <v-btn color="primary" text @click="tenderAddState()" class="tender-card-data">
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

export default {
    computed: {
      ...mapGetters(["getTenderEditDialogState", "getTenderError", "getTenderSector", "getTenderType", "getTenderCountries", "getCompanyNames", "getAwardTitle", "getAwardTitlesDict", "getTenderProcurments"]),
      userServicePage() {
        return this.$route.name == 'my-service';
      }
    },
    components: {
        DatePicker,
        VueEditor
    },
    data: () => ({
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
      ...mapActions(["setTenderEditDialogState", "setTenderErrorData", "addTender", "setSnakBarMessage"]),
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

            if(this.userServicePage){
                tender.myService = true;
            }

            if (this.award)
                tender.award_id = this.getAwardTitlesDict[this.award] 

            this.addTender(tender);
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      tenderAddState(){
        this.setTenderEditDialogState( false )
      },
      updateOpeningDateEnd(date){
        this.bidOpeningDate = date;
      },
      updateClosingDateEnd(date){
        this.bidClosingDate = date;
      }
    },
    created(){
        this.unwatch = this.$store.watch(
            (state, getters) => getters.getTenderError,
            (newValue, oldVal) => {
              oldVal;
              this.loadingForm = false;

              if(newValue.type == 'tenderAddSuccess'){
                this.tenderAddState();
                let message = (this.$route.name != 'my-service')?  'Tender added successfully.' : 'Your Tender will be under review. we will respond as soon as possible! :)';
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
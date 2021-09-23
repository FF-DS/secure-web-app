<template>
    <div class="text-center">
        <v-dialog
            v-model="getAwardAddDialogState"
            class="font-weight-medium"
            :max-width="length"
            max-height="800"
            persistent
        >
            <v-card class="tender-dialog-card" rounded=false :loading="loadingForm">
                <v-card-title class="headline grey lighten-2 tender-card-title" >
                    Add Award  
                    <span v-if="userServicePage" class="ml-auto text--secondary"> My Service <v-icon>mdi-account-circle</v-icon></span> 
                    <v-icon color="gray" :class="(!userServicePage)? 'ml-auto': ''" class="ml-5" @click="add_dialog_state();"> mdi-close</v-icon>
                </v-card-title>

                <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-container fluid>
                        <v-layout row class="ml-5 pa-5">
                            <span v-if="getAwardError && getAwardError.type == 'awardAddError' ">
                                <span v-for="(key,index) in getAwardError" v-bind:key="index" > <li class="error-message"  v-if="index != 'type'">{{ key }}</li> </span>
                            </span>
                        </v-layout>
                    </v-container>
                    <div class="text-xs-center">
                        <v-row class="ma-3">
                        <v-col cols="12"> Award Identification</v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="title" :counter="10" :rules="titleRules" label="Title" required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="tenderIdentification" :counter="10" :rules="tenderIdentificationRules" label="Tender identification" required
                            ></v-text-field>
                        </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="ma-3">
                        <v-col cols="12" >Award Information</v-col>
                        <v-col cols="12" sm="6">
                            <v-autocomplete
                                v-model="tenderId"
                                :rules="tenderIdRules" 
                                clearable
                                dense
                                required
                                label = "Tender"
                                :items= "getTenderTitles"
                                >
                            </v-autocomplete>
                        </v-col>
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
                                v-model="winnerCompanies"
                                :rules="winnerCompaniesRules" 
                                dense
                                chips
                                deletable-chips
                                multiple
                                small-chips
                                label = "Winner Companies"
                                :items= "getCompanyNames"
                                >
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-combobox
                                clearable
                                v-model="country"
                                :rules="countryRules" 
                                dense
                                required
                                label = "Country"
                                :items= "getAwardCountry"
                                >
                            </v-combobox>
                        </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="ma-3">
                        <v-col cols="6"> Details <DatePicker  label = "Award published date"  @date="updateAwardDate" /> </v-col>
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
                    <v-btn :color=" getAwardError.type == 'awardAddError'? 'red': 'success' " text @click="validate()" class="tender-card-data" :loading="loadingForm">
                        Save
                        <v-icon small color="red" v-if="getAwardError.type == 'awardAddError'">mdi-exclamation</v-icon>
                    </v-btn>
                    <v-btn color="primary" text @click="add_dialog_state()" class="tender-card-data">
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
    components: {
        DatePicker,
        VueEditor
    },
    computed: {
      ...mapGetters(["getAwardAddDialogState", "getAwardCountry", "getCompanyNames", "getCompanyDict", "getTenderTitles", "getTenderDict", "getAwardError"]),
      userServicePage() {
        return this.$route.name == 'my-service';
      }
    },
    data: () => ({
      dialog: false,
      valid: true,
      title: '',
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length >= 3) || 'Title must be greater than 3 characters',
      ],
      tenderIdentification: '',
      tenderIdentificationRules: [
        v => ( !v || v.length >= 3) || 'Tender identification  must be greater than 3 characters',
      ],
      awardDate:'',
      awardDateRules: [
        v => !!v || 'Award Date is required',
      ],
      details:'<h5> Award Details will come here...</h5>',
      detailsRules: [
        v => !!v || 'Details is required',
      ],
      country:'',
      countryRules: [
        v => !!v || 'Country is required',
      ],
      tenderId:'',
      tenderIdRules: [
      ],
      company: '',
      companyRules: [
        v => !!v || 'Company is required',
      ],
      winnerCompanies: [],
      winnerCompaniesRules: [
        v => !!v || 'Company is required',
      ],
      items: [ 'XADA', 'CAD', 'FGA','PLOA'],
      deleteDialog:false,
      editDialog:false,
      length : '1000px',
      loadingForm: false,
    }),

    methods: {
      ...mapActions(["setAwardAddDialogState", "awardAdd", "setSnakBarMessage"]),
      validate () {
        if( this.$refs.form.validate()) {
            this.loadingForm = true;
            this.changeCompanyValues();

            let award = {
              tender_identification: this.tenderIdentification,
              award_date: this.awardDate,
              title: this.title,
              details: this.details,
              winner_companies: this.winnerCompanies,
              country: this.country,
              company: this.company,
            }

            if (this.tenderId)
                award.tender_id = this.getTenderDict[this.tenderId] 

            
            if(this.userServicePage){
                award.myService = true;
            }

            this.awardAdd(award);
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      updateAwardDate(date){
        this.awardDate = date;
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      add_dialog_state() {
          this.setAwardAddDialogState(false);
      },
      changeCompanyValues(){ 
            let ids = []
            for (let name in this.winnerCompanies){
                if(this.getCompanyDict[ this.winnerCompanies[name] ])
                    ids.push( this.getCompanyDict[ this.winnerCompanies[name] ] );
            }
            this.winnerCompanies = ids;
      }
    },
    created(){
        this.unwatch = this.$store.watch(
            (state, getters) => getters.getAwardError,
            (newValue, oldVal) => {
              oldVal;
              this.loadingForm = false;

              if(newValue.type == 'awardAddSuccess'){
                this.add_dialog_state();
                let message = (this.$route.name != 'my-service')?  'Award added successfully.' : 'Your Award will be under review. we will respond as soon as possible! :)';
                this.setSnakBarMessage( {message: message, random: new Date().getTime() } )
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
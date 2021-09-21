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
                    <AwardFileDialog :awardData=awardData />
                    <v-icon small class="mr-3" color="teal accent-4" @click="openFileDialog();">mdi-attachment</v-icon>
                    <v-icon small color="teal accent-4" @click="editDialog = true; close_fab();  length = '1000px'" v-bind="attrs" v-on="on" >mdi-grease-pencil</v-icon>
                    <v-icon small class="ml-3 px-0" color="red" @click="deleteDialog = true; length = '450px'" v-bind="attrs" v-on="on" >mdi-delete</v-icon>
                </v-card-actions>
            </template>

            <v-card v-if="deleteDialog">
                <v-card-title class="headline text-center">
                Do you want to delete this Award?
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
                    @click="delete_award()"
                    :loading="loadingForm"
                >
                    Yes
                </v-btn>
                </v-card-actions>
            </v-card>
            
            <v-card class="tender-dialog-card" rounded=false  v-if="editDialog">
                <v-card-title class="headline grey lighten-2 tender-card-title" >
                    Edit Award informations
                    <span v-if="userServicePage" class="ml-auto text--secondary"> My Service <v-icon>mdi-account-circle</v-icon></span> 
                    <v-icon color="gray" class="ml-5" :class="(!userServicePage)? 'ml-auto': ''" @click="editDialog = false; dialog= false; open_fab();"> mdi-close</v-icon>
                </v-card-title>

                <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-container fluid>
                        <v-layout row class="ml-5 pa-5">
                            <span v-if="getAwardError && getAwardError.type == 'awardEditError' ">
                                <span v-for="(key,index) in getAwardError" v-bind:key="index" > <li class="error-message"  v-if="index != 'type'">{{ key }}</li> </span>
                            </span>
                        </v-layout>
                    </v-container>
                    <div class="text-xs-center">
                        <v-row class="ma-3">
                        <v-col cols="12"> Award Identification</v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="title"  :counter="10" :rules="titleRules" label="Title" required
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
                        <v-col cols="6"> Details <DatePicker  label = "Award published date"  @date="updateAwardDate" :date_value="awardDate" /> </v-col>
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
                    <v-btn :color=" getAwardError.type == 'awardEditError'? 'red': 'success' " text @click="validate()" class="tender-card-data" :loading="loadingForm">
                        Save
                        <v-icon small color="red" v-if="getAwardError.type == 'awardEditError'">mdi-exclamation</v-icon>
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
import { mapActions,mapGetters } from "vuex";
import AwardFileDialog from '@/components/Award/AwardFileDialog'

export default {
    components: {
        DatePicker,
        VueEditor,
        AwardFileDialog
    },
    computed: {
      ...mapGetters(["getAwardAddDialogState", "getAwardCountry", "getCompanyNames", "getCompanyDict", "getTenderTitles", "getTenderDict", "getAwardError"]),
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
      ...mapActions(["setFabVisibility", "awardUpdate", "awardDelete", "setAwardFileDialogState", "setSnakBarMessage"]),
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

            let awardParams = {
              param: true,
              params: {
                award_id : this.awardData._id
              }
            }

            let award_date = new String(award.award_date)
            if(award_date.includes('T'))
                award.award_date = award_date.split('T')[0]

            if (this.tenderId)
                award.tender_id = this.getTenderDict[this.tenderId] 

            let awardObject =  { awardParams: awardParams, awardData: award }

            if(this.userServicePage){
                awardObject.myService = true;
            }

            if(this.adminServicePage){
                awardObject.adminService = true;
            }

            this.awardUpdate(awardObject);
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
      updateAwardDate(date){
        this.awardDate = date;
      },
      changeCompanyValues(){ 
            let ids = []
            for (let name in this.winnerCompanies){
                if(this.getCompanyDict[ this.winnerCompanies[name] ])
                    ids.push( this.getCompanyDict[ this.winnerCompanies[name] ] );
            }
            this.winnerCompanies = ids;
      },
      delete_award(){
        this.loadingForm = true;
        let awardParams = {
              param: true,
              params: {
                award_id : this.awardData._id
            }
        }

        if(this.userServicePage){
            awardParams.myService = true;
        }

        if(this.adminServicePage){
            awardParams.adminService = true;
        }

        this.awardDelete(awardParams)

      },
      openFileDialog(){
        this.setAwardFileDialogState(true);
      }
    },

    created(){
      this.tenderIdentification = this.awardData.tender_identification
      this.awardDate = this.awardData.award_date
      this.title = this.awardData.title
      this.details = this.awardData.details
      this.country = this.awardData.country
      this.company = this.awardData.company_id.name
      this.tenderId = this.awardData.tender_id.title

      for(var index in this.awardData.winner_companies){
        this.winnerCompanies.push( this.awardData.winner_companies[index].name )
      }

      this.unwatch = this.$store.watch(
            (state, getters) => getters.getAwardError,
            (newValue, oldVal) => {
              oldVal;
              this.loadingForm = false;

              if(newValue.type == 'awardDeleteSuccess'){
                this.deleteDialog = false;
                this.dialog = false;
                this.$emit('close_dialog' , false);
                let message = (this.$route.name != 'my-service')?  'Award deleted successfully.' : 'Your delete operation will be under review. we will respond as soon as possible! :)';
                this.setSnakBarMessage({message: message, random: new Date().getTime() })
              }

              if(newValue.type == 'awardEditSuccess'){
                this.open_fab()
                let message = (this.$route.name != 'my-service')?  'Award changes saved successfully.' : 'Your Award will be under review. we will respond as soon as possible! :)';
                this.setSnakBarMessage({message: message, random: new Date().getTime() })
              }
            }
      );
    },
    dialog: false,
    props: ['awardData'],
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
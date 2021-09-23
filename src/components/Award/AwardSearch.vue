<template>
    <div>
        <v-card class="" :elevation="4">
            <v-card-title class="font-weight-black vuetify-main-components"> 
                Award Search  
                <span v-if="userServicePage" class="ml-auto text--secondary"> My Service <v-icon>mdi-account-circle</v-icon></span> 
                <v-icon v-if="$vuetify.breakpoint.smAndDown" color="gray" :class="userServicePage? 'ml-3': 'ml-auto'" @click="$emit('close_dialog' , false);"> mdi-close</v-icon>
            </v-card-title>            
        </v-card>

        <v-card class="mt-2 pa-5" :elevation="4">
            <v-row>
                <v-col xs12 id="award-name">
                    <v-combobox
                        clearable
                        hide-selected
                        deletable-chips
                        multiple
                        persistent-hint
                        @input.native="onDataGiven($event.srcElement.value)"
                        small-chips
                        :items= "items"
                        v-model="selected_values"
                        height = 80
                        @change="onChangeSearchParam"
                        >
                    </v-combobox>
                    <v-card-title class="font-weight-black  vuetify-main-components"> Keywords </v-card-title>
                </v-col>
            </v-row>
        </v-card>
        
        <v-card class="mt-2 pa-5" :elevation="4">
            <v-container fluid class="ma-0 pa-0">
                <v-row class="ma-0 pa-0">
                    <v-col id="award-country" cols="12" sm="6" class="ma-0 pa-0 pr-1">
                        <v-autocomplete
                            chips
                            clearable
                            deletable-chips
                            multiple
                            small-chips
                            :items= "getAwardCountry"
                            v-model="selected_countries"
                            >
                        </v-autocomplete>
                        <v-card-title class="font-weight-black  vuetify-main-components"> Country </v-card-title>
                    </v-col>
                    <v-col id="award-country" cols="12" sm="6" class="ma-0 pa-0">
                        <v-autocomplete
                            chips
                            clearable
                            deletable-chips
                            multiple
                            small-chips
                            :items= "getCompanyNames"
                            v-model="selected_companies"
                            >
                        </v-autocomplete>
                        <v-card-title class="font-weight-black  vuetify-main-components"> Companies </v-card-title>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>  

        <v-card class="mt-2 pa-5" :elevation="4"  id="award-published">
            <v-container fluid class="ma-0 pa-0">
                <v-row class="ma-0 pa-0 mt-2"  >
                    <v-col  cols="12" sm="12"  class="ma-0 pa-0 pr-1" >
                        <DatePicker label = "Published date"  @date="updateStartingDate" :date_value="award_date_start" /> 
                    </v-col>

                    <!-- <v-col cols="12" sm="6"  class="ma-0 pa-0 ml-auto">
                        <DatePicker label = "Published ending date"  @date="updateClosingDate"  :date_value="award_date_end"  /> 
                    </v-col> -->
                </v-row>
            </v-container>
            <v-row>
                <v-col cols="6">
                    <v-card-title class="font-weight-black  d-block  vuetify-main-components"> Published Date </v-card-title>
                </v-col>
                <v-col cols="3">
                    <v-btn
                        color="red"
                        text
                        dense
                        @click="clearResult"
                        large rounded  
                        class="float-right"
                        style="font-size:10px !important"     
                    >
                        Clear
                    </v-btn>
                </v-col>
                <v-col cols="3">
                    <v-btn
                        color="accent"
                        elevation="5"
                        large outlined raised rounded text
                        class="float-right"  
                        @click="searchResult"
                        style="font-size:10px !important"        
                    >
                        Search
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>

    </div>
</template>


<script>
import DatePicker from '@/components/common/DatePicker'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        DatePicker,
    },
    data() {
        return {
            items: ["Ethiopia", "PPA", "Construction"],
            selected_countries: [],
            award_date_start: '',
            selected_values:[],
            selected_companies: [],
            award_date_end: '',
            forgottenValues: ''
        };
    },
    computed: {
        ...mapGetters(["getAwardCountry", "getDatePickerResetState", "getCompanyNames", "getCompanyDict", "getCurrentSearchParams"]),
        userServicePage() {
            return this.$route.name == 'my-service';
        }
    },
    methods: {
        ...mapActions(["setAwardData", "searchAwards", "setAwardSearchParams", "setDatePickerResetState", "setCurrentSearchParams"]),
        updateStartingDate(date){
            this.award_date_start = date
        },
        updateClosingDate(date){
            this.award_date_end = date
        },
        changeCompanyValues(){ 
            let ids = []
            for (let name in this.selected_companies){
                if(this.getCompanyDict[ this.selected_companies[name] ])
                    ids.push( this.getCompanyDict[ this.selected_companies[name] ] );
            }
            return ids
        },
        collectAndSaveParams(){
            let params = {
                selected_companies : [...this.selected_companies],
                selected_values: [ ...this.selected_values, ...(this.forgottenValues.split(" ").map( val => val.trim()).filter(val => val.length > 0) )],
                country: [...this.selected_countries],
                award_date_start: this.award_date_start,
                award_date_end: this.award_date_end,
            }
            
            let awardParams = this.getCurrentSearchParams
            awardParams.award = params
            this.setCurrentSearchParams(awardParams)
        },
        searchResult(){
            this.collectAndSaveParams();
            let ids = this.changeCompanyValues();

            let searchQueries = {
                    query: true,
                    queries:{
                        size: 12,
                        name : [ ...this.selected_values, ...(this.forgottenValues.split(" ").map( val => val.trim()).filter(val => val.length > 0) )].join(','),
                        company_id : ids.join(','),
                        country: this.selected_countries.join(','), 
                        award_date_start: this.award_date_start,
                        award_date_end: this.award_date_end,
                    }
                }

            if(this.userServicePage){
                searchQueries.myService = true;
            }

            this.setAwardData( [] )
            this.setAwardSearchParams( searchQueries )
            this.searchAwards( searchQueries )
        },
        clearResult(){

            let searchQueries = {
                query: true,
                queries:{
                    size: 12,
                }
            }
            
            this.selected_values = []
            this.selected_countries = [] 
            this.selected_companies = [] 
            this.award_date_start = null;
            this.award_date_end = null;
            this.setDatePickerResetState( !this.getDatePickerResetState )
            
            if(this.userServicePage){
                searchQueries.myService = true;
            }

            this.setAwardData( [] )

            let awardParams = this.getCurrentSearchParams
            awardParams.award = null;
            this.setCurrentSearchParams(awardParams)

            this.setAwardSearchParams( searchQueries )
            this.searchAwards( searchQueries )
        },
        onDataGiven(value){
            this.forgottenValues= value;
        },
        onChangeSearchParam(values){
            this.forgottenValues = ""
            let new_values = []
            values.forEach( (val) => new_values.push( ...(val.split(" ").map( val => val.trim()).filter(val => val.length > 0)))  )
            this.selected_values = Array.from( new Set(new_values) )
        }
    },
    created(){
        let awardParams = this.getCurrentSearchParams.award

        if(awardParams){
            this.selected_companies.push( ...awardParams.selected_companies);
            this.selected_values.push( ...awardParams.selected_values);
            this.selected_countries.push( ...awardParams.country);

            this.award_date_start= awardParams.award_date_start;
            this.award_date_end= awardParams.award_date_end;
        }
    }
}
</script>
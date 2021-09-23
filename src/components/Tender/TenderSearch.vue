<template>
    <div>
        <v-card class="" :elevation="4">
            <v-card-title class="font-weight-black vuetify-main-components"> 
                <v-icon v-if="userServicePage  && $vuetify.breakpoint.mdAndUp" class="text--secondary mr-1">mdi-account-circle</v-icon> 
                Tender <span v-if="!$vuetify.breakpoint.mdOnly" class="ml-1"> Search</span>
                <span v-if="userServicePage && $vuetify.breakpoint.smAndDown" class="ml-auto text--secondary"> My Service <v-icon>mdi-account-circle</v-icon></span> 
                <v-icon v-if="$vuetify.breakpoint.xsOnly" color="gray" :class="userServicePage? 'ml-3': 'ml-auto'" @click="$emit('close_dialog' , false);"> mdi-close</v-icon>
                <v-btn-toggle
                    x-small
                    class="ma-0 pa-0  ml-auto"
                    :class="$vuetify.breakpoint.xsOnly? 'mx-auto mt-3': 'ml-auto'"
                    v-model="currentSearchType"
                    borderless
                >
                    <v-btn x-small text class="py-2 px-2 ma-0 grey lighten-2 search-type" value='simple_search' @click="changeSearchType('simple_search')" >
                    <span>Simple</span>
                        <v-icon small right>
                            mdi-magnify
                        </v-icon>
                    </v-btn>
 
                    <v-btn x-small text class="py-2 px-2 ma-0 grey lighten-2" value='advanced_search' @click="changeSearchType('advanced_search')" >
                    <span>Advanced</span>
                        <v-icon small right>
                            mdi-magnify
                        </v-icon>
                    </v-btn>
                </v-btn-toggle>
                <v-icon v-if="$vuetify.breakpoint.smOnly" color="gray" :class="userServicePage? 'ml-3': 'ml-auto'" @click="$emit('close_dialog' , false);"> mdi-close</v-icon>
            </v-card-title>
        </v-card>


        <v-card class="mt-2 pa-5" :elevation="4">
            <v-row>
                <v-col xs12 id="tender-name">
                    <v-combobox
                        class="combo-box"
                        clearable
                        hide-selected
                        deletable-chips
                        multiple
                        persistent-hint
                        dense
                        full-width
                        small-chips
                        :items= "items"
                        v-model="selected_values"
                        height= 80
                        @input.native="onDataGiven($event.srcElement.value)"
                        @change="onChangeSearchParam"
                        placeholder="Keywords"
                        >
                    </v-combobox>
                    <v-card-title class="font-weight-black vuetify-main-components ma-0" > Keywords </v-card-title>
                </v-col>
            </v-row>
        </v-card>
        

        <v-card class="mt-2 pa-5" :elevation="4" v-if="currentSearchType == 'advanced_search'">
            <v-container fluid class="ma-0 pa-0">
                <v-row class="ma-0 pa-0">
                    <v-col id="tender-sector" cols="12" sm="6"  class="ma-0 pa-0 pr-1">
                        <v-autocomplete
                            class="combo-box"
                            chips
                            clearable
                            deletable-chips
                            multiple
                            dense
                            small-chips
                            v-model="selected_sectors"
                            :items= "getTenderSector"
                        >
                        </v-autocomplete>
                        <v-card-title class="font-weight-black vuetify-main-components"> Category </v-card-title>
                    </v-col>

                     <v-col id="tender-sector" cols="12" sm="6"  class="ma-0 pa-0 pr-1">
                        <v-autocomplete
                            @change="fixDateToOpenTenders"
                            class="text-center"
                            dense
                            v-model="tender_status"
                            :items="['         Open','           All']"
                        >
                        </v-autocomplete>
                        <v-card-title class="font-weight-black vuetify-main-components"> Tender Status </v-card-title>
                    </v-col>

                    <!-- <v-col cols="12" sm="6" >
                        <v-btn-toggle v-model="tender_status" class="rounded-0" borderless> 
                            <v-btn x-small class="py-4 pl-4" @click="sex = 'Male'" value="Open">
                                <v-icon class="mr-2" small>mdi-folder-open</v-icon>  Open
                            </v-btn>
                            <v-btn x-small class="py-4 pr-4" @click="sex = 'Female'"  value="All"> 
                                <v-icon class="mr-2" :color="tender_status ==  'All' ? 'secondary' : ''" small>mdi-folder</v-icon> All
                            </v-btn>
                        </v-btn-toggle>
                        <v-card-title class="font-weight-black  vuetify-main-components status-component mt-2"> Tender Status </v-card-title>
                    </v-col> -->

                    <!-- <v-col id="tender-type" cols="12" sm="6" class="ma-0 pa-0" >
                        <v-autocomplete
                            chips
                            clearable
                            deletable-chips
                            multiple
                            dense
                            small-chips
                            v-model="selected_types"
                            :items= "getTenderType"
                            >
                        </v-autocomplete>
                        <v-card-title class="font-weight-black vuetify-main-components"> Type </v-card-title>
                    </v-col> -->
                </v-row>
            </v-container>
        </v-card>   


        <v-card class="mt-2 pa-5" :elevation="4">
            <v-container fluid class="ma-0 pa-0">
                <v-row class="ma-0 pa-0">
                    <v-col id="tender-company"  cols="12" sm="6"  class="ma-0 pa-0 pr-1">
                        <v-autocomplete
                            chips
                            clearable
                            deletable-chips
                            multiple
                            dense
                            small-chips
                            v-model="selected_companies"
                            :items= "getCompanyNames"
                            >
                        </v-autocomplete>
                        <v-card-title class="font-weight-black vuetify-main-components"> Buyer Company </v-card-title>
                    </v-col>

                    <v-col id="tender-country"  cols="12" sm="6" class="ma-0 pa-0" >
                        <v-autocomplete
                            chips
                            clearable
                            deletable-chips
                            multiple
                            dense
                            small-chips
                            v-model="selected_countries"
                            :items= "getTenderCountries"
                            >
                        </v-autocomplete>
                        <v-card-title class="font-weight-black vuetify-main-components"> Country </v-card-title>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>


        <v-card class="mt-2 pa-5" :elevation="4" v-if="currentSearchType == 'advanced_search'">
            <v-container fluid>
                <v-row  id="tender-issued" >
                    <v-col  cols="12" sm="6"  class="ma-0 pa-0 pr-1">
                        <DatePicker label = "Issued starting date" @date="updateIssuedDateStart" :date_value="issued_date_start" /> 
                    </v-col>

                    <v-col  cols="12" sm="6" class="ma-0 pa-0">
                        <DatePicker label = "Issued ending date" @date="updateIssuedDateEnd" :date_value="issued_date_end" /> 
                    </v-col>
                </v-row>
            </v-container>
            <v-card-title class="font-weight-black vuetify-main-components"> Isssued Date </v-card-title>
        </v-card>


        <v-card class="mt-2 pa-5" :class="(getViewOption != 0 && userServicePage)? 'mt-3': ''"  :elevation="4" v-if="currentSearchType == 'advanced_search'">
            <v-container fluid class="ma-0 pa-0">
                <v-row  id="tender-closing" class="ma-0 pa-0 mt-2" >
                    <v-col  cols="12" sm="6"  class="ma-0 pa-0 pr-1">
                        <DatePicker label = "Closing starting date"  @date="updateClosingDateStart" :date_value="closing_date_start"/> 
                    </v-col>

                    <v-col  cols="12" sm="6"  class="ma-0 pa-0 ml-auto">
                        <DatePicker label = "Closing ending date" @date="updateClosingDateEnd" :date_value="closing_date_end"  /> 
                    </v-col>
                </v-row>
                <v-row :class="userServicePage? 'mt-3' :  'mt-5'" >
                    <v-col cols="6" :class="(this.$vuetify.breakpoint.xsOnly)? 'mb-5 pb-5': ''">
                        <v-card-title class="font-weight-black mx-0 px-0  d-block vuetify-main-components"> Closing Date </v-card-title>
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
                            dense
                            @click="searchResult"
                            large outlined raised rounded text
                            class="float-right"
                            style="font-size:10px !important"     
                        >
                            Search
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        
        
        <v-card class="mt-2 pa-5 pb-1" :elevation="4" v-if="currentSearchType == 'simple_search'">
            <v-container fluid class="ma-0 pa-0">
                <v-row  id="tender-closing" class="ma-0 pa-0 mt-2" >
                    <v-col  cols="12" sm="6"  class="ma-0 pa-0 pr-1">
                        <DatePicker label = "Issued date" @date="updateIssuedDateStart" :date_value="issued_date_start" /> 
                        <v-card-title class="font-weight-black  d-block vuetify-main-components text-left pt-4 pb-3"> Issued Date </v-card-title>  

                    </v-col>

                    <v-col  cols="12" sm="6"  class="ma-0 pa-0 pr-1">
                        <DatePicker label = "Closing date"  @date="updateClosingDateStart" :date_value="closing_date_start"/> 
                        <v-card-title class="font-weight-black  d-block vuetify-main-components pt-4 pb-3 pl-3"> Closing Date </v-card-title>  
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

        <v-card class="mt-2 pa-2" :elevation="4"  v-if="currentSearchType == 'simple_search'">
            <v-container fluid class="ma-0 pa-0">
                <v-row class="ma-0 pa-0">
                    <v-col cols="12" sm="6" >
                        <v-btn-toggle mandatory v-model="tender_status" class="d-block" :class="(this.$vuetify.breakpoint.xsOnly)? 'ml-5 pl-5': ''" shaped> 
                            <v-btn x-small class="py-4 tender-card-data"  :color="(tender_status.trim() == 'Open')? 'green--text' : ''"  @click="tender_status = '         Open';fixDateToOpenTenders()" value="         Open">
                                <v-icon class="mr-1" :color="(tender_status.trim() == 'Open')? 'green' : ''"  small>mdi-folder-open</v-icon>  Open  <br>  Tenders
                            </v-btn>
                            <v-btn x-small class="py-4 tender-card-data"  :color="(tender_status.trim() == 'All')? 'red--text' : ''"  @click="tender_status = '           All';fixDateToOpenTenders()"  value="           All"> 
                                <v-icon class="mr-1"  :color="(tender_status.trim() == 'All')? 'red' : ''" small>mdi-folder</v-icon> All <br> Tenders
                            </v-btn>
                        </v-btn-toggle>
                        <!-- <span v-if="this.$vuetify.breakpoint.xsOnly" class="font-weight-black vuetify-main-components ma-0 py-auto ml-2"> Tender Status </span>   -->
                    </v-col>
                    <v-col cols="3" :class="(this.$vuetify.breakpoint.xsOnly)? 'ml-auto': ''" >
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
                            dense
                            @click="searchResult"
                            large outlined raised rounded text
                            class="float-right"
                            style="font-size:10px !important"     
                        >
                            Search
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
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
            closing_date_start: '',
            closing_date_end: '',
            issued_date_start: '',
            issued_date_end: '',
            selected_values: [],
            selected_sectors:[],
            selected_companies:[],
            selected_types:[],
            selected_countries:[],
            currentSearchType: 'simple_search',
            forgottenValues : "",
            tender_status: "           All"
        };
    },
    computed: {
        ...mapGetters(["getViewOption", "getClosingDateValueStatus", "getTenderSector", "getTenderType", "getTenderCountries", "getCompanyNames", "getCompanyDict", "getDatePickerResetState", "getTenderData", "getTenderSearchParams", "getCurrentSearchParams", "getCurrentTenderSearchType"]),
        dateRangeText () {
            return this.dates.join(' ~ ')
        },
        userServicePage() {
            return this.$route.name == 'my-service';
        }
    },
    methods: {
        ...mapActions(["searchTenders", "changeClosingDateValueStatus", "setTenderData", "setTenderSearchParams", "setDatePickerResetState", "setCurrentSearchParams", "setCurrentTenderSearchType"]),
        updateIssuedDateStart(date){
            this.issued_date_start = date
        },
        updateIssuedDateEnd(date){
            this.issued_date_end = date
        },
        updateClosingDateStart(date){
            this.fixDateToOpenTenders();
            this.closing_date_start = date
        },
        updateClosingDateEnd(date){
            this.closing_date_end = date
        },
        fixDateToOpenTenders(){
            this.changeClosingDateValueStatus(this.tender_status.trim())
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
                sector : [...this.selected_sectors],
                country: [...this.selected_countries],
                closing_date_start: this.closing_date_start,
                closing_date_end: this.closing_date_end,
                issued_date_start: this.issued_date_start,
                issued_date_end: this.issued_date_end,
            }
            
            let tenderParams = this.getCurrentSearchParams
            tenderParams.tender = params

            this.setCurrentSearchParams(tenderParams)
        },
        searchResult(){
            this.collectAndSaveParams();
            let ids = this.changeCompanyValues();
            
            let searchQueries = {
                query: true,
                queries:{
                    size: 12,
                    company_id : ids.join(','),
                    name : [ ...this.selected_values, ...(this.forgottenValues.split(" ").map( val => val.trim()).filter(val => val.length > 0) )].join(','),
                    type : this.selected_types.join(','),
                    sector : this.selected_sectors.join(','),    
                    closing_date_start: this.closing_date_start,
                    closing_date_end: this.closing_date_end,
                    issued_date_start: this.issued_date_start,
                    issued_date_end: this.issued_date_end,
                    country: this.selected_countries.join(',')
                }
            }

            if(this.userServicePage){
                searchQueries.myService = true;
            }

            if( (!this.closing_date_start || new Date(this.closing_date_start) < new Date()) && this.getClosingDateValueStatus == 'Open' ){
                let date = new Date()
                date.setDate(date.getDate() + 1)
                searchQueries.queries.closing_date_start =  date.toISOString().split('T')[0];
                this.closing_date_start =  date.toISOString().split('T')[0];
            }


            this.setTenderData( [] )
            this.setTenderSearchParams( searchQueries )
            this.searchTenders( searchQueries )
        },
        clearResult(){

            this.closing_date_start
            let searchQueries = {
                query: true,
                queries:{
                    size: 12,
                }
            }
            
            this.selected_companies = [];
            this.tender_status = "           All"
            this.changeClosingDateValueStatus(this.tender_status.trim())
            this.selected_values = [];
            this.selected_types = [];
            this.selected_sectors = [];    
            this.closing_date_end = null;
            this.closing_date_start = null;
            this.issued_date_start = null;
            this.issued_date_end = null;
            this.selected_countries = [];
            this.forgottenValues = ""
            this.setDatePickerResetState( !this.getDatePickerResetState );

            if(this.userServicePage){
                searchQueries.myService = true;
            }

            let tenderParams = this.getCurrentSearchParams
            tenderParams.tender = null;
            this.setCurrentSearchParams(tenderParams)

            this.setTenderData( [] )
            this.setTenderSearchParams( searchQueries )
            this.searchTenders( searchQueries )

        },
        changeSearchType(searchType){
            this.currentSearchType = searchType
            this.setCurrentTenderSearchType(searchType)
        },
        onDataGiven(value){
            this.forgottenValues= value;
        },
        onChangeSearchParam(values){
            this.forgottenValues = ""
            let new_values = []
            values.forEach( (val) => new_values.push( ...(val.split(" ").map( val => val.trim()).filter(val => val.length > 0) ) ) )
            this.selected_values = Array.from( new Set(new_values) )
        }
    },
    created(){
        let tenderParams = this.getCurrentSearchParams.tender

        if(tenderParams){
            this.selected_companies.push( ...tenderParams.selected_companies);
            this.selected_values.push( ...tenderParams.selected_values);
            this.selected_sectors.push( ...tenderParams.sector);
            this.selected_countries.push( ...tenderParams.country);
            this.selected_companies.push( ...tenderParams.selected_companies);
            
            this.closing_date_start= tenderParams.closing_date_start;
            this.closing_date_end= tenderParams.closing_date_end;
            this.issued_date_start= tenderParams.issued_date_start;
            this.issued_date_end= tenderParams.issued_date_end;
        }

        this.currentSearchType = this.getCurrentTenderSearchType;

    },
}
</script>

<style scoped>
.status-component{
    font-weight: 600 !important;
}
.tender-card-data{
  font-size: 8px !important;
  font-weight: 600 !important;
}
</style>
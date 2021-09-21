<template>
    <div>
        <v-card class="" :elevation="4">
            <v-card-title class="font-weight-black vuetify-main-components"> 
                Company Search   
                <span v-if="userServicePage" class="ml-auto text--secondary"> My Service <v-icon>mdi-account-circle</v-icon></span>  
                <v-icon v-if="$vuetify.breakpoint.smAndDown" color="gray" :class="userServicePage? 'ml-3': 'ml-auto'" @click="$emit('close_dialog' , false);"> mdi-close</v-icon>
            </v-card-title>
        </v-card>

        <v-card class="mt-2 pa-5" :elevation="4">
            <v-row>
                <v-col xs12 id="company-name">
                    <v-combobox
                        clearable
                        hide-selected
                        deletable-chips
                        multiple
                        persistent-hint
                        dense
                        small-chips
                        @input.native="onDataGiven($event.srcElement.value)"
                        v-model="selected_values"
                        :items= "items"
                        height = 100
                        @change="onChangeSearchParam"
                        >
                    </v-combobox>
                    <v-card-title class="font-weight-black vuetify-main-components "> Keywords </v-card-title>
                </v-col>
            </v-row>
        </v-card>
        
        <v-card class="mt-2 pa-5" :elevation="4">
            <v-row class="ma-0 pa-0">
                <v-col id="company-category"  cols="12" sm="6"  class="ma-0 pa-0">
                    <v-autocomplete
                    chips
                    clearable
                    deletable-chips
                    multiple
                    v-model="selected_categories"
                    small-chips
                    dense
                    :items= "getCompanyCategories"
                    >
                    </v-autocomplete>
                    <v-card-title class="font-weight-black vuetify-main-components "> Category </v-card-title>
                </v-col>

                <v-col id="company-country"  cols="12" sm="6"    class="ma-0 pa-0 pl-1 ml-auto">
                    <v-autocomplete
                        chips
                        clearable
                        deletable-chips
                        multiple
                        dense
                        v-model="selected_countries"
                        small-chips
                        :items= "getCompanyCountries"
                        >
                    </v-autocomplete>
                    <v-card-title class="font-weight-black vuetify-main-components"> Country </v-card-title>
                </v-col>
            </v-row>
        </v-card>   

        <v-card class="mt-2 pa-5" :elevation="4">
            <v-row>
                <v-col cols="9">
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
        </v-card>

    </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
    },
    data() {
        return {
            items: [ "Ethiopia", "PPA", "Construction" ],
            selected_countries: [],
            selected_values: [],
            selected_categories:[],
            forgottenValues: ''
        };
    },
    computed: {
        ...mapGetters(["getCompanyCountries", "getCompanyCategories", "getCurrentSearchParams" ]),
        userServicePage() {
            return this.$route.name == 'my-service';
        }
    },
    methods: {
        ...mapActions(["searchCompanies", "setCompanyData", "setCompanySearchParams","setCurrentSearchParams"]),
        collectAndSaveParams(){
            let params = {
                selected_values: [ ...this.selected_values, ...(this.forgottenValues.split(" ").map( val => val.trim()).filter(val => val.length > 0) )],
                categories : [...this.selected_categories],
                country: [...this.selected_countries],
            }
            
            let companyParams = this.getCurrentSearchParams
            companyParams.company = params
            this.setCurrentSearchParams(companyParams)
        },
        searchResult(){
            this.collectAndSaveParams();
            let searchQueries = {
                query: true,
                queries:{
                    size: 12,
                    name : [ ...this.selected_values, ...(this.forgottenValues.split(" ").map( val => val.trim()).filter(val => val.length > 0) )].join(','),
                    country : this.selected_countries.join(','),
                    category : this.selected_categories.join(','), 
                }
            }

            if(this.userServicePage){
                searchQueries.myService = true;
            }

            this.setCompanyData( [] )
            this.setCompanySearchParams( searchQueries )
            this.searchCompanies( searchQueries )
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
            this.selected_categories = []
            
            if(this.userServicePage){
                searchQueries.myService = true;
            }
            
            this.setCompanyData( [] )
            
            let companyParams = this.getCurrentSearchParams
            companyParams.company = null;
            this.setCurrentSearchParams(companyParams)
            
            this.setCompanySearchParams( searchQueries )
            this.searchCompanies( searchQueries )

        },
        onDataGiven(value){
            this.forgottenValues= value;
        },
        onChangeSearchParam(values){
            this.forgottenValues = ""
            let new_values = []
            values.forEach( (val) => new_values.push( ...(val.split(" ").map( val => val.trim()).filter(val => val.length > 0))) )
            this.selected_values = Array.from( new Set(new_values) )
        }
    },
    created(){
        let companyParams = this.getCurrentSearchParams.company

        if(companyParams){
            this.selected_values.push( ...companyParams.selected_values);
            this.selected_categories.push( ...companyParams.categories);
            this.selected_countries.push( ...companyParams.country);
        }
    }
}
</script>
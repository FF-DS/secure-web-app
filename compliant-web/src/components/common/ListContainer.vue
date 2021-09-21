<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" md="2"  class="mt-1">
                <v-chip dense small class="font-weight-medium grey--text text-darken-1 float-left" v-if=" getTab == 'Tender' ">
                    {{ Math.min(getTenderPageInfo.pageSize *currentPage,getTenderPageInfo.totalCount) }}  / {{ getTenderPageInfo.totalCount }} 
                </v-chip>
                <v-chip dense small class="font-weight-medium grey--text text-darken-1 float-left" v-if=" getTab == 'Company' " >
                    {{ Math.min(getCompanyPageInfo.pageSize *currentPage,getCompanyPageInfo.totalCount) }}  / {{ getCompanyPageInfo.totalCount }} 
                </v-chip>
                <v-chip dense small class="font-weight-medium grey--text text-darken-1 float-left" v-if=" getTab == 'Award' "  >
                    {{ Math.min(getAwardPageInfo.pageSize *currentPage,getAwardPageInfo.totalCount) }}  / {{ getAwardPageInfo.totalCount }} 
                </v-chip>
            </v-col>
            <v-col cols="12" md="2" lg="6"  class="mt-1">
               <v-pagination
                    v-if="!$vuetify.breakpoint.md"
                    v-model="currentPage"
                    :length="( getTab == 'Tender' )? getTenderPageInfo.numberOfPages : ( getTab == 'Company' )? getCompanyPageInfo.numberOfPages :  getAwardPageInfo.numberOfPages" 
                    :total-visible=" $vuetify.breakpoint.xsOnly? 1 : 7"
                    circle
                    @input="handlePageChange"
                    
                    class="pagination-sec mx-auto mt-5 text-center"
                    
                    next-icon="mdi-menu-right"
                    prev-icon="mdi-menu-left"

                ></v-pagination>
            </v-col>

            <v-col cols="12" md="6" lg="4" class=" ml-auto switch-data"
                :class="$vuetify.breakpoint.mdAndDown? 'mr-2' : ''"
                >
                <v-btn-toggle
                    small
                    class="mb-4 mr-5 ml-auto"
                    v-model="currentViewOption"
                >
                    <v-btn x-small class="pa-4" value='Table' @click="changeViewStyle(0)" >
                        <span class="hidden-sm-and-down">Table</span>
                        <v-icon small right>
                            mdi-table
                        </v-icon>
                    </v-btn>

                    <v-btn x-small class="pa-4" value='List' @click="changeViewStyle(1)">
                        <span class="hidden-sm-and-down">List</span>
                        <v-icon small right>
                            mdi-format-align-center
                        </v-icon>
                    </v-btn>

                    <v-btn x-small class="pa-4" value='Map' @click="changeViewStyle(2)">
                        <span class="hidden-sm-and-down">Map</span>
                        <v-icon small right>
                            mdi-map-marker
                        </v-icon>
                    </v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>
        <v-layout row>
            <v-flex>
                <v-card class="mx-0 pa-0 pr-2 overflow-y-auto"  :max-height="634" >
                    <v-container class="ma-0 pa-0">
                        <div v-if="getTab == 'Tender'">
                            <TenderCard v-for=" (data, index)  in  getTenderData" :key=" 'T' + index"  :tenderData=data />
                        </div>
                        <div v-if="getTab == 'Award'">
                            <AwardCard v-for=" (data, index )  in  getAwardData" :key=" 'A' + index"  :awardData=data />
                        </div>
                        <div v-if="getTab == 'Company'">
                            <CompanyCard v-for=" (data, index)  in  getCompanyData" :key=" 'C' + index"  :companyData=data />
                        </div>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
        <v-row class="mb-2">
            <v-col cols="12" md="2"></v-col>
            <v-col cols="12" lg="6">
               <v-pagination
                    v-model="currentPage"
                    :length="( getTab == 'Tender' )? getTenderPageInfo.numberOfPages : ( getTab == 'Company' )? getCompanyPageInfo.numberOfPages :  getAwardPageInfo.numberOfPages" 
                    :total-visible=" $vuetify.breakpoint.xsOnly? 1 : 7"
                    circle
                    @input="handlePageChange"
                    
                    class="pagination-sec"
                    
                    next-icon="mdi-menu-right"
                    prev-icon="mdi-menu-left"

                ></v-pagination>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import TenderCard from '@/components/Tender/TenderCard'
import CompanyCard from '@/components/Company/CompanyCard'
import AwardCard from '@/components/Award/AwardCard'
import { mapActions, mapGetters } from "vuex";

export default {
    components:{
      TenderCard,
      CompanyCard,
      AwardCard,
    },
    data(){
        return {
            currentPage: 1,
            viewOption: false,
            currentViewOption: 'List'
        }
    },
    computed: {
        ...mapGetters(["getTab","getAwardData","getCompanyData","getTenderData", "getViewOption", "getTenderPageInfo", "getAwardPageInfo", "getCompanyPageInfo", "getTenderSearchParams", "getAwardSearchParams", "getCompanySearchParams", "getAmountOfDataItem"]),
    },
    methods: {
        ...mapActions(["changeViewOption", "searchTenders", "setTenderData","searchAwards", "setAwardData" ,"searchCompanies", "setCompanyData"]),
        handlePageChange(pageNumber) {
            if( this.getTab == 'Tender'){
                let params = this.getTenderSearchParams;
                params.queries.page = pageNumber;
                this.setTenderData([])
                this.searchTenders(params)
            }else if(this.getTab == 'Award'){
                let params = this.getAwardSearchParams;
                params.queries.page = pageNumber;
                this.setAwardData([])
                this.searchAwards(params)
            }else{
                let params = this.getCompanySearchParams;
                params.queries.page = pageNumber;
                this.setCompanyData([])
                this.searchCompanies(params)
            }
            
        },
        changeViewStyle(option) {
            this.currentViewOption = option;
            this.changeViewOption(option)
        }
    },
    created() {
    }
}
</script>


<style scoped>

.pagination-sec{
  transform: scale(0.7);
  margin: 0px !important;
}

</style>
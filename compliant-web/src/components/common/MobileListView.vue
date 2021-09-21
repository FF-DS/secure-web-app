<template>
    <v-container fluid>
        <v-layout row :class=" !$vuetify.breakpoint.smAndDown? 'mb-2': '' ">
            <v-flex sm2 xs0> </v-flex>
            <v-flex xs12 sm8 >
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
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs4 sm2 class="mt-5 mb-5 ml-5">
                <v-chip dense small class="font-weight-medium grey--text text-darken-1 float-left" v-if=" getTab == 'Tender' ">
                    {{ Math.min(getTenderPageInfo.pageSize *currentPage,getTenderPageInfo.totalCount) }}  / {{ getTenderPageInfo.totalCount }} 
                </v-chip>
                <v-chip dense small class="font-weight-medium grey--text text-darken-1 float-left" v-if=" getTab == 'Company' " >
                    {{ Math.min(getCompanyPageInfo.pageSize *currentPage,getCompanyPageInfo.totalCount) }}  / {{ getCompanyPageInfo.totalCount }} 
                </v-chip>
                <v-chip dense small class="font-weight-medium grey--text text-darken-1 float-left" v-if=" getTab == 'Award' "  >
                    {{ Math.min(getAwardPageInfo.pageSize *currentPage,getAwardPageInfo.totalCount) }}  / {{ getAwardPageInfo.totalCount }} 
                </v-chip>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex>
                <div v-if="getTab == 'Tender'" :class="responsive_padding">
                    <TenderCard v-for=" (data, index)  in  getTenderData" :key=" 'T' + index"  :tenderData=data />
                </div>
                <div v-if="getTab == 'Award'" :class="responsive_padding">
                    <AwardCard v-for=" (data, index )  in  getAwardData" :key=" 'A' + index"  :awardData=data />
                </div>
                <div v-if="getTab == 'Company'" :class="responsive_padding">
                    <CompanyCard v-for=" (data, index)  in  getCompanyData" :key=" 'C' + index"  :companyData=data />
                </div>
            </v-flex>
        </v-layout>
        <v-layout row class="mb-2">
            <v-flex xs8 sm8 class="mx-auto">
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
            </v-flex>
        </v-layout>
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
            responsive_padding : 'mx-2',
            viewOption: false,
      }
    },
    computed: {
        ...mapGetters(["getSideBarState","getTab","getAwardData","getCompanyData","getTenderData", "getViewOption", "getTenderPageInfo", "getAwardPageInfo", "getCompanyPageInfo", "getTenderSearchParams", "getAwardSearchParams", "getCompanySearchParams"]),
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
        changeViewStyle() {
            this.changeViewOption(!this.getViewOption)
        },
        cache(){
            console.log('Cache Cleared');
        },
        alert(){
            alert('Clicked on alert icon');
        }
    },
    created() {
        this.viewOption = this.getViewOption;
    }
}
</script>


<style scoped>

.pagination-sec{
  transform: scale(0.7);
  margin: 0px !important;
}
.switch-data{
  transform: scale(0.8);
  font-size: 10px !important;
  font-weight: 400 !important;
}

</style>
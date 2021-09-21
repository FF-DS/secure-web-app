<template>
  <v-data-table
    dense
    :headers="getCompanyHeader"
    :items="getCompanyData"
    :server-items-length="getCompanyPageInfo.totalCount"
    :footer-props="footerProps"
    :options="{ itemsPerPage:getAmountOfDataItem }"
    @update:page="changePage" 
    @update:sort-by="sortData"
    @update:sort-desc="revSortData"
    class="elevation-1 mt-5"
    @click:row="selectedRow"
  > 
    <template v-slot:item.name="{ item }">
      <v-layout v-if="userServicePage || adminServicePage">
        <v-flex xs3 >
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" left class="tender-icons ma-0 pa-0" :color="getStatus(item.status).color" >
                    {{ getStatus(item.status).icon }}
              </v-icon>
            </template>
            <span class="tooltip-card-data">{{ getStatus(item.status).tooltip }}. <br> for more info checkout the about page.</span>
          </v-tooltip>
        </v-flex>
        <v-flex xs9>
          {{ item.name }}
        </v-flex>
      </v-layout>

      <v-row class="ma-0 pa-0" v-else>
        <v-col cols="2"  class="mr-0 pr-1" v-if="!$vuetify.breakpoint.xsOnly">
          <img width="13" :src="item.avatar? item.avatar : '/logo/tendermap.png' " class="logo-style" />
        </v-col>
        <v-col cols="12" sm="10"  class="mr-0 pr-0">
          {{ item.name }} 
        </v-col>
      </v-row> 
    </template>

    <template v-slot:item.detail="{ item }">
      <CompanyReview :companyData=item  v-if="adminServicePage"  />
      <CompanyDetailCard  :companyData=item v-else />
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CompanyDetailCard from '@/components/Company/CompanyDetailCard';
import CompanyReview from '@/components/Company/CompanyReview';

export default {
    components: {
      CompanyDetailCard,
      CompanyReview
    },
    data () {
      return {
        footerProps: {'items-per-page-options': []},
      }
    },
    computed: {
        ...mapGetters(["getCompanyData","getCompanyHeader", "getCompanyPageInfo" , "getCompanySearchParams", "getAmountOfDataItem"]),
        userServicePage() {
          return this.$route.name == 'my-service';
        },
        adminServicePage() {
            return this.$route.name == 'admin-service';
        },
    },
    methods: {
      ...mapActions(["searchCompanies", "setCompanyData", "setSelectedObject"]),
      getStatus (status) {
        if(status == 'Approved')
            return { icon : 'mdi-check', color: 'green', tooltip: 'This tender has been approved by site admins' }
        else if(status == 'Published_By_User')
            return { icon : 'mdi-progress-check', color: 'orange',  tooltip: 'This tender has been published by a site user' }
        else if(status == 'Under_Review')
            return { icon : 'mdi-clock', color: 'orange', tooltip: "This tender hasn't been reviewed yet" }
        else if(status == 'Rejected')
            return { icon : 'mdi-close', color: 'red', tooltip: "This tender has been rejected" }
      },
      changePage(pageNumber){
        let params = this.getCompanySearchParams;
        params.queries.page = pageNumber;
        this.setCompanyData([])
        this.searchCompanies(params)
      },
      sortData(info){
        this.getCompanyData.sort( (a, b) => (a[ info[0] ] > b[ info[0] ] ? 1 : -1) )
      },
      revSortData(info){
        this.getCompanyData.sort( (a, b) => (a[ info[0] ] > b[ info[0] ] ? -1 : 1) )
      },
      selectedRow(row){
        this.setSelectedObject(row)
      }
    },
  }
</script>

<style scoped>

.tender-card-chip{
  font-size: 10px !important;
  font-weight: 400 !important;
  line-height: 6px !important;
}

.tender-icons{
  font-size: 17px !important;
  font-weight: 400 !important;

}
.v-data-table >>> td{
  font-size: 10px !important;
  font-weight: 400 !important;
}

.logo-style{
  border-radius: 50%;
}

.tooltip-card-data{
  font-size: 11px !important;
  font-weight: 400 !important;
}

</style>
<template>
  <v-data-table
    dense
    :headers="getTenderHeader"
    :items="getTenderData"
    :server-items-length="getTenderPageInfo.totalCount"
    :footer-props="footerProps"
    :options="{ itemsPerPage:getAmountOfDataItem }"
    @update:page="changePage" 
    @update:sort-by="sortData"
    @update:sort-desc="revSortData"
    class="elevation-1 mt-5"
    :class="(!userServicePage)? 'size-control' : 'user-size-control'"
    @click:row="selectedRow"
  >
    <template v-slot:item.title="{ item }">
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
          {{ item.title }}
        </v-flex>
      </v-layout>

      <v-layout v-else>
        <v-flex xs2>
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" left class="tender-icons ma-0 pa-0" :color="getDateStatus(item.closing_date).color" >
                    {{ getDateStatus(item.closing_date).icon }}
              </v-icon>
            </template>
            <span class="tooltip-card-data">{{ getDateStatus(item.closing_date).tooltip }} <br> for more info checkout the about page</span>
          </v-tooltip>
        </v-flex>

        <v-flex xs10>
          {{ item.title }}
        </v-flex>
      </v-layout>
    </template>

    <template v-slot:item.closing_date="{ item }">
      <v-layout>
        <v-flex>
            {{ new Date(item.closing_date).toLocaleDateString() }}
        </v-flex>
      </v-layout>
    </template>

    <template v-slot:item.detail="{ item }">
      <TenderReview :tenderData=item  v-if="adminServicePage" />
      <TenderDetailCard  :tenderData=item  v-else/>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TenderDetailCard from '@/components/Tender/TenderDetailCard';
import TenderReview from '@/components/Tender/TenderReview';

export default {
    components: {
      TenderDetailCard,
      TenderReview
    },
    data () {
      return {
        footerProps: {'items-per-page-options': []},
      }
    },
    computed: {
        ...mapGetters(["getTenderData","getTenderHeader", "getTenderPageInfo", "getTenderSearchParams", "getAmountOfDataItem"]),
        userServicePage() {
          return this.$route.name == 'my-service';
        },
        adminServicePage() {
            return this.$route.name == 'admin-service';
        },
    },
    methods: {
      ...mapActions(["searchTenders", "setTenderData", "setSelectedObject"]),
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
      getDateStatus(date){
          let currDate =  new Date()
          if( new Date(date) > currDate)
              return { icon : 'mdi-check', color: 'green',  tooltip: 'This tender is currently open'  }
          else
              return { icon : 'mdi-alarm-check', color: 'red',  tooltip: 'This tender is currently closed' }
      },
      changePage(pageNumber){
        let params = this.getTenderSearchParams;
        params.queries.page = pageNumber;
        this.setTenderData([])
        this.searchTenders(params)
      },
      sortData(info){
        this.getTenderData.sort( (a, b) => (a[ info[0] ] > b[ info[0] ] ? 1 : -1) )
      },
      revSortData(info){
        this.getTenderData.sort( (a, b) => (a[ info[0] ] > b[ info[0] ] ? -1 : 1) )
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
.size-control{
  margin-top: 1.6rem !important;
}

.user-size-control{
  margin-top: 1.3rem !important;
}

.tooltip-card-data{
  font-size: 11px !important;
  font-weight: 400 !important;
}

.tooltip-card-data{
  font-size: 11px !important;
  font-weight: 400 !important;
}

</style>
<template>
  <v-data-table
    dense
    :headers="getAwardHeader"
    :items="getAwardData"
    :server-items-length="getAwardPageInfo.totalCount"
    :footer-props="footerProps"
    :options="{ itemsPerPage: getAmountOfDataItem }"
    @update:page="changePage" 
    @update:sort-by="sortData"
    @update:sort-desc="revSortData"
    class="elevation-1 mt-5"
    @click:row="selectedRow"
  >
    <template v-slot:item.title="{ item }">
      <v-layout>
        <v-flex xs2>
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" left class="tender-icons ma-0 pa-0 pr-5 mr-5" :color="getStatus(item.status).color" >
                    {{ getStatus( item.status ).icon }}
              </v-icon>
            </template>
            <span class="tooltip-card-data" >{{ getStatus(item.status).tooltip }} <br> for more info checkout the about page</span>
          </v-tooltip>
        </v-flex>
        <v-flex xs10>
          {{ item.title }}
        </v-flex>
      </v-layout>
    </template>
    
    <template v-slot:item.detail="{ item }">
      <AwardReview :awardData=item v-if="adminServicePage"  />
      <AwardDetailCard  :awardData=item v-else />
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import AwardDetailCard from '@/components/Award/AwardDetailCard';
import AwardReview from '@/components/Award/AwardReview';

export default {
    components: {
      AwardDetailCard,
      AwardReview
    },
    data () {
      return {
        footerProps: {'items-per-page-options': []},
      }
    },
    computed: {
        ...mapGetters(["getAwardHeader","getAwardData", "getAwardPageInfo", "getAwardSearchParams", "getAmountOfDataItem"]),
        adminServicePage() {
            return this.$route.name == 'admin-service';
        },
    },
    methods: {
      ...mapActions(["setAwardData","searchAwards", "setSelectedObject"]),
      getStatus (status) {
        if(status == 'Approved')
            return { icon : 'mdi-check', color: 'green',  tooltip: 'This award has been approved by site admins' }
        else if(status == 'Published_By_User')
            return { icon : 'mdi-progress-check', color: 'orange',  tooltip: 'This award has been published by a site user'  }
        else if(status == 'Under_Review')
            return { icon : 'mdi-clock', color: 'orange', tooltip: "This award hasn't been reviewed yet"  }
        else if(status == 'Rejected')
            return { icon : 'mdi-close', color: 'red', tooltip: "This award has been rejected."  }
      },
      changePage(pageNumber){
        let params = this.getAwardSearchParams;
        params.queries.page = pageNumber;
        this.setAwardData([])
        this.searchAwards(params)
      },
      sortData(info){
        this.getAwardData.sort( (a, b) => (a[ info[0] ] > b[ info[0] ] ? 1 : -1) )
      },
      revSortData(info){
        this.getAwardData.sort( (a, b) => (a[ info[0] ] > b[ info[0] ] ? -1 : 1) )
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

.tooltip-card-data{
  font-size: 11px !important;
  font-weight: 400 !important;
}

</style>
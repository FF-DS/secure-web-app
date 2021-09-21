<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" md="6" lg="4"  class="mr-auto switch-data"
                :class="$vuetify.breakpoint.mdAndDown? 'mr-2' : ''"
                >
                <v-btn-toggle
                    small
                    class="mb-2 mr-2"
                    v-model="currentViewOption"
                >
                    <v-btn x-small class="pa-4" value='Table' @click="changeViewStyle(0)" >
                        <span class="hidden-sm-and-down">Table</span>
                        <v-icon small right>
                            mdi-table
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

        <v-row>
            <v-col cols="12" md="11">
                <v-data-table
                    height="409"
                    dense
                    :headers="getAccountTableHeader"
                    :items="getAccountsData"
                    :server-items-length="getAccountPageInfo.totalCount"
                    :footer-props="footerProps"
                    :options="{ itemsPerPage:getAmountOfDataItem }"
                    :disable-sort="true"
                    @update:page="changePage" 
                    @update:sort-by="sortData"
                    @update:sort-desc="revSortData"
                    class="elevation-1 mt-5"
                    @click:row="selectedRow"
                >

                    <template v-slot:item.first_name="{ item }">
                        <v-layout>
                            <v-flex>
                                {{ item.name.split('/%/')[0] }}
                            </v-flex>
                        </v-layout>
                    </template>
                    <template v-slot:item.last_name="{ item }">
                        <v-layout>
                            <v-flex>
                                {{ item.name.split('/%/')[1] }}
                            </v-flex>
                        </v-layout>
                    </template>

                    <template v-slot:item.account_state="{ item }">
                        <v-layout>
                            <v-flex>
                                {{ item.account_state == 'Unblocked'? 'Active' : item.account_state }}
                            </v-flex>
                            <v-flex>
                                <v-icon left class="tender-icons ma-0 pa-0" :color="getStatus(item.account_state).color" >
                                        {{ getStatus( item.account_state ).icon }}
                                </v-icon>
                            </v-flex>
                        </v-layout>
                    </template>

                    <template v-slot:item.country="{ item }">
                        <v-layout>
                            <v-flex>
                                {{ !item.country? 'Not available' : item.country }}
                            </v-flex>
                        </v-layout>
                    </template>
                </v-data-table>
            </v-col>
            <AccountDetail />
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AccountDetail from '@/components/Admin/AccountManagement/AccountDetail'
 
export default {
    components:{
        AccountDetail
    },
    data(){
        return {
            currentPage: 1,
            viewOption: false,
            currentViewOption: 'Table',
            footerProps: {'items-per-page-options': []},

            drawer: true,
        items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
        mini: true,
        }
    },
    computed: {
        ...mapGetters(["getAccountsData","getAccountTableHeader", "getAccountPageInfo", "getAccountSearchParams", "getAmountOfDataItem", "getViewOption"]),
        userServicePage() {
          return this.$route.name == 'my-service';
        },
        adminServicePage() {
            return this.$route.name == 'admin-service';
        },
    },
    methods: {
         ...mapActions(["searchAccounts", "setAccountDataValue", "setSelectedObject", "changeViewOption"]),
        handlePageChange(value) {
            this.currentPage = value;
        },
        changeViewStyle(option) {
            this.currentViewOption = option;
            this.changeViewOption(option)
        },
        getStatus (status) {
            if(status == 'Unblocked')
                return { icon : 'mdi-check', color: 'green',}
            else if(status == 'Blocked')
                return { icon : 'mdi-alarm-check', color: 'red',  }
            else
                return { icon : 'mdi-alarm-check', color: 'red', }
        },
        changePage(pageNumber){
            let params = this.getAccountSearchParams;
            params.queries.page = pageNumber;
            this.setAccountDataValue([])
            this.searchAccounts(params)
        },
        sortData(info){
            this.getAccountsData.sort( (a, b) => (a[ info[0] ] > b[ info[0] ] ? 1 : -1) )
        },
        revSortData(info){
            this.getAccountsData.sort( (a, b) => (a[ info[0] ] > b[ info[0] ] ? -1 : 1) )
        },
        selectedRow(row){
            this.setSelectedObject(row)
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
.switch-data{
  font-size: 10px !important;
  font-weight: 400 !important;
}

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
  font-size: 12px !important;
  color: darkslategray !important;
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

</style>
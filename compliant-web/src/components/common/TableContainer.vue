<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" md="2" v-if="$vuetify.breakpoint.smAndDown">
                <SearchTab/>
            </v-col>
            <v-col cols="12" md="6" lg="4"  class="ml-auto switch-data"
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
                <div v-if="getTab == 'Tender'">
                    <TenderTable/>
                </div>
                <div v-if="getTab == 'Award'">
                    <AwardTable/>
                </div>
                <div v-if="getTab == 'Company'">
                    <CompanyTable/>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import SearchTab from '@/components/Public/SearchTab'
import TenderTable from '@/components/Tender/TenderTable'
import CompanyTable from '@/components/Company/CompanyTable'
import AwardTable from '@/components/Award/AwardTable'
import { mapGetters, mapActions } from "vuex";

export default {
    components:{
      TenderTable,
      CompanyTable,
      AwardTable,
      SearchTab,
    },
    data(){
        return {
            currentPage: 1,
            viewOption: false,
            currentViewOption: 'Table'
        }
    },
    computed: {
        ...mapGetters(["getTab","getAwardData","getCompanyData","getTenderData","getViewOption"]),
    },
    methods: {
        ...mapActions(["changeViewOption"]),
        handlePageChange(value) {
            this.currentPage = value;
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
.switch-data{
  font-size: 10px !important;
  font-weight: 400 !important;
}

</style>
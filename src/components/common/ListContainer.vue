<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="2" class="mt-1">
        <v-chip
          dense
          small
          class="font-weight-medium grey--text text-darken-1 float-left"
        >
          {{
            Math.min(
              getCompliantPageInfo.pageSize * currentPage,
              getCompliantPageInfo.totalCount
            )
          }}
          / {{ getCompliantPageInfo.totalCount }}
        </v-chip>
      </v-col>

      <v-col cols="12" sm="6" md="6" lg="4" class=" ml-auto switch-data">
        <v-btn-toggle
          small
          class="mb-4 mr-5 ml-auto"
          v-model="currentViewOption"
        >
          <v-btn x-small class="pa-4" value="Table" @click="changeViewStyle(0)">
            <span class="">Table</span>
            <v-icon small right>
              mdi-table
            </v-icon>
          </v-btn>

          <v-btn x-small class="pa-4" value="List" @click="changeViewStyle(1)">
            <span class="">List</span>
            <v-icon small right>
              mdi-format-align-center
            </v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-layout row>
      <v-flex>
        <v-card class="mx-auto overflow-y-auto" :max-height="700">
          <v-container class="ma-0 pa-0">
            <CompliantCard
              v-for="(data, index) in getCompliantData"
              :key="'T' + index"
              :compliantData="data"
            />
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-row class="mb-2">
      <v-col cols="12" md="2"></v-col>
      <v-col cols="12" lg="6">
        <v-pagination
          v-model="currentPage"
          :length="getCompliantPageInfo.numberOfPages"
          :total-visible="$vuetify.breakpoint.xsOnly ? 1 : 7"
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
import CompliantCard from "@/components/Compliant/CompliantCard";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    CompliantCard,
  },
  data() {
    return {
      currentPage: 1,
      viewOption: false,
      currentViewOption: "List",
    };
  },
  computed: {
    ...mapGetters([
      "getTab",
      "getAwardData",
      "getCompanyData",
      "getCompliantData",
      "getViewOption",
      "getCompliantPageInfo",
      "getAwardPageInfo",
      "getCompanyPageInfo",
      "getCompliantSearchParams",
      "getAwardSearchParams",
      "getCompanySearchParams",
      "getAmountOfDataItem",
    ]),
  },
  methods: {
    ...mapActions([
      "changeViewOption",
      "searchCompliants",
      "setCompliantData",
      "searchAwards",
      "setAwardData",
      "searchCompanies",
      "setCompanyData",
    ]),
    handlePageChange(pageNumber) {
      if (this.getTab == "Compliant") {
        let params = this.getCompliantSearchParams;
        params.queries.page = pageNumber;
        this.setCompliantData([]);
        this.searchCompliants(params);
      } else if (this.getTab == "Award") {
        let params = this.getAwardSearchParams;
        params.queries.page = pageNumber;
        this.setAwardData([]);
        this.searchAwards(params);
      } else {
        let params = this.getCompanySearchParams;
        params.queries.page = pageNumber;
        this.setCompanyData([]);
        this.searchCompanies(params);
      }
    },
    changeViewStyle(option) {
      this.currentViewOption = option;
      this.changeViewOption(option);
    },
  },
  created() {},
};
</script>

<style scoped>
.pagination-sec {
  transform: scale(0.7);
  margin: 0px !important;
}
</style>

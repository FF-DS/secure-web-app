<template>
  <div class="">
    <v-data-table
      dense
      :headers="getCompliantHeader"
      :items="getCompliantData"
      :server-items-length="getCompliantPageInfo.totalCount"
      :footer-props="footerProps"
      :options="{ itemsPerPage: getAmountOfDataItem }"
      @update:page="changePage"
      @update:sort-by="sortData"
      @update:sort-desc="revSortData"
      class="elevation-1 mt-5"
      :class="'size-control'"
      @click:row="selectedRow"
    >
      <template v-slot:item.creator_user.name="{ item }">
        {{
          item.creator_user.name.split("/%/")[0] +
            " " +
            item.creator_user.name.split("/%/")[1]
        }}
      </template>

      <template v-slot:item.detail="{ item }">
        <CompliantDetailCard :compliantData="item" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CompliantDetailCard from "@/components/Compliant/CompliantDetailCard";

export default {
  components: {
    CompliantDetailCard,
  },
  data() {
    return {
      footerProps: { "items-per-page-options": [] },
    };
  },
  computed: {
    ...mapGetters([
      "getCompliantData",
      "getCompliantHeader",
      "getCompliantPageInfo",
      "getCompliantSearchParams",
      "getAmountOfDataItem",
    ]),
  },
  methods: {
    ...mapActions([
      "searchCompliants",
      "setCompliantData",
      "setSelectedObject",
    ]),
    changePage(pageNumber) {
      let params = this.getCompliantSearchParams;
      params.queries.page = pageNumber;
      this.setCompliantData([]);
      this.searchCompliants(params);
    },
    sortData(info) {
      this.getCompliantData.sort((a, b) => (a[info[0]] > b[info[0]] ? 1 : -1));
    },
    revSortData(info) {
      this.getCompliantData.sort((a, b) => (a[info[0]] > b[info[0]] ? -1 : 1));
    },
    selectedRow(row) {
      this.setSelectedObject(row);
    },
  },
};
</script>

<style scoped>
.compliant-card-chip {
  font-size: 10px !important;
  font-weight: 400 !important;
  line-height: 6px !important;
}

.compliant-icons {
  font-size: 17px !important;
  font-weight: 400 !important;
}
.v-data-table >>> td {
  font-size: 10px !important;
  font-weight: 400 !important;
}
.size-control {
  margin-top: 1.6rem !important;
}

.user-size-control {
  margin-top: 1.3rem !important;
}

.tooltip-card-data {
  font-size: 11px !important;
  font-weight: 400 !important;
}

.tooltip-card-data {
  font-size: 11px !important;
  font-weight: 400 !important;
}
</style>

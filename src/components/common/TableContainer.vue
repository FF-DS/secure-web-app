<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="2" md="2" v-if="$vuetify.breakpoint.smAndDown">
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="4" class="ml-auto switch-data">
        <v-btn-toggle small class="mb-2 mr-2" v-model="currentViewOption">
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
        <div>
          <CompliantTable />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CompliantTable from "@/components/Compliant/CompliantTable";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    CompliantTable,
  },
  data() {
    return {
      currentPage: 1,
      viewOption: false,
      currentViewOption: "Table",
    };
  },
  computed: {
    ...mapGetters(["getCompliantData", "getViewOption"]),
  },
  methods: {
    ...mapActions(["changeViewOption"]),
    handlePageChange(value) {
      this.currentPage = value;
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
.switch-data {
  font-size: 10px !important;
  font-weight: 400 !important;
}
</style>

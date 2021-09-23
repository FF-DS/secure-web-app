<template>
  <v-card :elevation="4" class="mx-4">
    <div class="">
      <ListContainer v-if="getViewOption == 1" />
    </div>
    <div class="">
      <TableContainer v-if="getViewOption == 0" />
    </div>
  </v-card>
</template>

<script>
import ListContainer from "@/components/common/ListContainer";
import TableContainer from "@/components/common/TableContainer";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    ListContainer,
    TableContainer,
  },
  data() {
    return {
      tab: null,
    };
  },
  methods: {
    ...mapActions(["changeTab"]),

    change(TabName) {
      if (TabName != this.tab) {
        this.tab = TabName;
        this.changeTab(TabName);
      }
    },
  },
  computed: {
    ...mapGetters(["getViewOption", "getCompliantData"]),
  },
};
</script>

<style scoped>
.display-tab {
  font-size: 10px !important;
  font-weight: 400 !important;
}
</style>

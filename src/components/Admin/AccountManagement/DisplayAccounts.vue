<template>
  <v-card :elevation="4" class="ml-2" style="margin-right: 50px !important">
    <v-container fluid :class="getViewOption == 2 ? 'ma-0 pa-0' : ''">
      <TableContainer v-if="getViewOption == 0" />
    </v-container>
  </v-card>
</template>

<script>
import TableContainer from "@/components/Admin/AccountManagement/AccountsTableContainer";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    TableContainer,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions([""]),
  },
  computed: {
    ...mapGetters(["getViewOption"]),
  },
};
</script>

<style scoped>
.display-tab {
  font-size: 10px !important;
  font-weight: 400 !important;
}
</style>

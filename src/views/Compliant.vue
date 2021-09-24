<template>
  <v-container fluid class="my-5">
    <!-- FOR CURD OPERATIONS  Add Button -->
    <AddOperations v-if="getLoggedInState && getUserType == 'Basic'" />
    <!-- FOR CURD OPERATIONS-->
    <v-layout row>
      <v-flex xs10 mx-auto>
        <DisplayTab />
      </v-flex>
    </v-layout>

    <v-snackbar v-model="snackbar">
      {{ getSnakBarMessage.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import DisplayTab from "@/components/Public/DisplayTab";
import AddOperations from "@/components/User/AddOperation";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    DisplayTab,
    AddOperations,
  },
  data: () => ({
    snackbar: false,
  }),
  computed: {
    ...mapGetters([
      "getViewOption",
      "getLoggedInState",
      "getUserType",
      "getUserType",
      "getSnakBarMessage",
    ]),
    userServicePage() {
      return this.$route.name == "my-service";
    },
  },
  methods: {
    ...mapActions(["populateFirstPage", "getCSRFtoken"]),
  },
  created() {
    this.populateFirstPage();
    this.getCSRFtoken();

    this.unwatch = this.$store.watch(
      (state, getters) => getters.getSnakBarMessage,
      (newValue, oldVal) => {
        oldVal;
        this.snackbar = true;
      }
    );
  },
};
</script>

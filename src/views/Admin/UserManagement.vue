<template>
  <v-container fluid class="my-5">
    <v-layout row>
      <v-flex xs10 class="mx-auto">
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
import DisplayTab from "@/components/Admin/AccountManagement/DisplayAccounts";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    DisplayTab,
  },
  data: () => ({
    snackbar: false,
  }),
  computed: {
    ...mapGetters(["getSnakBarMessage"]),
  },
  methods: {
    ...mapActions(["searchAccounts", "getCSRFtoken"]),
  },
  created() {
    this.getCSRFtoken();

    const searchQueries = {
      query: true,
      queries: {
        size: 12,
      },
    };

    this.searchAccounts(searchQueries);

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

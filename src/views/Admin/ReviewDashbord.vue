<template>
  <v-container fluid class="my-5">
    <v-layout row>
      <v-flex xs12 sm4>
        <div style="margin-left: 30px !important">
          <UserProfile />
        </div>
      </v-flex>
      <v-flex xs12 sm8>
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
import UserProfile from "@/components/Admin/UserProfile";
import DisplayTab from "@/components/Public/DisplayTab";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    UserProfile,
    DisplayTab,
  },
  data: () => ({
    snackbar: false,
  }),
  computed: {
    ...mapGetters(["getLoggedInState", "getUserType", "getSnakBarMessage"]),
    adminServicePage() {
      return this.$route.name == "admin-service";
    },
  },
  methods: {
    ...mapActions(["usersReviewRequests", "populateFirstPage"]),
  },
  created() {
    this.populateFirstPage();

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

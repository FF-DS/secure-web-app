<template>
  <div>
    <v-card class="grey lighten-4" :elevation="4">
      <v-card-title class="font-weight-black vuetify-main-components">
        <v-icon class="text--secondary mr-2">mdi-account-circle</v-icon> User
        Profile
      </v-card-title>
    </v-card>

    <v-card class="mt-2 pa-5 px-0" :elevation="4">
      <v-row class="mb-1 px-5 mr-1">
        <v-col cols="12" sm="10">
          <div class="profile-card-sub-title">
            <v-icon class="mb-1" small>mdi-account</v-icon>
            {{
              userObject.name
                ? userObject.name.split("/%/")[0] +
                  " " +
                  userObject.name.split("/%/")[1]
                : "Not available"
            }}
          </div>
          <div class="profile-card-data mt-1 mb-3 ml-5 text--secondary">
            {{ userObject.verified ? "Verified" : "Not verified" }}
            <v-icon v-if="userObject.verified" color="green" small
              >mdi-check</v-icon
            >
          </div>
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12" sm="2">
          <v-avatar size="50" class="">
            <v-img
              :src="userObject.avatar ? userObject.avatar : '/res/user_pic.png'"
            ></v-img>
          </v-avatar>
        </v-col>
      </v-row>
      <v-row class="my-0 py-0 px-5 mx-2">
        <v-col cols="12" sm="6" class="my-0 py-0">
          <v-icon small>mdi-email</v-icon>
          <span class="profile-card-data ml-1">
            Email
            <div class="ml-5 inner-val  text--secondary">
              {{ userObject.email ? userObject.email : "Not available" }}
            </div>
          </span>
        </v-col>
        <v-col cols="12" sm="6" class="my-0 py-0">
          <v-icon class="" small>mdi-cellphone-android</v-icon>
          <span class="profile-card-data ml-1">
            Phone
            <div class="ml-5 inner-val text--secondary">
              {{
                userObject.phone_number
                  ? userObject.phone_number
                  : "Not available"
              }}
            </div>
          </span>
        </v-col>
      </v-row>
      <v-row class="my-0 py-0 px-5 mx-2 mt-3">
        <v-col cols="12" sm="6" class="my-0 py-0">
          <v-icon small>mdi-gender-male-female</v-icon>
          <span class="profile-card-data ml-1">
            Gender
            <div class="ml-5 inner-val text--secondary">
              {{ userObject.sex ? userObject.sex : "Not available" }}
            </div>
          </span>
        </v-col>
        <v-col cols="12" sm="6" class="my-0 py-0">
          <v-icon class="" small>mdi-account-convert</v-icon>
          <span class="profile-card-data ml-1">
            User Type
            <div class="ml-5 inner-val text--secondary">
              {{ userObject.role ? userObject.role : "Not available" }}
            </div>
          </span>
        </v-col>
      </v-row>
      <v-row class="my-0 py-0 mb-5 px-5 mx-2 mt-3">
        <v-col cols="12" sm="6" class="my-0 py-0">
          <v-icon class="" small>mdi-crosshairs-gps</v-icon>
          <span class="profile-card-data ml-1">
            Address
            <div class="ml-5 inner-val text--secondary">
              {{ userObject.address ? userObject.address : "Not available" }}
            </div>
          </span>
        </v-col>
        <v-col cols="12" sm="6" class="my-0 py-0">
          <v-icon small>mdi-calendar</v-icon>
          <span class="profile-card-data ml-1">
            Created date
            <div class="ml-5 inner-val text--secondary">
              {{
                userObject.created_at
                  ? new Date(userObject.created_at).toLocaleDateString()
                  : "Not available"
              }}
            </div>
          </span>
        </v-col>
      </v-row>
      <v-divider class="mt-5 ml-5 pl-5"></v-divider>
    </v-card>

    <v-card class="mt-2 grey lighten-4" :elevation="4" :loading="loadingForm">
      <v-card-title class="font-weight-black vuetify-main-components">
        <v-icon class="text--secondary mr-2">mdi-view-list</v-icon>
        Other Complaints by user
      </v-card-title>
    </v-card>

    <v-card
      class="mt-2 pa-5"
      :elevation="4"
      :max-height="getViewOption == 0 ? 396 : 402"
    >
      <v-container fluid class="ma-0 pa-0">
        <div
          v-if="getPublishedUserCompliants.length == 0"
          class="text-center profile-card-data"
        >
          No Compliant is selected. select a row to show data.
        </div>
        <v-virtual-scroll
          :bench="benched"
          :items="getPublishedUserCompliants"
          :height="365"
          item-height="64"
          class="ma-0 pa-0"
          placeholder="empty"
        >
          <template v-slot:default="{ item }" class="ma-0 pa-0">
            <v-list-item :key="item._id">
              <v-list-item-action>
                <v-icon small> mdi-view-list </v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title class="profile-card-data">
                  {{ item.title ? item.title : item.name }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <CompliantDetailCard :compliantData="item" />
              </v-list-item-action>
            </v-list-item>

            <v-divider inset></v-divider>
          </template>
        </v-virtual-scroll>
      </v-container>
    </v-card>
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
      benched: 0,
      userObject: {},
      loadingForm: false,
      items: [],
    };
  },
  computed: {
    ...mapGetters(["getTab", "getPublishedUserCompliants", "getViewOption"]),
    adminServicePage() {
      return this.$route.name == "admin-service";
    },
    getData() {
      return this.getPublishedUserCompliants;
    },
  },
  methods: {
    ...mapActions(["publishedUserCompliants"]),
  },
  created() {
    this.unwatch = this.$store.watch(
      (state, getters) => getters.getSelectedObject,
      (newValue, oldVal) => {
        oldVal;
        this.loadingForm = true;
        this.userObject = newValue.creator_user;
        let searchQueries = {
          query: true,
          queries: { user_id: this.userObject._id },
        };

        this.publishedUserCompliants(searchQueries);
      }
    );

    this.unwatch = this.$store.watch(
      (state, getters) => getters.getPublishedUserCompliants,
      (newValue, oldVal) => {
        newValue;
        oldVal;
        this.loadingForm = false;
      }
    );
  },
  props: ["userData"],
};
</script>

<style scoped>
.profile-card-chip {
  font-size: 9px !important;
  font-weight: 400 !important;
  line-height: 6px !important;
}
.profile-card-title {
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 24px !important;
}
.profile-card-sub-title {
  font-size: 15px !important;
}
.profile-card-data {
  font-size: 11px !important;
  font-weight: 400 !important;
}
.profile-icons {
  font-size: 17px !important;
  font-weight: 1000 !important;
}
.inner-val {
  font-weight: 300 !important;
}
</style>

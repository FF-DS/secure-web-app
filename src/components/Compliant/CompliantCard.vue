<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        class="mx-auto mb-5"
        :elevation="hover ? 12 : 4"
        :hover="true"
        @click="selectedValue"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-row row>
              <v-col cols="12" sm="5">
                <v-list-item-content>
                  <v-card-title class="headline mb-1 compliant-card-title">
                    {{ compliantData.title }}
                  </v-card-title>
                  <v-card-subtitle class="mb-1 compliant-card-sub-title">
                    {{ compliantData.updated_at }}
                  </v-card-subtitle>
                </v-list-item-content>

                <CompliantDetailCard :compliantData="compliantData" />
              </v-col>

              <v-divider vertical inset></v-divider>

              <v-col cols="12" sm="6" class="ml-5 pa-3">
                <v-list>
                  <v-list-item-group>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon class="compliant-icons">mdi-inbox</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="compliant-card-data">
                          User Name
                        </v-list-item-title>
                        <v-list-item-subtitle class="compliant-card-data">
                          {{
                            compliantData.creator_user.name.split("/%/")[0] +
                              " " +
                              compliantData.creator_user.name.split("/%/")[1]
                          }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon class="compliant-icons">mdi-send</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="compliant-card-data">
                          Email
                        </v-list-item-title>
                        <v-list-item-subtitle class="compliant-card-data">
                          {{ compliantData.creator_user.email }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import CompliantDetailCard from "@/components/Compliant/CompliantDetailCard";
import { mapActions } from "vuex";

export default {
  components: {
    CompliantDetailCard,
  },
  data() {
    return {
      show: false,
      model: 1,
      getUserTypeVal: function() {
        return this.getLoggedInState;
      },
    };
  },
  computed: {
    userServicePage() {
      return this.$route.name == "my-service";
    },
    adminServicePage() {
      return this.$route.name == "admin-service";
    },
  },
  methods: {
    ...mapActions(["setSelectedObject"]),
    getStatus(status) {
      if (status == "Approved")
        return { icon: "mdi-check", color: "green", message: "Approved" };
      else if (status == "Published_By_User")
        return {
          icon: "mdi-progress-check",
          color: "orange",
          message: "Published By User",
        };
      else if (status == "Under_Review")
        return { icon: "mdi-clock", color: "orange", message: "Under Review" };
      else if (status == "Rejected")
        return { icon: "mdi-alarm-check", color: "red", message: "Rejected" };
    },
    getDateStatus(date) {
      let currDate = new Date();
      if (new Date(date) > currDate)
        return { icon: "mdi-check", color: "green", message: "Currently open" };
      else
        return {
          icon: "mdi-alarm-check",
          color: "red",
          message: "Currently closed",
        };
    },
    selectedValue() {
      this.setSelectedObject(this.compliantData);
    },
  },
  props: ["compliantData"],
};
</script>

<style scoped>
.compliant-card-chip {
  font-size: 9px !important;
  font-weight: 400 !important;
  line-height: 6px !important;
}
.compliant-card-title {
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 24px !important;
}
.compliant-card-sub-title {
  font-size: 10px !important;
}
.compliant-card-data {
  font-size: 11px !important;
  font-weight: 400 !important;
}
.compliant-icons {
  font-size: 17px !important;
  font-weight: 400 !important;
}
</style>

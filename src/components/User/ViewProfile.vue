<template>
  <div class="text-center">
    <v-dialog
      v-model="getProfileDialogState"
      class="font-weight-medium"
      persistent
      max-width="700"
      max-height="500"
    >
      <v-card class="mx-auto" tile>
        <v-img height="100px" src="/logo/sm.png"></v-img>
        <v-col>
          <v-avatar size="100" style="position:absolute;top:10%">
            <v-img
              :src="getUser.avatar ? getUser.avatar : '/res/user_pic.png'"
            ></v-img>
          </v-avatar>
        </v-col>
        <v-container class="mt-5">
          <v-list>
            <v-row>
              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="title">
                      {{
                        getUser.name.split("/%/")[0] +
                          " " +
                          getUser.name.split("/%/")[1]
                      }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ getUser.verified ? "Verified" : "Not verified" }}
                      <v-icon v-if="getUser.verified" color="green" small
                        >mdi-check</v-icon
                      >
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon class="company-icons">mdi-account-convert</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="company-card-data">
                      Subscription Plan
                    </v-list-item-title>
                    <v-list-item-subtitle class="company-card-data">
                      {{ getUser.role }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon class="company-icons">mdi-account-box</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="company-card-data">
                      Sex
                    </v-list-item-title>
                    <v-list-item-subtitle class="company-card-data">
                      {{ getUser.sex ? getUser.sex : "Not available" }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon class="company-icons">mdi-email-variant</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="company-card-data">
                      Email
                    </v-list-item-title>
                    <v-list-item-subtitle class="company-card-data">
                      {{ getUser.email }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon class="company-icons">mdi-crosshairs-gps</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="company-card-data">
                      Address
                    </v-list-item-title>
                    <v-list-item-subtitle class="company-card-data">
                      {{ getUser.address ? getUser.address : "Not available" }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon class="company-icons">mdi-email-variant</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="company-card-data">
                      Phone number
                    </v-list-item-title>
                    <v-list-item-subtitle class="company-card-data">
                      {{
                        getUser.phone_number
                          ? getUser.phone_number
                          : "Not available"
                      }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>

            <v-row class="my-0">
              <v-col cols="2">
                <v-btn @click="openEditBox()" color="success" text x-small>
                  Edit Profile
                  <v-icon x-small color="success">mdi-account-edit</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="4" v-if="$vuetify.breakpoint.xsOnly"> </v-col>
              <v-col cols="2">
                <ChangePassword />
              </v-col>
            </v-row>
          </v-list>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="profileDialogView()" small>
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <EditProfile />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EditProfile from "@/components/User/EditProfile";
import ChangePassword from "@/components/User/ChangePassword";

export default {
  components: {
    ChangePassword,
    EditProfile,
  },
  computed: {
    ...mapGetters(["getProfileDialogState", "getUser"]),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["setProfileDialogState", "setProfileEditDialogState"]),
    profileDialogView() {
      this.setProfileDialogState(!this.getProfileDialogState);
    },
    openEditBox() {
      this.setProfileDialogState(false);
      this.setProfileEditDialogState(true);
    },
  },
};
</script>

<style scoped>
.company-card-title {
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 24px !important;
}
.company-card-sub-title {
  font-size: 10px !important;
}
.company-card-data {
  font-size: 14px !important;
  font-weight: 400 !important;
}
.company-icons {
  font-size: 17px !important;
  font-weight: 400 !important;
}
</style>

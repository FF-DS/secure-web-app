<template>
  <div>
    <v-app-bar app>
      <v-icon
        v-if="getLoggedInState"
        class="mr-5"
        @click="handleSideBarChange()"
      >
        {{ getSideBarBurgerState ? "mdi-close" : "mdi-menu" }}
      </v-icon>
      <v-img
        v-else
        max-width="35px"
        class="mr-2"
        src="/logo/tendermap.png"
      ></v-img>

      <v-toolbar-title class="vuetify-nav-component">TenderMap</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <!--- dropdown menu-->
      <v-menu offset-y v-if="getLoggedInState">
        <template v-slot:activator="{ on }">
          <div v-on="on" style="width:60px">
            <Profile :closeProfile="true" />
          </div>
        </template>
        <v-card>
          <v-list flat>
            <v-list-item-group active-class="grey lighten-5">
              <v-list-item
                link
                v-for="(item, i) in profileDropDown"
                :key="i"
                class="dropdown-card-group grey lighten-5 mb-1 py-0"
                @click="execute(item.text)"
              >
                <v-list-item-icon>
                  <v-icon
                    class="dropdown-icons ma-0 pa-0 pr-4"
                    v-text="item.icon"
                  ></v-icon>
                  <v-list-item-title
                    class="dropdown-card-data ma-0 pa-0 "
                    v-text="item.text"
                  ></v-list-item-title>
                </v-list-item-icon>

                <v-list-item-content> </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
      <!---END-->

      <RegisterForm v-if="!getLoggedInState" />

      <v-divider vertical inset></v-divider>

      <v-btn text x-small class="ml-2 py-5">
        <v-icon small class="mr-2">mdi-information-outline</v-icon>
        <span v-if="!$vuetify.breakpoint.xsOnly"> About </span>
      </v-btn>
    </v-app-bar>

    <SideBar v-if="getLoggedInState" />
    <ProfileView v-if="getLoggedInState" />
  </div>
</template>

<script>
import RegisterForm from "@/components/Public/CreateAccount";
import ProfileView from "@/components/User/ViewProfile";
import Profile from "@/components/User/Profile";
import SideBar from "@/layouts/TheSideBar";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    RegisterForm,
    SideBar,
    ProfileView,
    Profile,
  },
  data() {
    return {
      profile: true,
      profileDropDown: [
        { text: "Profile", icon: "mdi-account-circle" },
        { text: "Logout", icon: "mdi-logout" },
      ],
    };
  },
  computed: {
    ...mapGetters([
      "getSideBarBurgerState",
      "getSideBarState",
      "getLoggedInState",
      "getProfileDialogState",
    ]),
  },
  methods: {
    ...mapActions([
      "setSideBarState",
      "setSideBarBurgerState",
      "logoutUser",
      "setProfileDialogState",
    ]),
    handleSideBarChange() {
      this.setSideBarState(!this.getSideBarBurgerState);
    },
    execute(req) {
      if (req == "Logout") {
        this.logoutUser().then(() => {
          this.$router.push("home");
          this.$router.go();
        });
      } else if (req == "Notification") {
        this.setNotificationDialogState(true);
      } else if (req == "Profile") {
        this.setProfileDialogState(!this.getProfileDialogState);
      }
    },
  },
};
</script>

<style>
.vuetify-nav-component {
  font-size: 15px;
  font-weight: 300;
  line-height: 20px;
}

.dropdown-icons {
  font-size: 17px !important;
  font-weight: 400 !important;
}

.dropdown-card-data {
  font-size: 11px !important;
  font-weight: 400 !important;
}

.dropdown-card-group {
  /* border-bottom: 0.3px solid !important; */
}
</style>

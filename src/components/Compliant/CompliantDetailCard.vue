<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      class="font-weight-medium"
      max-width="800"
      max-height="800"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-card-actions>
          <v-btn
            text
            color="teal accent-4"
            @click="reveal = true"
            v-bind="attrs"
            v-on="on"
            class="compliant-card-data"
          >
            Details
          </v-btn>
        </v-card-actions>
      </template>

      <v-card class="compliant-dialog-card" rounded="false">
        <v-card-title class="headline grey lighten-2 compliant-card-title">
          <span v-if="userServicePage" class="ml-auto text--secondary">
            <v-icon>mdi-account-circle</v-icon> Compliant Informations</span
          >
          <span v-else>Compliant Informations</span>
          <v-spacer></v-spacer>
          <CompliantEditDialog
            v-if="viewEditDialog && getUserTypeVal == 'Basic'"
            :compliantData="compliantData"
            @close_dialog="close_dialog"
          />
          <v-icon color="gray" class="ml-3" @click="dialog = false">
            mdi-close</v-icon
          >
        </v-card-title>

        <v-container>
          <v-row class="text-xs-center">
            <v-col cols="12" sm="8">
              <v-list>
                <v-list-item-group>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon class="compliant-icons">mdi-inbox</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="compliant-card-data">
                        Compliant Title
                      </v-list-item-title>
                      <v-list-item-subtitle class="compliant-card-data">
                        {{ compliantData.title }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
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
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list>
                <v-list-item-group>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon class="compliant-icons">mdi-star</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="compliant-card-data">
                        User Email
                      </v-list-item-title>
                      <v-list-item-subtitle class="compliant-card-data">
                        {{ compliantData.creator_user.email }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon class="compliant-icons">mdi-email-open</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="compliant-card-data">
                        Date
                      </v-list-item-title>
                      <v-list-item-subtitle class="compliant-card-data">
                        {{ compliantData.updated_at }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col>
              <v-card-title class="compliant-card-title">
                Details
              </v-card-title>
              <v-card-text class="compliant-card-data">
                <div v-html="compliantData.details"></div>
              </v-card-text>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-card-title class="d-block compliant-card-title">
            Attachments
          </v-card-title>

          <v-list>
            <v-list-item-group>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  v-for="(file, index) in compliantData.file_links"
                  :key="index"
                >
                  <v-list-item v-if="file.link && file.name">
                    <v-list-item-icon>
                      <v-icon class="compliant-icons"> mdi-file-pdf</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <a :href="file.link" target="_blank">
                        <v-list-item-title class="compliant-card-data">
                          {{ file.name }}
                          <v-icon small class="mx-2">mdi-open-in-new</v-icon>
                        </v-list-item-title>
                      </a>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-list-item-group>
          </v-list>

          <v-divider></v-divider>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
            class="compliant-card-data"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CompliantEditDialog from "@/components/Compliant/CompliantEditDialog";
import { mapGetters } from "vuex";

export default {
  components: {
    CompliantEditDialog,
  },

  computed: {
    ...mapGetters(["getLoggedInState", "getUser", "getUserType"]),
    userServicePage() {
      return this.$route.name == "my-service";
    },
    viewEditDialog() {
      return (
        !this.$vuetify.breakpoint.xsOnly && this.getLoggedInState
        // && (this.getUser.role == "Admin")
      );
    },
  },

  data() {
    return {
      dialog: false,
      getUserTypeVal: function() {
        return this.getLoggedInState;
      },
    };
  },
  methods: {
    close_dialog() {
      this.dialog = false;
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
.compliant-dialog-card {
  border-radius: 0px !important;
}
</style>

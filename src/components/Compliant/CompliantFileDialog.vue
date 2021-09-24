<template>
  <v-row justify="center">
    <v-dialog v-model="deleteDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="text-h5">
          Do You want to delete this File?
        </v-card-title>
        <v-card-text
          >Once you have agreed. the change will be permanent.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteDialog = false">
            Disagree
          </v-btn>
          <v-btn color="red darken-1" text @click="deleteFile()">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="getCompliantFileDialogState"
      persistent
      max-width="600px"
    >
      <v-card :loading="loadingForm">
        <v-card-title>
          <span class="text-h5"
            >Edit Attachments <v-icon>mdi-attachment</v-icon>
          </span>
        </v-card-title>

        <v-container fluid>
          <v-layout row class="ml-5 pa-5">
            <span
              v-if="getCompliantError.type == 'compliantFileSuccess'"
              class="success-message"
            >
              File changes saved successfully.
            </span>
            <span
              v-if="
                getCompliantError &&
                  getCompliantError.type == 'compliantFileError'
              "
            >
              Unable to save file changes.
            </span>
          </v-layout>
        </v-container>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card outlined tile class="mx-auto" min-height="150">
                  <span
                    v-for="(file, index) in compliantData.file_links"
                    v-bind:key="index"
                  >
                    <v-chip
                      v-if="file.link && file.name"
                      class="ma-2"
                      close
                      color="gray"
                      label
                      @click:close="
                        deleteDialog = true;
                        currenFile = file;
                      "
                      small
                    >
                      <a :href="file.link" target="_blank" class="link_format">
                        {{ file.name.slice(0, 30) }}
                        {{ file.name.length > 30 ? "..." : "" }}
                        <v-icon small class="mx-2">mdi-open-in-new</v-icon>
                      </a>
                      <v-divider class="ml-2" vertical></v-divider>
                    </v-chip>
                  </span>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  placeholder="Upload your documents"
                  label="File input"
                  prepend-icon="mdi-paperclip"
                  accept="application/pdf"
                  @change="addFile"
                >
                </v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDialog()" small>
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["getCompliantFileDialogState", "getCompliantError"]),
    userServicePage() {
      return this.$route.name == "my-service";
    },
  },
  data: () => ({
    loadingForm: false,
    deleteDialog: false,
    currenFile: null,
  }),
  methods: {
    ...mapActions([
      "setCompliantFileDialogState",
      "addCompliantFile",
      "updateCompliantFile",
      "setSnakBarMessage",
    ]),
    addFile(file) {
      this.loadingForm = true;
      let formData = new FormData();
      formData.append("file", file);
      formData.append("_csrf", localStorage.getItem("csrfToken"));

      let compliantParams = {
        param: true,
        params: {
          compliant_id: this.compliantData._id,
        },
      };

      let compliantDataFile = { file: formData, params: compliantParams };
      if (this.userServicePage) {
        compliantDataFile.myService = true;
      }

      this.addCompliantFile(compliantDataFile);
    },
    deleteFile() {
      this.loadingForm = true;

      let compliantParams = {
        param: true,
        params: {
          compliant_id: this.compliantData._id,
        },
      };

      let compliantFiles = this.compliantData.file_links;
      compliantFiles = compliantFiles.filter((file) => file != this.currenFile);

      let compliantDataFile = { params: compliantParams, file: compliantFiles };
      if (this.userServicePage) {
        compliantDataFile.myService = true;
      }

      this.updateCompliantFile(compliantDataFile);
    },
    closeDialog() {
      this.setCompliantFileDialogState(false);
    },
  },
  created() {
    this.unwatch = this.$store.watch(
      (state, getters) => getters.getCompliantError,
      (newValue, oldVal) => {
        oldVal;
        this.loadingForm = false;
        this.deleteDialog = false;

        if (newValue.type == "compliantFileSuccess") {
          this.compliantData.file_links = this.compliantData.file_links.filter(
            (file) => file != this.currenFile
          );
          this.currenFile = null;

          if (this.$route.name == "my-service");
          let message =
            "Your file changes will be under review. we will respond as soon as possible! :)";
          this.setSnakBarMessage({
            message: message,
            random: new Date().getTime(),
          });
        }

        if (newValue.file) this.compliantData.file_links.push(newValue.file);
      }
    );
  },

  props: ["compliantData"],
};
</script>

<style scoped>
.profile-card-data {
  font-size: 14px !important;
  font-weight: 400 !important;
}
.error-message {
  font-size: 11px !important;
  font-weight: 400 !important;
  color: red !important;
}
.success-message {
  font-size: 11px !important;
  font-weight: 400 !important;
  color: green !important;
}
.link_format {
  color: black !important;
  text-decoration: none !important;
}
.error-message {
  font-size: 11px !important;
  font-weight: 400 !important;
  color: red !important;
}
.success-message {
  font-size: 11px !important;
  font-weight: 400 !important;
  color: green !important;
}
</style>

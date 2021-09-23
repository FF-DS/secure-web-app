<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      class="font-weight-medium"
      :max-width="length"
      max-height="800"
      persistent
    >
      <template v-slot:activator="{ on, attrs }" class="mx-0 px-0">
        <v-card-actions class="mx-0 px-0">
          <CompliantFileDialog :compliantData="compliantData" />
          <v-icon
            small
            class="mr-3"
            color="teal accent-4"
            @click="openFileDialog()"
            >mdi-attachment</v-icon
          >
          <v-icon
            small
            class="mr-3"
            color="teal accent-4"
            @click="
              editDialog = true;
              close_fab();
              length = '1000px';
            "
            v-bind="attrs"
            v-on="on"
            >mdi-grease-pencil</v-icon
          >
          <v-icon
            small
            class="mx-0 px-0"
            color="red"
            @click="
              deleteDialog = true;
              length = '460px';
            "
            v-bind="attrs"
            v-on="on"
            >mdi-delete</v-icon
          >
        </v-card-actions>
      </template>

      <v-card v-if="deleteDialog">
        <v-card-title class="headline text-center">
          Do you want to delete this compliant?
        </v-card-title>
        <v-card-text class=""
          >length Once you have agreed to delete this compliant it will be
          permanently removed from the system.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="
              deleteDialog = false;
              dialog = false;
            "
          >
            Cancel
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="delete_compliant()"
            :loading="loadingForm"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="compliant-dialog-card" rounded="false" v-if="editDialog">
        <v-card-title class="headline grey lighten-2 compliant-card-title">
          Edit Compliant informations
          <span v-if="userServicePage" class="ml-auto text--secondary">
            My Service <v-icon>mdi-account-circle</v-icon></span
          >
          <v-icon
            color="gray"
            class="ml-5"
            :class="!userServicePage ? 'ml-auto' : ''"
            @click="
              editDialog = false;
              dialog = false;
              open_fab();
            "
          >
            mdi-close</v-icon
          >
        </v-card-title>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid>
            <v-layout row class="ml-5 pa-5">
              <span
                v-if="
                  getCompliantError &&
                    getCompliantError.type == 'compliantEditError'
                "
              >
                <span
                  v-for="(key, index) in getCompliantError"
                  v-bind:key="index"
                >
                  <li class="error-message" v-if="index != 'type'">
                    {{ key }}
                  </li>
                </span>
              </span>
            </v-layout>
          </v-container>
          <v-container>
            <div class="text-xs-center">
              <v-row class="ma-3">
                <v-col cols="12"> Compliant Identification</v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="title"
                    :counter="10"
                    :rules="titleRules"
                    label="Title"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="ma-3">
                <v-col cols="12"> Details</v-col>
                <v-col cols="12">
                  <vue-editor
                    useCustomImageHandler
                    @imageAdded="handleImageAdded"
                    v-model="details"
                    :rules="detailsRules"
                  ></vue-editor>
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-form>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="
              getCompliantError.type == 'compliantEditError' ? 'red' : 'success'
            "
            text
            @click="validate()"
            class="compliant-card-data"
            :loading="loadingForm"
          >
            Save
            <v-icon
              small
              color="red"
              v-if="getCompliantError.type == 'compliantEditError'"
              >mdi-exclamation</v-icon
            >
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="
              editDialog = false;
              dialog = false;
              open_fab();
            "
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
import { VueEditor } from "vue2-editor";
import { mapGetters, mapActions } from "vuex";
import CompliantFileDialog from "@/components/Compliant/CompliantFileDialog";

export default {
  components: {
    VueEditor,
    CompliantFileDialog,
  },
  computed: {
    ...mapGetters(["getCompliantEditDialogState", "getCompliantError"]),
    userServicePage() {
      return this.$route.name == "my-service";
    },
    adminServicePage() {
      return this.$route.name == "admin-service";
    },
  },
  data: () => ({
    deleteDialog: false,
    editDialog: false,
    dialog: false,
    valid: true,
    title: "",
    titleRules: [
      (v) => !!v || "Title is required",
      (v) => (v && v.length >= 3) || "Title must be greater than 3 characters",
    ],

    details: "<h5>Compliant Details will come here...</h5>",
    detailsRules: [(v) => !!v || "Detail is required"],
    length: "1000px",
    loadingForm: false,
  }),

  methods: {
    ...mapActions([
      "setFabVisibility",
      "setCompliantEditDialogState",
      "setCompliantErrorData",
      "updateCompliant",
      "deleteCompliant",
      "setCompliantFileDialogState",
      "addCompliantFile",
      "setSnakBarMessage",
    ]),
    validate() {
      if (this.$refs.form.validate()) {
        this.loadingForm = true;

        let compliant = {
          title: this.title,
          details: this.details,
        };

        let compliantParams = {
          param: true,
          params: {
            compliant_id: this.compliantData._id,
          },
        };

        let compliantObject = {
          compliantParams: compliantParams,
          compliantData: compliant,
        };

        this.updateCompliant(compliantObject);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    close_fab() {
      this.setFabVisibility(false);
    },
    open_fab() {
      this.setFabVisibility(true);
    },
    updateOpeningDateEnd(date) {
      this.bidOpeningDate = date || this.bidOpeningDate;
    },
    updateClosingDateEnd(date) {
      this.bidClosingDate = date || this.bidClosingDate;
    },
    delete_compliant() {
      this.loadingForm = true;
      let compliantParams = {
        param: true,
        params: {
          compliant_id: this.compliantData._id,
        },
      };
      this.deleteCompliant(compliantParams);
    },
    openFileDialog() {
      this.setCompliantFileDialogState(true);
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      this.loadingForm = true;
      console.log("here");

      let formData = new FormData();
      formData.append("file", file);

      let compliantParams = {
        param: true,
        params: {
          compliant_id: this.compliantData._id,
        },
      };

      this.addCompliantFile({ file: formData, params: compliantParams }).then(
        (fileData) => {
          Editor.insertEmbed(cursorLocation, "image", fileData.link);
          resetUploader();
        }
      );
    },
  },
  created() {
    this.title = this.compliantData.title;
    this.details = this.compliantData.details;

    if (this.compliantData.award_id)
      this.award = this.compliantData.award_id.title;

    this.unwatch = this.$store.watch(
      (state, getters) => getters.getCompliantError,
      (newValue, oldVal) => {
        oldVal;
        this.loadingForm = false;

        if (newValue.type == "compliantDeleteSuccess") {
          this.deleteDialog = false;
          this.dialog = false;
          this.open_fab();
          this.$emit("close_dialog", false);
          let message =
            this.$route.name != "my-service"
              ? "Compliant deleted successfully."
              : "Your delete operation will be under review. we will respond as soon as possible! :)";
          this.setSnakBarMessage({
            message: message,
            random: new Date().getTime(),
          });
        }

        if (newValue.type == "compliantEditSuccess") {
          this.open_fab();
          let message =
            this.$route.name != "my-service"
              ? "Compliant changes saved successfully."
              : "Your Compliant will be under review. we will respond as soon as possible! :)";
          this.setSnakBarMessage({
            message: message,
            random: new Date().getTime(),
          });
        }
      }
    );
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

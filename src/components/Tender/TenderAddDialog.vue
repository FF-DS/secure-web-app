<template>
  <div class="text-center">
    <v-dialog
      v-model="getCompliantEditDialogState"
      class="font-weight-medium"
      :max-width="length"
      max-height="800"
      persistent
    >
      <v-card
        class="compliant-dialog-card"
        rounded="false"
        :loading="loadingForm"
      >
        <v-card-title class="headline grey lighten-2 compliant-card-title">
          Add Compliant
          <span v-if="userServicePage" class="ml-auto text--secondary">
            My Service <v-icon>mdi-account-circle</v-icon></span
          >
          <v-icon
            color="gray"
            :class="!userServicePage ? 'ml-auto' : ''"
            class="ml-5"
            @click="compliantAddState()"
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
                    getCompliantError.type == 'compliantAddError'
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
            color="orange"
            text
            @click="reset()"
            class="compliant-card-data"
          >
            Clear
          </v-btn>
          <v-btn
            color="success"
            text
            @click="validate()"
            class="compliant-card-data"
            :loading="loadingForm"
          >
            Save
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="compliantAddState()"
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

export default {
  computed: {
    ...mapGetters([
      "getCompliantEditDialogState",
      "getCompliantError",
      "getCompliantSector",
      "getCompliantType",
      "getCompliantCountries",
      "getCompanyNames",
      "getAwardTitle",
      "getAwardTitlesDict",
      "getCompliantProcurments",
    ]),
    userServicePage() {
      return this.$route.name == "my-service";
    },
  },
  components: {
    VueEditor,
  },
  data: () => ({
    dialog: false,
    valid: true,
    title: "",
    titleRules: [
      (v) => !!v || "Title is required",
      (v) => (v && v.length >= 3) || "Title must be greater than 3 characters",
    ],
    compliantId: "",
    compliantIdRules: [
      (v) =>
        (v && v.length >= 3) ||
        "Compliant Id must be greater than 3 characters",
    ],
    modOfProcurment: "",
    modOfProcurmentRules: [(v) => !!v || "Mode Of Procurment is required"],
    bidOpeningDate: "",
    bidOpeningDateRules: [(v) => !!v || "Bid opening date is required"],
    bidClosingDate: "",
    bidClosingDateRules: [(v) => !!v || "Bid closing date is required"],
    country: "",
    countryRules: [(v) => !!v || "Country is required"],
    award: "",
    awardRules: [],
    sector: "",
    sectorRules: [(v) => !!v || "Sector is required"],
    type: "",
    typeRules: [(v) => !!v || "Type is required"],
    details: "<h5>Compliant Details will come here...</h5>",
    detailsRules: [(v) => !!v || "Detail is required"],
    company: "",
    companyRules: [(v) => !!v || "Company is required"],
    items: ["XADA", "CAD", "FGA", "PLOA"],
    length: "1000px",
    loadingForm: false,
  }),

  methods: {
    ...mapActions([
      "setCompliantEditDialogState",
      "setCompliantErrorData",
      "addCompliant",
      "setSnakBarMessage",
    ]),
    validate() {
      if (this.$refs.form.validate()) {
        this.loadingForm = true;

        let compliant = {
          title: this.title,
          issued_date: this.bidOpeningDate,
          closing_date: this.bidClosingDate,
          sector: this.sector,
          compliant_id: this.compliantId,
          procurement_type: this.type,
          mode_of_procurement: this.modOfProcurment,
          details: this.details,
          country: this.country,
          company: this.company,
        };

        if (this.userServicePage) {
          compliant.myService = true;
        }

        if (this.award)
          compliant.award_id = this.getAwardTitlesDict[this.award];

        this.addCompliant(compliant);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    compliantAddState() {
      this.setCompliantEditDialogState(false);
    },
    updateOpeningDateEnd(date) {
      this.bidOpeningDate = date;
    },
    updateClosingDateEnd(date) {
      this.bidClosingDate = date;
    },
  },
  created() {
    this.unwatch = this.$store.watch(
      (state, getters) => getters.getCompliantError,
      (newValue, oldVal) => {
        oldVal;
        this.loadingForm = false;

        if (newValue.type == "compliantAddSuccess") {
          this.compliantAddState();
          let message =
            this.$route.name != "my-service"
              ? "Compliant added successfully."
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

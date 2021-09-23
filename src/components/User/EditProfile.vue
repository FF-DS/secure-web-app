<template>
  <div class="text-center">
    <v-dialog
      v-model="getProfileEditDialogState"
      class="font-weight-medium"
      persistent
      max-width="700"
      max-height="500"
    >
      <v-card class="mx-auto" tile :loading="loadingForm">
        <v-card-title>
          Update profile
          <v-icon medium color="success">mdi-account-edit</v-icon>
        </v-card-title>

        <v-container class="mt-5">
          <v-list>
            <v-form ref="editAccount" v-model="valid" lazy-validation>
              <v-row>
                <v-col class="ml-5 pa-5">
                  <span
                    v-if="getUserError.type == 'profileSuccess'"
                    class="success-message"
                  >
                    Profile updated successfully.
                  </span>
                  <span v-if="getUserError && getUserError.type == 'update'">
                    <span
                      v-for="(key, index) in getUserError"
                      v-bind:key="index"
                    >
                      <li class="error-message" v-if="index != 'type'">
                        {{ key }}
                      </li>
                    </span>
                  </span>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-list-item>
                    <v-list-item-content>
                      <v-row class="my-0">
                        <v-col cols="6">
                          <v-btn
                            color="white--text green lighten-3 ml-5 pl-5"
                            fab
                            class="text-none"
                            depressed
                            :loading="isSelecting"
                            @click="onButtonClick"
                          >
                            <v-img
                              width="100"
                              class="profile-img2"
                              :src="
                                getUser.avatar
                                  ? getUser.avatar
                                  : '/res/user_pic.png'
                              "
                            ></v-img>
                          </v-btn>
                          <input
                            ref="uploader"
                            class="d-none"
                            type="file"
                            accept="image/*"
                            @change="changePicture"
                          />
                        </v-col>
                        <v-col cols="12" sm="6" class="mt-2 pt-3">
                          <v-text-field
                            dense
                            v-model="verify"
                            maxlength="10"
                            label="Account State"
                            disabled
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            dense
                            v-model="firstName"
                            :rules="[rules.required]"
                            label="First Name"
                            maxlength="20"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            dense
                            v-model="lastName"
                            :rules="[rules.required]"
                            label="Last Name"
                            maxlength="20"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          v-if="getUserError.type == 'verifySuccess'"
                        >
                          <v-alert
                            class="success-message"
                            border="left"
                            color="green"
                            dense
                            dismissible
                            icon="mdi-check"
                            text
                            type="success"
                            >Account verification link is sent to your email.
                          </v-alert>
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="6" class="mt-7">
                  <v-list-item>
                    <v-list-item-content>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            v-model="phone_number"
                            label="Phone number"
                            maxlength="20"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            v-model="address"
                            label="Address"
                            maxlength="20"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <span class="profile-card-data mr-4 text--secondary">
                            Sex
                          </span>

                          <v-btn-toggle class="rounded-0" v-model="sex">
                            <v-btn
                              small
                              class="py-4"
                              @click="sex = 'Male'"
                              value="Male"
                            >
                              <v-icon class="mr-2" small
                                >mdi-gender-male</v-icon
                              >
                              Male
                            </v-btn>
                            <v-btn
                              small
                              class="py-4"
                              @click="sex = 'Female'"
                              value="Female"
                            >
                              <v-icon class="mr-2" small
                                >mdi-gender-female</v-icon
                              >
                              Female
                            </v-btn>
                          </v-btn-toggle>
                          <!-- <v-text-field dense v-model="sex"  :rules="[rules.required]" label="Sex" maxlength="20" required></v-text-field> -->
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-form>
          </v-list>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="profileEditDialogView()" small>
            Close
          </v-btn>
          <v-btn color="success ml-2" text small @click="validate">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["getProfileEditDialogState", "getUser", "getUserError"]),
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
    buttonText() {
      return this.selectedFile
        ? this.selectedFile.name
        : this.defaultButtonText;
    },
  },
  methods: {
    ...mapActions([
      "setProfileEditDialogState",
      "updateUser",
      "changeProfilePicture",
      "sendVerifyAccount",
    ]),
    validate() {
      if (this.$refs.editAccount.validate()) {
        let user = {
          name: this.firstName + "/%/" + this.lastName,
          email: this.email,
          address: this.address,
          sex: this.sex,
          phone_number: this.phone_number,
        };
        this.updateUser(user);
        this.loadingForm = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    profileEditDialogView() {
      this.setProfileEditDialogState(!this.getProfileEditDialogState);
    },
    changePicture(file) {
      file = file.target.files[0];

      let formData = new FormData();
      formData.append("file", file);

      this.changeProfilePicture(formData);
      this.loadingForm = true;
    },
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },
  },
  data: () => ({
    valid: true,
    loadingForm: false,
    firstName: "",
    lastName: "",
    address: "",
    phone_number: "",
    account_state: false,
    verifyState: false,
    sex: "",
    verify: "",
    show1: false,
    defaultButtonText: "Change profile picture",
    selectedFile: null,
    isSelecting: false,
    rules: {
      required: (value) => !!value || "Required.",
      profile: (value) =>
        value.endsWith("png") ||
        value.endsWith("jpg") ||
        value.endsWith("jpeg") ||
        value.endsWith("gif") ||
        "Image Format is not correct.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
  }),
  created() {
    this.unwatch = this.$store.watch(
      (state, getters) => getters.getUser,
      (newValue, oldVal) => {
        oldVal;
        if (newValue) {
          this.dialog = false;
        }
        this.loadingForm = false;
      }
    );
    this.unwatch = this.$store.watch(
      (state, getters) => getters.getUserError,
      (newValue, oldVal) => {
        oldVal;
        this.loadingForm = false;
        this.verifyState = false;
      }
    );

    const user = this.getUser;
    this.firstName = user.name.split("/%/")[0];
    this.lastName = user.name.split("/%/")[1];
    this.address = user.address;
    this.phone_number = user.phone_number;
    this.sex = user.sex;
    this.email = user.email;
    this.verify = user.verified ? "Verified" : "Not verified";
    this.account_state = user.verified;
  },
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
.v-icon--left {
  margin-right: 8px;
}
.profile-img {
  border-radius: 50%;
}
</style>

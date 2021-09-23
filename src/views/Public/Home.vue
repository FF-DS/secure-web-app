<template>
  <v-container fluid class="my-5">
    <v-layout row>
      <v-flex mx-5>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
        impedit ipsum? Excepturi doloribus dolore distinctio! Voluptas,
        adipisci, at molestiae veniam inventore saepe blanditiis necessitatibus
        beatae corporis perferendis optio consectetur aspernatur.
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
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data: () => ({
    snackbar: false,
  }),
  computed: {
    ...mapGetters(["getSnakBarMessage"]),
  },
  methods: {
    ...mapActions([""]),
  },
  created() {
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

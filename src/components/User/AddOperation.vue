<template>
  <div>
    <CompliantAddDialog />
    <span @click="add_event()" v-if="!$vuetify.breakpoint.xsOnly">
      <fab
        v-if="
          !(
            getCompliantEditDialogState ||
            getAwardAddDialogState ||
            getAddCompanyDialogState ||
            getSideBarState
          ) &&
            !$vuetify.breakpoint.xsOnly &&
            getLoggedInState &&
            getFabVisibility
        "
        ripple-show="true"
        icon-size="small"
      >
      </fab>
    </span>
  </div>
</template>

<script>
import CompliantAddDialog from "@/components/Compliant/CompliantAddDialog";

import { mapGetters, mapActions } from "vuex";
import fab from "vue-fab";

export default {
  components: {
    fab,
    CompliantAddDialog,
  },

  computed: {
    ...mapGetters([
      "getFabVisibility",
      "getSideBarState",
      "getTab",
      "getAddCompanyDialogState",
      "getCompliantEditDialogState",
      "getAwardAddDialogState",
      "getLoggedInState",
    ]),
  },
  methods: {
    ...mapActions([
      "setCompliantEditDialogState",
      "setAddCompanyDialogState",
      "setAwardAddDialogState",
    ]),
    add_event() {
      this.setCompliantEditDialogState(true);
    },
  },
};
</script>

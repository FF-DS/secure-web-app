<template>
  <v-app class="width:100%">
    <AppBar/>
    
    <v-main>
      <router-view class="width:100%"></router-view>
    </v-main>
    <AppFooter/>

  </v-app>
</template>

<script>

import AppBar from './layouts/TheAppBar';
import AppFooter from './layouts/TheAppFooter';

export default {
  name: 'App',

  components: {
    AppBar,
    AppFooter,
  },

  data: () => ({
    //
  }),
};
</script>


<style>
.vuetify-main-components{
  font-size: 13px !important;
  font-weight: 300 !important;
  line-height: 18px !important;
}

</style>
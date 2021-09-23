<template>
  <v-footer padless class="vuetify-nav-component">
    <v-card flat tile class=" lighten-1 text-center">
      <v-divider></v-divider>
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
          <v-icon size="20px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="pt-0 vuetify-nav-component">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
        Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
        accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a
        sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
        lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
        iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor
        vel ut orci. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus.
      </v-card-text>
      <v-card-text class="vuetify-nav-component">
        {{ new Date().getFullYear() }} — <strong>TenderMap</strong>
      </v-card-text>
    </v-card>
    <cookie-law theme="dark-lime">
      <div slot="message">
        This website uses cookies to ensure you get the best experience on our
        website <router-link to="privacy-policy">learn more</router-link>
      </div>
    </cookie-law>
  </v-footer>
</template>

<script>
import CookieLaw from "vue-cookie-law";
export default {
  components: { CookieLaw },
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>

<style>
.vuetify-nav-component {
  font-size: 11px;
  font-weight: 300;
  line-height: 15px;
}

.nav-icons {
  font-size: 17px !important;
  font-weight: 400 !important;
}
</style>

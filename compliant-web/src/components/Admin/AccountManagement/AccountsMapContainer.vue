<template>
  <v-container fluid class="ma-0 pa-0 mt-3">
    <v-row v-if="!$vuetify.breakpoint.smAndDown">
      <v-col cols="12" md="6" lg="4" class=" mt-0 switch-data">
          <v-btn-toggle
            x-small
            class="mb-3 mt-3 ml-5 pl-1 mr-2"
            
            v-model="currentViewOption"
            
          >
            <v-btn x-small class="pa-4 pt-4" value='Table' @click="changeViewStyle(0)" >
              <span class="hidden-sm-and-down">Table</span>
              <v-icon small right>
                mdi-table
              </v-icon>
            </v-btn>

            <v-btn x-small class="pa-4 pt-4" value='Map' @click="changeViewStyle(2)">
              <span class="hidden-sm-and-down">Map</span>
              <v-icon small right>
                mdi-map-marker
              </v-icon>
            </v-btn>
          </v-btn-toggle>
      </v-col>
    </v-row>
    <MglMap
      container="map-test"
      class="basemap ma-0 pa-0"
      :center.sync="center"
      :accessToken="accessToken"
      :mapStyle="mapStyle"
      :zoom="zoom"
      @load="onMapLoad"
    >
      <MglNavigationControl position="top-right" />
        <span v-for="(count, country) in getAccountCountryCount" :key="country">
          <MglMarker :coordinates="getLocation(country)"  v-if="getLocation(country)">
            <v-btn
              fab
              color="#7FFFD4"
              class="marker-style"
              slot="marker"
              x-small
              @click="changeView(country)"
            >
              {{ count }}
            </v-btn>
          </MglMarker>
        </span>
    </MglMap>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { MglMap, MglMarker, MglNavigationControl } from 'vue-mapbox';
import countriesDict from '@/assets/countriesDict';
import 'mapbox-gl/dist/mapbox-gl.css'; 

export default {
  name: "BaseMap",
  components:{
    MglMap,
    MglMarker,
    MglNavigationControl,
  },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoibWFyb2MxMjM0IiwiYSI6ImNrcXB0aDdhbTAwcDMydnBhaXh6anN6emIifQ.Nlci_EzYnANgKlCC2xh7BA',
      viewOption: false,
      currentViewOption: 'Map',
      mapStyle: 'mapbox://styles/maroc1234/ckqr28z317m2p18n9gd5h9hmr',
      center: [32, 49],
      // center: [38, 8],
      zoom: 4,
    };
  },
  computed: {
      ...mapGetters(["getAccountCountryCenter","getViewOption", "getTab", "getAccountCountryCount", "getAccountSearchParams", "getCompanyCountryCount","getAwardSearchParams", "getCompanySearchParams"]),
  },
  methods:{
    ...mapActions(["changeViewOption","searchAccounts", "setAccountDataValue", "searchCompanies", "setCompanyData"]),
    
    changeViewStyle(option) {
      this.currentViewOption = option;
      this.changeViewOption(option)
    },
    getLocation(country){
      if (!countriesDict[country])
        return false;
      return countriesDict[country].location;
    },
    changeView(country) {
        let params = this.getAccountSearchParams;
        params.queries.country = country;
        this.searchAccounts(params)
        this.setAccountDataValue([])
        this.changeViewOption(0)
    },
    onMapLoad({ map }) {
      map.on("zoomend", e => {
        let markers = document.getElementsByClassName('marker-style')
        for(let index in markers){
          if(markers[index].style){
            markers[index].style.width =  `${7*e.target.getZoom()}px`
            markers[index].style.height = `${7*e.target.getZoom()}px`
            markers[index].style.fontSize = `${3*e.target.getZoom()}px`
            // console.log(markers.length, markers[index].style.width)
          }

        }
        // console.log('Zoom end: ' + e.target.getZoom());
      });
    }
  },
  created() {
    this.center = this.getAccountCountryCenter
    this.unwatch = this.$store.watch(
      (state, getters) => getters.getAccountCountryCenter,
      (newValue, oldVal) => {
        oldVal;
        this.center = newValue;
    })
  }
};
</script>

<style lang="scss" scoped>
.basemap {
  width: 100%;
  height: 510px;
  margin: 0% !important;
  padding: 0% !important;
}
.switch-data{
  font-size: 5px !important;
  font-weight: 400 !important;
}
.marker {
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
.switch-data-pos{
  margin-top: 0rem !important;
  margin-right: 0.65rem !important;

}

.marker-style {
  // width: 120px;
}
</style>

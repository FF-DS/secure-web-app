<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4  text--secondary">
          {{ mapData.capital_city }}
        </div>
        <v-list-item-title class="text-h5 mb-1 mb-3">
          {{ mapData.country }}
        </v-list-item-title>
        <v-list-item-subtitle>from the search <b class="mx-1">{{ mapData.count }}</b> companies found.</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn text color="teal accent-4"  @click="changeView(mapData.country)" class="company-card-data ml-auto">
          Details
      </v-btn>  
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    props: ['mapData'],
    computed: {
        ...mapGetters(["getCompanySearchParams",]),
    },
    methods:{
      ...mapActions(["changeViewOption", "searchCompanies", "setCompanyData"]),
      
      changeView(country) {
        let params = this.getCompanySearchParams;
        params.queries.country = country;
        this.searchCompanies(params)
        this.setCompanyData([])
        this.changeViewOption(0)
      },
    }
}
</script>


<style scoped>

.company-card-chip{
  font-size: 9px !important;
  font-weight: 400 !important;
  line-height: 6px !important;
  color:black !important;
}
.company-card-title{
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 24px !important;
}
.company-card-sub-title{
  font-size: 10px !important;

}
.company-card-data{
  font-size: 11px !important;
  font-weight: 400 !important;
}
.company-icons{
  font-size: 17px !important;
  font-weight: 400 !important;

}
</style>


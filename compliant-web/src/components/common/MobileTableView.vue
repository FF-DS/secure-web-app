<template>
    <v-container fluid>
        <v-layout row>
            <v-flex>
                <div v-if="getTab == 'Tender'" :class="responsive_padding">
                    <TenderTable/>
                </div>
                <div v-if="getTab == 'Award'" :class="responsive_padding">
                    <AwardTable/>
                </div>
                <div v-if="getTab == 'Company'" :class="responsive_padding">
                    <CompanyTable/>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import TenderTable from '@/components/Tender/TenderTable'
import CompanyTable from '@/components/Company/CompanyTable'
import AwardTable from '@/components/Award/AwardTable'
import { mapGetters, mapActions } from "vuex";

export default {
    components:{
      TenderTable,
      CompanyTable,
      AwardTable,
    },
    data(){
        return {
            responsive_padding : 'mx-2',
            currentPage: 1,
            viewOption: false,
        }
    },
    computed: {
        ...mapGetters(["getTab","getAwardData","getCompanyData","getTenderData","getViewOption"]),
    },
    methods: {
        ...mapActions(["changeViewOption"]),
        handlePageChange(value) {
            this.currentPage = value;
        },
        changeViewStyle() {
            this.changeViewOption(!this.getViewOption)
        }
    },
    created() {
        this.viewOption = this.getViewOption;
    }
}
</script>


<style scoped>

.pagination-sec{
  transform: scale(0.7);
  margin: 0px !important;
}
.switch-data{
  transform: scale(0.8);
  font-size: 10px !important;
  font-weight: 400 !important;
}

</style>
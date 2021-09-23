<template>
    <div class="mx-0">
        <SearchTab />
        <fab
            v-if="!(getTenderEditDialogState || getAwardAddDialogState || getAddCompanyDialogState || getSideBarState) && getFabVisibility" 
            :position="position"
            :bg-color="bgColor"
            :actions="fabActions"
            ripple-show="true"
            main-icon="home"
            icon-size="small"
            @search="search"
            @view_option="view_option"
            @award="award"
            @company="company"
            @tender="tender"
            toggle-when-away="true"
            >
        </fab>
        <MobileListView v-if="getViewOption == 1"/>
        <MobileTableView  v-if="getViewOption == 0" />
        <div class="ma-0 map-style" v-if="getViewOption == 2" > <MapContainer/> </div>
    </div>
</template>


<script>
import SearchTab from '@/components/Public/SearchTab';
import fab from 'vue-fab'
import { mapActions, mapGetters } from "vuex";
import MobileListView from '@/components/common/MobileListView';
import MapContainer from '@/components/common/MapContainer';
import MobileTableView from '@/components/common/MobileTableView';

export default {
    components:{
      fab,
      MobileListView,
      MobileTableView,
      SearchTab,
      MapContainer,
    },
    data(){
      return {
            currentPage: 1, 
            responsive_padding : (this.$vuetify.breakpoint.xsOnly)? 'mx-1' : 'mx-2',
            viewOption: false,
            bgColor: 'darkgray',
            position: 'bottom-left',
            fabActions: [
              {
                  name: 'tender',
                  icon: 'stacked_bar_chart',
                //   tooltip: 'Tender'
              },
              {
                  name: 'company',
                  icon: 'corporate_fare',
                //   tooltip: 'Company'
              },
              {
                  name: 'award',
                  icon: 'military_tech',
                //   tooltip: 'Aaward'
              },
              {
                  name: 'view_option',
                  icon: 'view_list',
                //   tooltip: 'Change view'
              },
              {
                  name: 'search',
                  icon: 'search',
                //   tooltip: 'Search'
              }
          ]
      }
    },
    computed: {
        ...mapGetters(["getFabVisibility","getAddCompanyDialogState", "getTenderEditDialogState", "getAwardAddDialogState", "getFloatingButtonState","getSearchTab","getSideBarState","getTab","getAwardData","getCompanyData","getTenderData", "getViewOption", "getTenderPageInfo", "getAwardPageInfo", "getCompanyPageInfo", "getTenderSearchParams", "getAwardSearchParams", "getCompanySearchParams"]),
    },
    methods: {
        ...mapActions(["changeTab","changeSearchTab","changeViewOption", "searchTenders", "setTenderData","searchAwards", "setAwardData" ,"searchCompanies", "setCompanyData"]),
        view_option(){
            this.changeViewOption( (this.getViewOption + 1 ) % 3 );
        },
        search(){
            this.changeSearchTab(!this.getSearchTab);
        },
        award(){
            this.changeTab('Award')
        },
        company(){
            this.changeTab('Company')
        },
        tender(){
            this.changeTab('Tender')
        }
    },
    created() {
        this.viewOption = this.getViewOption;
    }
    
}
</script>

<style scoped>

.display-tab{
  font-size: 10px !important;
  font-weight: 400 !important;
}
.fab{
  font-size: 10px !important;
  font-weight: 400 !important;
}
.map-style{
  margin-left: 5% !important;
  margin-right: 5% !important;
}

</style>
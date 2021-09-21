<template>
    <v-card :elevation="4" class="ml-2" style="margin-right: 50px !important">
        <v-tabs
          class="font-weight-black "
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
        >
          <v-tab
            v-for="item in items"
            @change="change(item)"
            :key="item"
            class="display-tab"
          >
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="item in items"
            :key="item"
          >
          <v-container fluid :class=" getViewOption == 2 ? 'ma-0 pa-0' : '' ">
            <div class="">
              <ListContainer v-if="getViewOption == 1" />
            </div>
            <div class="">
              <TableContainer  v-if="getViewOption == 0" />
            </div>
            <div class="mx-0 px-0 mb-0 pb-0">
              <MapContainer v-if="getViewOption == 2" />
            </div>
          </v-container>
 
          </v-tab-item>
        </v-tabs-items>
        </v-card>
</template>


<script>
import ListContainer from '@/components/common/ListContainer';
import TableContainer from '@/components/common/TableContainer';
import MapContainer from '@/components/common/MapContainer';
import { mapGetters, mapActions } from "vuex";

export default {
    components:{
      ListContainer,
      TableContainer,
      MapContainer,
    },
    data () {
        return { 
            tab: null,
            items: [
            'Tender', 'Award', 'Company',
            ],
        }
    },
    methods: {
      ...mapActions(["changeTab"]),
      
      change(TabName){
        if (TabName != this.tab ){
          this.tab = TabName;
          this.changeTab(TabName);
        }
      },
    },
    computed: {
        ...mapGetters(["getViewOption"]),
    }
    
}
</script>

<style scoped>

.display-tab{
  font-size: 10px !important;
  font-weight: 400 !important;
}

</style>
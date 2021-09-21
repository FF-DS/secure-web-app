<template>
    <v-card :elevation="4" class="ml-2" style="margin-right: 50px !important">
        <v-container fluid :class=" getViewOption == 2 ? 'ma-0 pa-0' : '' ">
            <div class="">
                <TableContainer  v-if="getViewOption == 0" />
            </div>
            <div class="mx-0 px-0 mb-0 pb-0">
                <MapContainer v-if="getViewOption == 2" />
            </div>
        </v-container>
 
    </v-card>
</template>


<script>
import TableContainer from '@/components/Admin/AccountManagement/AccountsTableContainer';
import MapContainer from '@/components/Admin/AccountManagement/AccountsMapContainer';
import { mapGetters, mapActions } from "vuex";

export default {
    components:{
      TableContainer,
      MapContainer,
    },
    data () {
        return { 
        }
    },
    methods: {
      ...mapActions([""]),
      
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
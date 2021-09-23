<template>
    <div class="">
        <div class="" v-if="!$vuetify.breakpoint.smAndDown">
            <AwardSearch v-if="getTab == 'Award'" />
            <CompanySearch v-if="getTab == 'Company'" />
            <TenderSearch v-if="getTab == 'Tender'" />
        </div>
        <div class="" v-else>
            <v-dialog
                v-model="dialog"
                class="font-weight-medium"
                max-height="500"
                max-width="500"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-card-actions>
                        <v-btn hidden @click="reveal = true" v-bind="attrs" v-on="on">
                        </v-btn>
                    </v-card-actions>
                </template>
                <v-container fluid>
                    <v-row>
                        <AwardSearch v-if="getTab == 'Award'"  @close_dialog="close_dialog" />
                        <CompanySearch v-if="getTab == 'Company'"  @close_dialog="close_dialog" />
                        <TenderSearch v-if="getTab == 'Tender'"  @close_dialog="close_dialog" />
                    </v-row>
                </v-container>
            </v-dialog>
        </div>
    </div>
</template>

<script>

import AwardSearch from '@/components/Award/AwardSearch'
import CompanySearch from '@/components/Company/CompanySearch'
import TenderSearch from '@/components/Tender/TenderSearch'
import { mapGetters } from "vuex";

export default {
    data(){ 
        return {
            dialog: false,
        } 
    },
    components: {        
        CompanySearch,
        TenderSearch,
        AwardSearch,
    },
    computed: {
        ...mapGetters(["getTab", "getSearchOption", "getSearchTab"]),
    },
    created(){
        this.unwatch = this.$store.watch(
            (state, getters) => getters.getSearchTab,
            (newValue, oldVal ) => {
                newValue; oldVal;
                this.dialog = true;
            }
        );
    },
    methods:{
        close_dialog(){
            this.dialog = false;
        }
    },  
}

</script>

<style scoped>

.fab{
    position: fixed;
    left: 0%;
    top: 22%;
    opacity: 1
}

</style>
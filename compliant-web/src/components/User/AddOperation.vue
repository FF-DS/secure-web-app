<template>
    <div>
        <TenderAddDialog/>
        <CompanyAddDialog/>
        <AwardAddDialog/>
        <span  @click="add_event()"  v-if="!$vuetify.breakpoint.xsOnly"  >
            <fab
                v-if="!(getTenderEditDialogState || getAwardAddDialogState || getAddCompanyDialogState || getSideBarState) && !$vuetify.breakpoint.xsOnly && getLoggedInState && getFabVisibility"
                ripple-show="true"
                icon-size="small"
                >
            </fab>
        </span>
    </div>
</template>

<script>

import TenderAddDialog from '@/components/Tender/TenderAddDialog'; 
import CompanyAddDialog from '@/components/Company/CompanyAddDialog'; 
import AwardAddDialog from '@/components/Award/AwardAddDialog'; 

import { mapGetters, mapActions } from "vuex";
import fab from 'vue-fab'

export default {
    components: {        
        fab,
        TenderAddDialog,
        CompanyAddDialog,
        AwardAddDialog
    },
    
    computed: {
        ...mapGetters(["getFabVisibility", "getSideBarState", "getTab", "getAddCompanyDialogState", "getTenderEditDialogState", "getAwardAddDialogState", "getLoggedInState"]),
    },
    methods: {
        ...mapActions(["setTenderEditDialogState", "setAddCompanyDialogState","setAwardAddDialogState"]),
        add_event(){
            if( this.getTab == 'Tender')
                this.setTenderEditDialogState( true );
            else if( this.getTab == 'Company')
                this.setAddCompanyDialogState( true );
            else
                this.setAwardAddDialogState( true );
        },
    },
}
</script>
<template>
    <v-container fluid class="my-5">
        <!-- FOR CURD OPERATIONS  Add Button -->
        <AddOperations v-if="(userServicePage && getLoggedInState) || (getUserType == 'Admin')" />
        <!-- FOR CURD OPERATIONS-->
        <v-layout row> 
            <v-flex xs12 sm4  v-if="!$vuetify.breakpoint.smAndDown" >
                <div style="margin-left: 30px !important">
                    <SearchTab/>
                </div>
            </v-flex>
            <v-flex xs12 sm8 v-if="!$vuetify.breakpoint.smAndDown" > 
                <DisplayTab/>
            </v-flex>
            <v-flex xs12 v-else>
                <MobileDisplayTab/>
            </v-flex>
        </v-layout>

        <v-snackbar v-model="snackbar" >
            {{ getSnakBarMessage.message }}
            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="snackbar = false" > Close </v-btn>
            </template>
        </v-snackbar>

    </v-container>
</template>

<script>
import SearchTab from '@/components/Public/SearchTab';
import DisplayTab from '@/components/Public/DisplayTab';
import MobileDisplayTab from '@/components/Public/MobileDisplayTab';
import AddOperations from '@/components/User/AddOperation';
import { mapGetters, mapActions } from "vuex";

export default {
    components: {        
        SearchTab,
        DisplayTab,
        MobileDisplayTab,
        AddOperations,
    },   
    data: () => ({
      snackbar: false,
    }),
    computed: {
        ...mapGetters(["getViewOption", "getLoggedInState", "getUserType", "getUserType", "getSnakBarMessage"]),
        userServicePage() {
            return this.$route.name == 'my-service';
        }
    },
    methods: {
        ...mapActions(["populateFirstPage", "setTenderEditDialogState", "myServiceTab"]),
    },
    created () {
        if(this.getLoggedInState && this.$route.name == 'my-service'){
            this.myServiceTab();
        }else{
            this.populateFirstPage();
        }

        this.unwatch = this.$store.watch(
            (state, getters) => getters.getSnakBarMessage,
            (newValue, oldVal) => {
              oldVal;
              this.snackbar = true;
            }
        );

    }
    
}
</script>
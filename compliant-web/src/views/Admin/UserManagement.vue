<template>
    <v-container fluid class="my-5">
        <v-layout row> 
            <v-flex xs12 sm4>
                <div style="margin-left: 30px !important">
                    <AccountSearch/>
                </div>
            </v-flex>
            <v-flex xs12 sm8> 
                <DisplayTab/>
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
import AccountSearch from '@/components/Admin/AccountManagement/AccountSearch';
import DisplayTab from '@/components/Admin/AccountManagement/DisplayAccounts';
import { mapGetters, mapActions } from "vuex";

export default {
    components: {        
        AccountSearch,
        DisplayTab,
    },   
    data: () => ({
      snackbar: false,
    }),
    computed: {
        ...mapGetters([ "getSnakBarMessage"]),
    },
    methods: {
        ...mapActions(["searchAccounts"]),
    },
    created () {
        const searchQueries = {
            query : true,
            queries: {
                size : 12,
            }
        }

        this.searchAccounts(searchQueries)

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
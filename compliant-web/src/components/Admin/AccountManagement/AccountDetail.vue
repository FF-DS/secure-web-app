<template>
    <v-navigation-drawer
            class="ma-0 lighten-4"
            absolute
            right
            width="350"
            height="100%"
            v-model="drawer"
            :mini-variant.sync="mini"
            permanent
    >
        <v-list-item class="px-2 grey lighten-4">
            <v-list-item-avatar>
                 <v-img :src="getSelectedObject.avatar ? getSelectedObject.avatar : '/res/user_pic.png' "></v-img>
            </v-list-item-avatar>

            <v-list-item-title class="profile-card-title"    v-if="getSelectedObject.name">{{ getSelectedObject.name.split('/%/')[0] + ' ' + getSelectedObject.name.split('/%/')[1]  }}</v-list-item-title>
            <v-list-item-title class="profile-card-title"    v-else> Not available </v-list-item-title>

            <v-btn
            icon
            @click.stop="mini = !mini"
            >
            <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense class="mb-0">
            <v-list-item link >
                <v-list-item-icon>
                    <v-icon small> mdi-email </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="profile-card-title"   > Email </v-list-item-title>
                    <v-list-item-title class="profile-card-data"    v-if="getSelectedObject.name"> {{ getSelectedObject.email }} </v-list-item-title>
                    <v-list-item-title class="profile-card-data"    v-else> Not available </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link >
                <v-list-item-icon>
                    <v-icon small> mdi-account-convert </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="profile-card-title"   > Account Type </v-list-item-title>
                    <v-list-item-title class="profile-card-data"    v-if="getSelectedObject.role"> {{ getSelectedObject.role }} </v-list-item-title>
                    <v-list-item-title class="profile-card-data"    v-else> Not available </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link >
                <v-list-item-icon>
                    <v-icon small> mdi-gender-male-female </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="profile-card-title"  > Gender </v-list-item-title>
                    <v-list-item-title class="profile-card-data"    v-if="getSelectedObject.sex"> {{ getSelectedObject.sex }} </v-list-item-title>
                    <v-list-item-title class="profile-card-data"    v-else> Not available </v-list-item-title>
                </v-list-item-content>
            </v-list-item>


            <v-list-item link >
                <v-list-item-icon>
                    <v-icon small> mdi-cellphone-android </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="profile-card-title"  > Phone number </v-list-item-title>
                    <v-list-item-title class="profile-card-data"    v-if="getSelectedObject.phone_number"> {{ getSelectedObject.phone_number }} </v-list-item-title>
                    <v-list-item-title class="profile-card-data"    v-else> Not available </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link >
                <v-list-item-icon>
                    <v-icon small> mdi-login-variant </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="profile-card-title"   > Last online </v-list-item-title>
                    <v-list-item-title class="profile-card-data"    v-if="getSelectedObject.last_online"> {{ new Date(getSelectedObject.last_online).toLocaleString() }} </v-list-item-title>
                    <v-list-item-title class="profile-card-data"    v-else> Not available </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link >
                <v-list-item-icon>
                    <v-icon small> mdi-crosshairs-gps </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="profile-card-title" > Country </v-list-item-title>
                    <v-list-item-title class="profile-card-data"    v-if="getSelectedObject.country"> {{ getSelectedObject.country }} </v-list-item-title>
                    <v-list-item-title class="profile-card-data"    v-else> Not available </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link >
                <v-list-item-icon>
                    <v-icon small> mdi-crosshairs-gps </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="profile-card-title" > Address </v-list-item-title>
                    <v-list-item-title class="profile-card-data"    v-if="getSelectedObject.address"> {{ getSelectedObject.address }} </v-list-item-title>
                    <v-list-item-title class="profile-card-data"    v-else> Not available </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link >
                <v-list-item-icon>
                    <v-icon small> mdi-account-circle </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="profile-card-title" > Account state </v-list-item-title>
                    <v-list-item-title class="profile-card-data" > {{ getSelectedObject.account_state == 'Unblocked'? 'Active' : getSelectedObject.account_state }} </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link >
                <v-list-item-icon>
                    <v-icon small> mdi-calendar </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="profile-card-title"  > Created at </v-list-item-title>
                    <v-list-item-title class="profile-card-data"    v-if="getSelectedObject.created_at"> {{ new Date(getSelectedObject.created_at).toLocaleDateString() }} </v-list-item-title>
                    <v-list-item-title class="profile-card-data"    v-else> Not available </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

             <v-divider></v-divider>
         <v-list-item link class="py-3 mb-0"> 
            <v-btn outlined x-small class="orange--text" v-if="!mini">
                Block User 
            </v-btn>

            <v-btn outlined x-small class="red--text ml-auto" v-if="!mini">
                Delete User 
            </v-btn>
         </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
    components:{
    },
    data(){
        return {
            currentPage: 1,
            viewOption: false,
            currentViewOption: 'Table',
            footerProps: {'items-per-page-options': []},
            drawer: true,
            mini: true,
        }
    },
    computed: {
        ...mapGetters(["getSelectedObject","getAccountsData","getAccountTableHeader", "getAccountPageInfo", "getAccountSearchParams", "getAmountOfDataItem", "getViewOption"]),
        userServicePage() {
          return this.$route.name == 'my-service';
        },
        adminServicePage() {
            return this.$route.name == 'admin-service';
        },
    },
    methods: {
         ...mapActions(["searchAccounts", "setAccountDataValue", "setSelectedObject", "changeViewOption"]),
        handlePageChange(value) {
            this.currentPage = value;
        },
        changeViewStyle(option) {
            this.currentViewOption = option;
            this.changeViewOption(option)
        },
        getStatus (status) {
            if(status == 'Unblocked')
                return { icon : 'mdi-check', color: 'green',}
            else if(status == 'Blocked')
                return { icon : 'mdi-alarm-check', color: 'red',  }
            else
                return { icon : 'mdi-alarm-check', color: 'red', }
        },
        changePage(pageNumber){
            let params = this.getAccountSearchParams;
            params.queries.page = pageNumber;
            this.setAccountDataValue([])
            this.searchAccounts(params)
        },
        sortData(info){
            this.getAccountsData.sort( (a, b) => (a[ info[0] ] > b[ info[0] ] ? 1 : -1) )
        },
        revSortData(info){
            this.getAccountsData.sort( (a, b) => (a[ info[0] ] > b[ info[0] ] ? -1 : 1) )
        },
        selectedRow(row){
            this.setSelectedObject(row)
        }
      
    },
    created() {
        this.unwatch = this.$store.watch(
            (state, getters) => getters.getSelectedObject,
            (newValue, oldVal) => {
                newValue; oldVal;
                this.mini = false;

        })
    }
}
</script>


<style scoped>

.pagination-sec{
  transform: scale(0.7);
  margin: 0px !important;
}
.switch-data{
  font-size: 10px !important;
  font-weight: 400 !important;
}

.tender-card-chip{
  font-size: 10px !important;
  font-weight: 400 !important;
  line-height: 6px !important;
}

.tender-icons{
  font-size: 17px !important;
  font-weight: 400 !important;

}
.v-data-table >>> td{
  font-size: 12px !important;
  color: darkslategray !important;
  font-weight: 400 !important;
}
.size-control{
  margin-top: 1.6rem !important;
}

.user-size-control{
  margin-top: 1.3rem !important;
}

.tooltip-card-data{
  font-size: 11px !important;
  font-weight: 400 !important;
}

.profile-card-chip{
  font-size: 9px !important;
  font-weight: 400 !important;
  line-height: 6px !important;
}
.profile-card-title{
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 24px !important;
}
.profile-card-sub-title{
  font-size: 15px !important;

}
.profile-card-data{
  font-size: 11px !important;
  font-weight: 300 !important;
}

.profile-card-title{
  font-size: 15px !important;
  font-weight: 500 !important;
  color: grey !important;
}
.profile-icons{
  font-size: 17px !important;
  font-weight: 1000 !important;

}
.inner-val{
  font-weight: 300 !important;
}

</style>
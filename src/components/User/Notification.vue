<template>
    <div class="text-center">
        <v-dialog
            v-model="getNotificationDialogState"
            class="font-weight-medium"
            persistent
            max-width="700"
            max-height="700"
        >
            <v-card class="mx-auto" tile :loading="loadingContent">
                <v-container fluid>
                    <v-card-title class="pt-4 text-h6 deep-purple--text">
                        <v-icon  color="purple">mdi-bell</v-icon>
                            Notification
                        <v-icon color="gray" class="ml-auto" @click="notificationDialogView()"> mdi-close</v-icon>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list-item-subtitle
                        v-if="!getUserNotification || getUserNotification.length == 0"
                        class="text-center py-5 my-5 grey--text text-h3 no-notification"
                    >
                     No notifications yet!
                    </v-list-item-subtitle>
                    <v-list three-line flat>
                        <v-list-item-group
                            text
                            active-class="pink--text"
                        >
                            <template v-for="(item, index) in getUserNotification">
                                <v-list-item :key="item.id">
                                    <template>
                                    <v-list-item-content>
                                        <v-list-item-title :class="getStatus(item.status).text_color" class="mb-2"> 
                                            {{ item.status }}
                                            <v-icon small :color="getStatus(item.status).color" >{{ getStatus(item.status).icon }}</v-icon>
                                            
                                        </v-list-item-title>

                                        <v-list-item-subtitle
                                            class="blue--text"
                                        >
                                        {{ item.title }}
                                        </v-list-item-subtitle>

                                        <v-list-item-subtitle v-text="item.message"></v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-list-item-action>
                                        <!-- <v-btn x-small outlined color="green" class="mb-5">
                                           read <v-icon color="green">mdi-check</v-icon>
                                        </v-btn> -->
                                        <v-list-item-action-text v-if="item.time" class="orange--text">{{ new Date(item.time).toLocaleDateString()  }}</v-list-item-action-text>
                                    </v-list-item-action>
                                    </template>
                                </v-list-item>

                                <v-divider v-if="index < getUserNotification.length - 1"  :key="index"></v-divider>
                            </template>
                        </v-list-item-group>
                    </v-list>

                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="notificationDialogView()" small>
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
                                 
        </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    components: {
    },
    data: () => ({
        loadingContent: false,
    }),
    computed: {
        ...mapGetters(["getNotificationDialogState", "getUser", "getUserNotification"]),
    },
    methods: {
        ...mapActions(["setNotificationDialogState", "fetchUserNotification","updateUserNotification"]),
        notificationDialogView() {
            this.setNotificationDialogState( false );
        },
        getStatus(status){
            if(status == 'Accepted')
                return { icon : 'mdi-check', color: 'green', text_color : 'green--text' }
            else if(status == 'Deleted')
                return { icon : 'mdi-delete', color: 'orange',  text_color : 'orange--text' }
            else if(status == 'Rejected')
                return { icon : 'mdi-alarm-check', color: 'red', text_color : 'red--text' }
            else
                return { icon : 'mdi-delete', color: 'red', text_color : 'red--text' }
        }
    },
    created(){
        this.fetchUserNotification();

        this.unwatch = this.$store.watch(
            (state, getters) => getters.getNotificationDialogState,
            (newValue, oldVal) => {
                oldVal;
                if(newValue){
                    this.loadingContent = true;
                    this.fetchUserNotification().then(()=> {  this.loadingContent = false; });
                }
            }
        );
    }
}
</script>



<style scoped>

.company-card-title{
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 24px !important;
}
.company-card-sub-title{
  font-size: 10px !important;

}
.company-card-data{
  font-size: 14px !important;
  font-weight: 400 !important;
}
.company-icons{
  font-size: 17px !important;
  font-weight: 400 !important;


}
.no-notification{
    margin-top: 4rem !important;
    font-weight: 700 !important;
    margin-bottom: 4rem !important;
}
</style>
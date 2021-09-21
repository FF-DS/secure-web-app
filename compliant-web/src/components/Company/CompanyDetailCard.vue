<template>
    <div class="text-center">
        <v-dialog
            v-model="dialog"
            class="font-weight-medium"
            max-width="800"
            max-height="500"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-card-actions>
                    <v-btn text color="teal accent-4" @click="reveal = true" v-bind="attrs" v-on="on" class="company-card-data">
                        Details
                    </v-btn>
                </v-card-actions>
            </template>

            
                <v-card class="vuetify-compos">
                    <v-card-title class="headline grey lighten-2 company-card-title">
                        <span v-if="userServicePage" class="ml-auto text--secondary"> <v-icon>mdi-account-circle</v-icon> Company Informations</span>
                        <span v-else>Company Informations</span>
                        <v-spacer></v-spacer>
                        <CompanyEditDialog v-if="viewEditDialog"  :companyData=companyData @close_dialog="close_dialog" />
                        <v-icon color="gray" class="ml-3" @click="dialog = false"> mdi-close</v-icon>
                    </v-card-title>

                    <v-container>
                        <v-list>
                            <v-row>
                                <v-col  cols="12" sm="6" >
                                    <v-list-item-group >
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <!-- <v-icon class="company-icons" >mdi-inbox</v-icon> -->
                                                <img width="15" :src="companyData.avatar? companyData.avatar : '/logo/tendermap.png' " />
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="company-card-data"> Name <v-icon>mdi-link</v-icon>  </v-list-item-title>
                                                <v-list-item-subtitle class="company-card-data"> {{ companyData.name }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="company-icons" >mdi-phone</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="company-card-data"> Phone number </v-list-item-title>
                                                <v-list-item-subtitle class="company-card-data"> {{ companyData.phone_number }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="company-icons" >mdi-email</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="company-card-data"> Email </v-list-item-title>
                                                <v-list-item-subtitle class="company-card-data"> {{ companyData.email }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-col>

                                <v-col  cols="12" sm="6" >
                                    <v-list-item-group >
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="company-icons" >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="company-card-data"> Address </v-list-item-title>
                                                <v-list-item-subtitle class="company-card-data"> {{ companyData.physical_address }} / {{ companyData.country  }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="company-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="company-card-data"> P.O Box </v-list-item-title>
                                                <v-list-item-subtitle class="company-card-data"> {{ companyData.pobox }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="company-icons" >mdi-send</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="company-card-data"> Fax </v-list-item-title>
                                                <v-list-item-subtitle class="company-card-data"> {{ companyData.fax }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" >
                                    <v-list-item-content>
                                        <v-card-title class="company-card-title">Categories</v-card-title>
                                        <v-card-subtitle>
                                            <span v-for="(data, index) in companyData.category" :key="index">
                                                <v-chip color="darkgray" class="ma-1 company-card-chip" > {{ data }} </v-chip>
                                            </span>
                                        </v-card-subtitle>
                                    </v-list-item-content>
                                </v-col>
                            </v-row>
                        </v-list>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col>
                                <v-card-title class="company-card-title">
                                    Details
                                </v-card-title>
                                <v-card-text class="company-card-data">
                                    <div v-html="companyData.description"></div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-card-title class="d-block company-card-title"> Attachments </v-card-title>
                
                        <v-list>
                            <v-list-item-group >
                                <v-row>
                                    <v-col  cols="12" sm="6"  v-for="(file, index) in companyData.file_links" :key="index">
                                        <v-list-item v-if="file.link && file.name">
                                            <v-list-item-icon>
                                                <v-icon class="company-icons" > mdi-file-pdf</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content >
                                                <a :href="file.link" target="_blank"> 
                                                    <v-list-item-title  class="company-card-data" > {{ file.name }} <v-icon small class="mx-2">mdi-open-in-new</v-icon>  </v-list-item-title>
                                                </a>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-col>
                                </v-row>
                            </v-list-item-group>
                        </v-list>
                    </v-container>

                    <v-container>
                        <v-divider v-if="companyData.status_message && userServicePage" ></v-divider>
                        <v-row v-if="companyData.status_message && userServicePage" >
                            <v-col>
                                <v-card-title class="award-card-title  green--text">
                                    Admin review Comment
                                </v-card-title>
                                <v-card-text class="award-card-data secondary--text">
                                    <div v-html="companyData.status_message"></div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-container>


                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="dialog = false" class="company-card-data">
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
           
        </v-dialog>
  </div>
</template>

<script>
import CompanyEditDialog from '@/components/Company/CompanyEditDialog';
import { mapGetters } from "vuex";

export default {
    components: {
        CompanyEditDialog,
    },

    computed: {
        ...mapGetters(["getLoggedInState", "getUser"]),
        userServicePage() {
            return this.$route.name == 'my-service';
        },
        viewEditDialog(){
            return !this.$vuetify.breakpoint.xsOnly && this.getLoggedInState && ( this.getUser.role == 'Admin' || this.$route.name == 'my-service' )
        }
    },

    data(){ 
        return {
            dialog: false,
        } 
    },
    methods:{
        getUserType(){
            return this.getLoggedInState && this.getUser.role == 'Admin'
        },
        close_dialog(){
            this.dialog = false;
        }
    },
    props: ['companyData'],
}
</script>



<style scoped>

.company-card-chip{
  font-size: 9px !important;
  font-weight: 400 !important;
  line-height: 6px !important;
  color:black !important;
}
.company-card-title{
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 24px !important;
}
.company-card-sub-title{
  font-size: 10px !important;

}
.company-card-data{
  font-size: 11px !important;
  font-weight: 400 !important;
}
.company-icons{
  font-size: 17px !important;
  font-weight: 400 !important;

}
</style>
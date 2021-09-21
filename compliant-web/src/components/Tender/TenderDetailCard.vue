<template>
    <div class="text-center">
        <v-dialog
            v-model="dialog"
            class="font-weight-medium"
            max-width="800"
            max-height="800"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-card-actions>
                    <v-btn text color="teal accent-4" @click="reveal = true" v-bind="attrs" v-on="on" class="tender-card-data">
                        Details
                    </v-btn>
                </v-card-actions>
            </template>

            
                <v-card class="tender-dialog-card" rounded=false >
                    <v-card-title class="headline grey lighten-2 tender-card-title" >  
                        <span v-if="userServicePage" class="ml-auto text--secondary"> <v-icon>mdi-account-circle</v-icon> Tender Informations</span>
                        <span v-else>Tender Informations</span>
                        <v-spacer></v-spacer>
                        <TenderEditDialog v-if="viewEditDialog" :tenderData=tenderData @close_dialog="close_dialog" />
                        <v-icon color="gray" class="ml-3" @click="dialog = false"> mdi-close</v-icon>
                    </v-card-title>

                    <v-container>
                        <v-row  class="text-xs-center">
                            <v-col  cols="12" sm="8" >
                                <v-list>
                                    <v-list-item-group >
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Tender Title </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" > {{ tenderData.title }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Tender Id </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" > {{ tenderData.tender_id }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Mode of Procurement </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" > {{ tenderData.mode_of_procurement  }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-email-open</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Bid opening date </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" > {{ tenderData.issued_date }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>

                            <!-- <v-flex xs4></v-flex> -->

                            <v-col  cols="12" sm="4" >
                                <v-list>
                                    <v-list-item-group >
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Country </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" > {{ tenderData.country }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons"  >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" >  Sector </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" > {{ tenderData.sector }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Type </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" > {{ tenderData.procurement_type }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-send</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Bid closing date </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" > {{ tenderData.closing_date  }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col>
                                <v-card-title class="tender-card-title">
                                    Details
                                </v-card-title>
                                <v-card-text class="tender-card-data">
                                    <div v-html="tenderData.details"></div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-card-title class="d-block tender-card-title"> Attachments </v-card-title>
                
                        <v-list>
                            <v-list-item-group >
                                <v-row>
                                    <v-col  cols="12" sm="6"  v-for="(file, index) in tenderData.file_links" :key="index">
                                        <v-list-item v-if="file.link && file.name">
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" > mdi-file-pdf</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content >
                                                <a :href="file.link" target="_blank"> 
                                                    <v-list-item-title  class="tender-card-data" > {{ file.name }} <v-icon small class="mx-2">mdi-open-in-new</v-icon>  </v-list-item-title>
                                                </a>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-col>
                                </v-row>
                            </v-list-item-group>
                        </v-list>
                
                        <v-divider></v-divider>

                        <v-card-title class="d-block tender-card-title"> Company Information </v-card-title>
                        <v-row  v-if="tenderData.company_id">
                            <v-col  cols="12" sm="8" >
                                <v-list>
                                    <v-list-item-group >
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Name </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" > {{ tenderData.company_id.name }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Phone Number </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" > {{ tenderData.company_id.phone_number }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                            <!-- <v-flex xs12 sm4> </v-flex> -->
                            <v-col  cols="12" sm="4" >
                                <v-list>
                                    <v-list-item-group>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Email </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" > {{ tenderData.company_id.email }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-email-open</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Physical address </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" > {{ tenderData.company_id.physical_address }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container v-if="tenderData.award_id">
                        <v-divider></v-divider>
                        <v-card-title class="d-block tender-card-title"> Award Information </v-card-title>
                        <v-row>
                            <v-col cols="12" sm="8" >
                                <v-list>
                                    <v-list-item-group >
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon  class="tender-icons" >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Title  <v-icon>mdi-link</v-icon>  </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" > {{ tenderData.award_id.title  }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Published Date </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" > {{ tenderData.award_id.award_date }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-list>
                                    <v-list-item-group >
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Tender Id </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" > {{ tenderData.award_id.tender_identification }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Country </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" > {{ tenderData.award_id.country }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col>
                                <v-card-title class="tender-card-title">
                                    Award Details
                                </v-card-title>
                                <v-card-text class="tender-card-data">
                                    <div v-html="tenderData.award_id.details"></div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container>
                        <v-divider v-if="tenderData.status_message && userServicePage" ></v-divider>
                        <v-row v-if="tenderData.status_message && userServicePage" >
                            <v-col>
                                <v-card-title class="award-card-title green--text ">
                                    Admin review Comment
                                </v-card-title>
                                <v-card-text class="award-card-data secondary--text">
                                    <div v-html="tenderData.status_message"></div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-container>

                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-chip text :color="getStatus(tenderData.status).color" text-color="white" class="tender-card-chip px-2 py-0" > <v-icon left class="tender-icons" > {{ getStatus(tenderData.status).icon }} </v-icon>  {{  getStatus(tenderData.status).message }} </v-chip>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="dialog = false" class="tender-card-data">
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
           
        </v-dialog>
  </div>
</template>

<script>
import TenderEditDialog from '@/components/Tender/TenderEditDialog';
import { mapGetters } from "vuex";

export default {
    components:{
        TenderEditDialog,
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
        },
        getStatus(status){
            if(status == 'Approved')
                return { icon : 'mdi-check', color: 'green', message : 'Approved by Admins' }
            else if(status == 'Published_By_User')
                return { icon : 'mdi-progress-check', color: 'orange', message : 'Published By User' }
            else if(status == 'Under_Review')
                return { icon : 'mdi-clock', color: 'orange',  message : 'Under Review'  }
            else if(status == 'Rejected')
                return { icon : 'mdi-close', color: 'red', message : 'Rejected' }
        },
    },
    props: ['tenderData'],
}
</script>


<style scoped>

.tender-card-chip{
  font-size: 9px !important;
  font-weight: 400 !important;
  line-height: 6px !important;
}
.tender-card-title{
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 24px !important;
}
.tender-card-sub-title{
  font-size: 10px !important;

}
.tender-card-data{
  font-size: 11px !important;
  font-weight: 400 !important;
}
.tender-icons{
  font-size: 17px !important;
  font-weight: 400 !important;

}
.tender-dialog-card{
    border-radius:0px !important;
}
</style>
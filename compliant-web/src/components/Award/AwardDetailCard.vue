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
                    <v-btn text color="teal accent-4" @click="reveal = true" v-bind="attrs" v-on="on" class="award-card-data">
                        Details
                    </v-btn>
                </v-card-actions>
            </template>

            
                <v-card class="vuetify-compos">
                    <v-card-title class="headline grey lighten-2 award-card-title">
                        <span v-if="userServicePage" class="ml-auto text--secondary"> <v-icon>mdi-account-circle</v-icon> Award Informations</span>
                        <span v-else>Award Informations</span>
                        <v-spacer></v-spacer>
                        <AwardEditDialog v-if="viewEditDialog" :awardData=awardData @close_dialog="close_dialog" />
                        <v-icon color="gray" class="ml-3" @click="dialog = false"> mdi-close</v-icon>
                    </v-card-title>

                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="8" >   
                                <v-list>
                                    <v-list-item-group >
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon  class="award-icons" >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Title  <v-icon>mdi-link</v-icon>  </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.title  }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Published Date </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.award_date }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-email-open</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Publisher </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.company_id.name }} </v-list-item-subtitle>
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
                                                <v-icon class="award-icons" >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Tender Id </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.tender_identification }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Country </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.country }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-send</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Award Status </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.status }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-card-title class="d-block award-card-title"> Winner Companies </v-card-title>
                            <v-list>
                                <v-list-item-group>
                                    <v-row>
                                        <v-col cols="12" sm="6" v-for=" (company, index) in awardData.winner_companies" :key="index">
                                            <v-list-item>
                                                <v-list-item-icon>
                                                    <v-icon class="award-icons" >mdi-phone</v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>
                                                    <v-list-item-title class="award-card-data" > {{company.name}} </v-list-item-title>
                                                    <v-list-item-subtitle class="award-card-data" >  {{company.phone_number}} </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-col>
                                    </v-row>
                                </v-list-item-group>
                            </v-list>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col>
                                <v-card-title class="award-card-title">
                                    Details
                                </v-card-title>
                                <v-card-text class="award-card-data">
                                    <div v-html="awardData.details"></div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-card-title class="d-block"> Attachments </v-card-title>
                
                        <v-list>
                            <v-list-item-group >
                                <v-row>
                                    <v-col cols="12" sm="6" v-for="(file, index) in awardData.file_links" :key="index">
                                        <v-list-item v-if="file.link && file.name">
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" > mdi-file-pdf</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content >
                                                <a :href="file.link" target="_blank"> 
                                                    <v-list-item-title  class="award-card-data" >  {{ file.name }} <v-icon small class="mx-2">mdi-open-in-new</v-icon>  </v-list-item-title>
                                                </a>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-col>
                                </v-row>
                            </v-list-item-group>
                        </v-list>
                        <v-divider></v-divider>

                        <v-card-title class="d-block award-card-title"> Company Information </v-card-title>
                            <v-row>
                                <v-col  cols="12" sm="8" >
                                    <v-list>
                                        <v-list-item-group >
                                            <v-list-item>
                                                <v-list-item-icon>
                                                    <v-icon class="award-icons" >mdi-inbox</v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>
                                                    <v-list-item-title class="award-card-data" > Name </v-list-item-title>
                                                    <v-list-item-subtitle class="award-card-data" > {{ awardData.company_id.name }} </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-icon>
                                                    <v-icon class="award-icons" >mdi-star</v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>
                                                    <v-list-item-title class="award-card-data" > Phone Number </v-list-item-title>
                                                    <v-list-item-subtitle class="award-card-data" > {{ awardData.company_id.phone_number }} </v-list-item-subtitle>
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
                                                    <v-icon class="award-icons" >mdi-inbox</v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>
                                                    <v-list-item-title class="award-card-data" > Email </v-list-item-title>
                                                    <v-list-item-subtitle class="award-card-data" > {{ awardData.company_id.email }} </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-icon>
                                                    <v-icon class="award-icons" >mdi-email-open</v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>
                                                    <v-list-item-title class="award-card-data" > Physical address </v-list-item-title>
                                                    <v-list-item-subtitle class="award-card-data" > {{ awardData.company_id.physical_address }} </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                </v-col>
                            </v-row>

                    </v-container>
                    <v-container v-if="awardData.tender_id">
                        <v-divider  ></v-divider>
                        <v-card-title class="d-block tender-card-title"> Tender Information </v-card-title>
                        <v-row  class="text-xs-center">
                            <v-col  cols="12" sm="8" >
                                <v-list>
                                    <v-list-item-group >
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Tender Title </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.tender_id.title }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Tender Id </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.tender_id.tender_id }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Mode of Procurement </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.tender_id.mode_of_procurement  }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-email-open</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Bid opening date </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.tender_id.issued_date }} </v-list-item-subtitle>
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
                                                <v-icon class="award-icons" >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Country </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.tender_id.country }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons"  >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" >  Sector </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.tender_id.sector }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Type </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.tender_id.procurement_type }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-send</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Bid closing date </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.tender_id.closing_date  }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col>
                                <v-card-title class="award-card-title">
                                    Tender Details
                                </v-card-title>
                                <v-card-text class="award-card-data">
                                    <div v-html="awardData.tender_id.details"></div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-container>

                    <v-container>
                        <v-divider v-if="awardData.status_message && userServicePage" ></v-divider>
                        <v-row v-if="awardData.status_message && userServicePage" >
                            <v-col>
                                <v-card-title class="award-card-title green--text">
                                    Admin review Comment
                                </v-card-title>
                                <v-card-text class="award-card-data secondary--text">
                                    <div v-html="awardData.status_message"></div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-container>

                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="dialog = false" class="award-card-data">
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
           
        </v-dialog>
  </div>
</template>

<script>
import AwardEditDialog from '@/components/Award/AwardEditDialog';
import { mapGetters } from "vuex";

export default {
    components: {
        AwardEditDialog,
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
        close_dialog(){
            this.dialog = false;
        }
    },
    props: ['awardData'],
}
</script>


<style scoped>

.award-card-chip{
  font-size: 9px !important;
  font-weight: 400 !important;
  line-height: 6px !important;
  color:white !important;
}
.award-card-title{
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 24px !important;
}
.award-card-sub-title{
  font-size: 10px !important;

}
.award-card-data{
  font-size: 11px !important;
  font-weight: 400 !important;
}
.award-icons{
  font-size: 17px !important;
  font-weight: 400 !important;

}
</style>
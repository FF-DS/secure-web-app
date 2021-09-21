<template>
    <div class="text-center">
        <v-dialog
            v-model="dialog"
            class="font-weight-medium"
            max-width="800"
            persistent
            max-height="800"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-card-actions>
                    <v-btn text color="teal accent-4" @click="reveal = true" v-bind="attrs" v-on="on" class="tender-card-data">
                        Review
                    </v-btn>
                </v-card-actions>
            </template>

            
                <v-card class="tender-dialog-card" rounded=false >
                    <v-card-title class="headline grey lighten-2 tender-card-title" >  
                        <span class="primary--text"> Tender Review</span>
                        <v-chip label v-if="tenderData.delete_request" color="red" text-color="white" class="px-2 py-0 ml-5 delete-request" > <v-icon left class="tender-icons" >mdi-delete</v-icon> DELETE OPERATION REQUESTED </v-chip>
                        <v-spacer></v-spacer>
                        <TenderEditDialog v-if="viewEditDialog" :tenderData=" (tenderData.user_edit)? tenderData.user_edit : tenderData" @close_dialog="close_dialog" />
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
                                                <v-list-item-subtitle class="tender-card-data" :class="showChange(tenderData, 'title')? 'red--text' : ''" > {{ tenderData.title }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="tender-card-data green--text " v-if="showChange(tenderData, 'title')"  > <v-icon small color="green">mdi-autorenew</v-icon> {{ tenderData.user_edit.title }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Tender Id </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" :class="showChange(tenderData, 'tender_id')? 'red--text' : ''"  > {{ tenderData.tender_id }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="tender-card-data  green--text" v-if="showChange(tenderData, 'tender_id')" > <v-icon small color="green">mdi-autorenew</v-icon> {{ tenderData.user_edit.tender_id }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Mode of Procurement </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" :class="showChange(tenderData, 'mode_of_procurement')? 'red--text' : ''"  > {{ tenderData.mode_of_procurement  }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="tender-card-data  green--text" v-if="showChange(tenderData, 'mode_of_procurement')"  > <v-icon small color="green">mdi-autorenew</v-icon> {{ tenderData.user_edit.mode_of_procurement  }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-email-open</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Bid opening date </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" :class="showChange(tenderData, 'issued_date', 'date')? 'red--text' : ''" > {{ tenderData.issued_date }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="tender-card-data  green--text" v-if="showChange(tenderData, 'issued_date', 'date')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ tenderData.user_edit.issued_date }} </v-list-item-subtitle>
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
                                                <v-list-item-subtitle class="tender-card-data" :class="showChange(tenderData, 'country')? 'red--text' : ''" > {{ tenderData.country }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="tender-card-data  green--text" v-if="showChange(tenderData, 'country')"  > <v-icon small color="green">mdi-autorenew</v-icon> {{ tenderData.user_edit.country }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons"  >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" >  Sector </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" :class="showChange(tenderData, 'sector')? 'red--text' : ''"  > {{ tenderData.sector }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="tender-card-data  green--text" v-if="showChange(tenderData, 'sector')"  >  <v-icon small color="green">mdi-autorenew</v-icon> {{ tenderData.user_edit.sector }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Type </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" :class="showChange(tenderData, 'procurement_type')? 'red--text' : ''" > {{ tenderData.procurement_type }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="tender-card-data  green--text" v-if="showChange(tenderData, 'procurement_type')"  > <v-icon small color="green">mdi-autorenew</v-icon>  {{ tenderData.user_edit.procurement_type }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-send</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Bid closing date </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" :class="showChange(tenderData,  'closing_date', 'date')? 'red--text' : ''" > {{ tenderData.closing_date  }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="tender-card-data  green--text" v-if="showChange(tenderData, 'closing_date', 'date')" > <v-icon small color="green">mdi-autorenew</v-icon> {{ tenderData.user_edit.closing_date  }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col>
                                <v-card-title class="tender-card-title primary--text">
                                    Details
                                </v-card-title>
                                <v-card-text class="tender-card-data">
                                    <div v-html="tenderData.details"  :class="showChange(tenderData, 'details')? 'red--text' : ''" ></div>
                                    <span class="tender-card-data green--text" v-if="showChange(tenderData, 'details')" >
                                        <v-icon small color="green" >mdi-autorenew</v-icon> Updated to
                                    </span>
                                    <div  v-if="showChange(tenderData, 'details')" class="ml-5 green--text" v-html="tenderData.user_edit.details"></div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-card-title class="d-block tender-card-title primary--text"> Attachments </v-card-title>
                
                        <v-list>
                            <v-list-item-group >
                                <v-row>
                                    <v-col  cols="12" sm="6"  v-for="(file, index) in tenderData.file_links" :key="index">
                                        <v-list-item v-if="file.link && file.name" :class="!newFiles.has(file.public_file_name)? 'red lighten-5':''">
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
                                    <v-col  cols="12" sm="6"  v-for="(file, index) in (tenderData.edited_file_links? tenderData.edited_file_links.filter(file => !oldFiles.has(file.public_file_name) ) : []) " :key="'t'+index.toString()">
                                        <v-list-item v-if="file.link && file.name && !oldFiles.has(file.public_file_name)" class="green lighten-5">
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

                        <v-card-title class="d-block tender-card-title primary--text"> Company Information </v-card-title>
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
                                                <v-list-item-subtitle class="tender-card-data" :class="showChange(tenderData, 'company_id', 'object')? 'red--text' : ''"> {{ tenderData.company_id.name?  tenderData.company_id.name : 'Not available before' }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="tender-card-data green--text" v-if="showChange(tenderData, 'company_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ tenderData.user_edit.company_id.name? tenderData.user_edit.company_id.name : 'Not available now' }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Phone Number </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" :class="showChange(tenderData,'company_id', 'object')? 'red--text' : ''"> {{ tenderData.company_id.phone_number }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="tender-card-data green--text" v-if="showChange(tenderData, 'company_id', 'object')"  > <v-icon small color="green">mdi-autorenew</v-icon>  {{ tenderData.user_edit.company_id.phone_number? tenderData.user_edit.company_id.phone_number : 'Not available' }} </v-list-item-subtitle>
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
                                                <v-list-item-subtitle class="tender-card-data" :class="showChange(tenderData, 'company_id', 'object')? 'red--text' : ''"> {{ tenderData.company_id.email? tenderData.company_id.email : 'Not avaialbe before' }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="tender-card-data green--text" v-if="showChange(tenderData, 'company_id', 'object')" > <v-icon small color="green" >mdi-autorenew</v-icon>  {{ tenderData.user_edit.company_id.email ? tenderData.user_edit.company_id.email : 'Not available now' }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-email-open</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Physical address </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" :class="showChange(tenderData,  'company_id', 'object')? 'red--text' : ''"> {{ tenderData.company_id.physical_address? tenderData.company_id.physical_addres : 'Not available before' }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="tender-card-data green--text" v-if="showChange(tenderData, 'company_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ tenderData.user_edit.company_id.physical_address? tenderData.user_edit.company_id.physical_address : 'Not available now' }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container v-if="tenderData.award_id || (tenderData.user_edit && tenderData.user_edit.award_id)">
                        <v-divider></v-divider>
                        <v-card-title class="d-block tender-card-title primary--text"> Award Information </v-card-title>
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
                                                <v-list-item-subtitle class="tender-card-data" :class="showChange(tenderData,  'award_id', 'object')? 'red--text' : ''"> {{ tenderData.award_id && tenderData.award_id.title? tenderData.award_id.title : 'Not available before'  }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="tender-card-data green--text" v-if="showChange(tenderData, 'award_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon> {{ tenderData.user_edit.award_id && tenderData.user_edit.award_id.title? tenderData.user_edit.award_id.title : 'Not available now'   }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Published Date </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" :class="showChange(tenderData,  'award_id', 'object')? 'red--text' : ''" > {{ tenderData.award_id? tenderData.award_id.award_date : 'Not available before'    }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="tender-card-data green--text" v-if="showChange(tenderData, 'award_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon> {{ tenderData.user_edit.award_id && tenderData.user_edit.award_id.award_date? tenderData.user_edit.award_id.award_date : 'Not available now' }} </v-list-item-subtitle>
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
                                                <v-list-item-subtitle class="tender-card-data" :class="showChange(tenderData,  'award_id', 'object')? 'red--text' : ''" > {{ tenderData.award_id && tenderData.award_id.tender_identification? tenderData.award_id.tender_identification : 'Not available before'  }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="tender-card-data green--text" v-if="showChange(tenderData, 'award_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon> {{ tenderData.user_edit.award_id && tenderData.user_edit.award_id.tender_identification? tenderData.user_edit.award_id.tender_identification : 'Not available now' }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data" > Country </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data" :class="showChange(tenderData, 'award_id', 'object')? 'red--text' : ''" > {{ tenderData.award_id? tenderData.award_id.country : 'Not available before' }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="tender-card-data green--text" v-if="showChange(tenderData, 'award_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon> {{ tenderData.user_edit.award_id? tenderData.user_edit.award_id.country : 'Not available now' }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-divider></v-divider>
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-card-title class="tender-card-title primary--text">
                                    Award Details
                                </v-card-title>
                                <v-card-text class="tender-card-data">
                                    <div :class="showChange(tenderData, 'award_id', 'object')? 'red--text' : ''" v-html="tenderData.award_id? tenderData.award_id.details : 'Not available before'"></div>
                                    <span class="tender-card-data green--text" v-if="showChange(tenderData, 'award_id', 'object')" >
                                        <v-icon small color="green" >mdi-autorenew</v-icon> Updated to
                                    </span>
                                    <div  v-html="tenderData.user_edit.award_id? tenderData.user_edit.award_id.details : 'Not available now'" v-if="showChange(tenderData, 'award_id', 'object')"  class="tender-card-data green--text ml-5"></div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>

                        <v-form ref="form" v-model="valid" lazy-validation >
                        <v-row>
                            <v-col cols="12" sm="3">
                                <v-card-title class="d-block tender-card-title primary--text"> Give Review </v-card-title>
                            </v-col>
                            <v-col cols="12" sm="9">
                                <v-autocomplete
                                    clearable
                                    v-model="review_status" 
                                    dense
                                    :rules="statusTypeRules"
                                    class="tender-card-title mt-3 mr-2 mb-0"
                                    label = "Review status"
                                    :items= "review_types"
                                    >
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12">
                                <vue-editor  class="mx-1" v-model="review_note" ></vue-editor> 
                            </v-col>
                            <v-btn outlined :color=" getTenderError.type == 'tenderReviewError'? 'red': 'success' "  @click="giveReview()" class="tender-card-data ml-auto mr-4 mb-2" :loading="loadingForm">
                                Save
                                <v-icon small color="red" v-if="getTenderError.type == 'tenderReviewError'">mdi-exclamation</v-icon>
                            </v-btn>
                        </v-row>
                        </v-form>
                    </v-container>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-chip text :color="getStatus((tenderData.user_edit && tenderData.user_edit.status)? tenderData.user_edit.status : tenderData.status).color" text-color="white" class="tender-card-chip px-2 py-0" > <v-icon left class="tender-icons" > {{ getStatus((tenderData.user_edit && tenderData.user_edit.status)? tenderData.user_edit.status : tenderData.status).icon }} </v-icon>  {{  getStatus((tenderData.user_edit && tenderData.user_edit.status)? tenderData.user_edit.status : tenderData.status).message }} </v-chip>
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
import { mapGetters, mapActions } from "vuex";
import { VueEditor } from "vue2-editor";

export default {
    components:{
        TenderEditDialog,
        VueEditor
    },

    computed: {
        ...mapGetters(["getLoggedInState", "getUser", "getTenderError"]),
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
            review_note: "",
            valid: true,
            review_status: "",
            loadingForm: false,
            newFiles : new Set(),
            oldFiles : new Set(),
            review_types: ["Approved","Rejected","Published_By_User"],
            statusTypeRules: [
                v => !!v || 'Mode Of Procurment is required',
            ],
        } 
    },
    methods:{
        ...mapActions(["reviewTenders", "setSnakBarMessage", "usersReviewRequests"]),
        getUserType(){
            return this.getLoggedInState && this.getUser.role == 'Admin'
        },
        close_dialog(){
            this.dialog = false;
        },
        giveReview(){
            if( this.$refs.form.validate()) {
                this.loadingForm = true;
                let tenderParams = {
                    param: true,
                    params: {
                      tender_id : this.tenderData._id
                    }
                }
                let reviewData = {
                    status_message: this.review_note,
                    status : this.review_status
                }
                this.reviewTenders({reviewData: reviewData, params: tenderParams})
            }
        },
        showChange(data, field, type = null ){
            if(data && data.delete_request)
                return false;
            if (!data || !data[field])
                return (data && data.user_edit && data.user_edit[field])
            if(type == null  && (!data.user_edit || data[field] == data.user_edit[field]))
                return false;
            if(type == 'date' &&  (!data.user_edit || new Date(data[field]).toDateString() == new Date( data.user_edit[field]).toDateString() ))
                return false;
            if(type == 'object'  &&  (!data.user_edit || (data.user_edit[field] && data.user_edit[field]._id == data[field]._id ) ))
                return false
            return true;
        },
        showFileChanges(data){
            data.file_links.forEach( file => this.oldFiles.add(file.public_file_name))
            if(data.edited_file_links)
                data.edited_file_links.forEach( file => this.newFiles.add(file.public_file_name))
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
    created(){
        this.showFileChanges(this.tenderData)

        this.unwatch = this.$store.watch(
            (state, getters) => getters.getTenderError,
            (newValue, oldVal) => {
              oldVal;
              this.loadingForm = false;

              if(newValue.type == 'tenderReviewSuccess'){
                    this.dialog = false;
                    this.setSnakBarMessage({ message : 'The tender has been approved successfully.', random: new Date().getTime() })
                    this.usersReviewRequests()
              }
            }
        );
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
.delete-request{
  font-size: 13px !important;
  font-weight: 400 !important;
}
</style>
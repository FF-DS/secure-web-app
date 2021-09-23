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
                    <v-btn text color="teal accent-4" @click="reveal = true" v-bind="attrs" v-on="on" class="award-card-data">
                        Review
                    </v-btn>
                </v-card-actions>
            </template>

            
                <v-card class="vuetify-compos">
                    <v-card-title class="headline grey lighten-2 award-card-title">
                        <span class="primary--text">Award Review</span>
                        <v-chip label v-if="awardData.delete_request" color="red" text-color="white" class="px-2 py-0 ml-5 delete-request" > <v-icon left class="award-icons" >mdi-delete</v-icon> DELETE OPERATION REQUESTED </v-chip>
                        <v-spacer></v-spacer>
                        <AwardEditDialog v-if="viewEditDialog" :awardData=" (awardData.user_edit)? awardData.user_edit : awardData" @close_dialog="close_dialog" />
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
                                                <v-list-item-subtitle class="award-card-data" :class="showChange(awardData, 'title')? 'red--text' : ''"  > {{ awardData.title  }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'title')" > <v-icon small color="green">mdi-autorenew</v-icon> {{ awardData.user_edit.title  }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Published Date </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" :class="showChange(awardData, 'award_date')? 'red--text' : ''" > {{ awardData.award_date }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'award_date')" > <v-icon small color="green">mdi-autorenew</v-icon> {{ awardData.user_edit.award_date }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-email-open</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Publisher </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" :class="showChange(awardData, 'company_id', 'object')? 'red--text' : ''"  > {{ awardData.company_id.name }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'company_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon> {{ awardData.user_edit.company_id.name }} </v-list-item-subtitle>
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
                                                <v-list-item-subtitle class="award-card-data"  :class="showChange(awardData, 'tender_identification')? 'red--text' : ''" > {{ awardData.tender_identification }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'tender_identification')" > <v-icon small color="green">mdi-autorenew</v-icon> {{ awardData.user_edit.tender_identification }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Country </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data"  :class="showChange(awardData, 'country')? 'red--text' : ''" > {{ awardData.country }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'country')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ awardData.user_edit.country }} </v-list-item-subtitle>
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
                        <v-card-title class="d-block award-card-title primary--text"> Winner Companies </v-card-title>
                            <v-list>
                                <v-list-item-group>
                                    <v-layout row>
                                        <v-flex xs12 sm6>
                                            <v-list-item class="ma-1" v-for=" (company, index) in awardData.winner_companies" :key="index" :class="!newCompanies.has(company._id) && (awardData.user_edit && awardData.user_edit.winner_companies)? 'red lighten-5': ''">
                                                <v-list-item-icon>
                                                    <v-icon class="award-icons" >mdi-phone</v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>
                                                    <v-list-item-title class="award-card-data" > {{company.name}} </v-list-item-title>
                                                    <v-list-item-subtitle class="award-card-data" >  {{company.phone_number}} </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-flex>
                                        <v-flex xs12 sm6 >
                                            <v-list-item v-for=" (company, index) in (awardData.user_edit && awardData.user_edit.winner_companies? awardData.user_edit.winner_companies.filter( (company) => !oldCompanies.has(company._id) ) : [])" :key=" 'x' + index.toString()" class="green lighten-5 ma-1">
                                                <v-list-item-icon>
                                                    <v-icon class="award-icons" >mdi-phone</v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>
                                                    <v-list-item-title class="award-card-data" > {{company.name}} </v-list-item-title>
                                                    <v-list-item-subtitle class="award-card-data" >  {{company.phone_number}} </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-flex>
                                    </v-layout>
                                </v-list-item-group>
                            </v-list>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col>
                                <v-card-title class="award-card-title primary--text">
                                    Details
                                </v-card-title>
                                <v-card-text class="award-card-data">
                                    <div v-html="awardData.details" :class="showChange(awardData, 'details')? 'red--text' : ''" ></div>
                                    <div v-html="awardData.user_edit.details" v-if="showChange(awardData, 'details')"  class="award-card-data green--text"></div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-card-title class="d-block primary--text"> Attachments </v-card-title>
                
                        <v-list>
                            <v-list-item-group >
                                <v-layout row>
                                    <v-flex xs12 sm6 v-for="(file, index) in awardData.file_links" :key="index">
                                        <v-list-item v-if="file.link && file.name" :class="!newFiles.has(file.public_file_name)? 'red lighten-5':''">
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" > mdi-file-pdf</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content >
                                                <a :href="file.link" target="_blank"> 
                                                    <v-list-item-title  class="award-card-data" >  {{ file.name }} <v-icon small class="mx-2">mdi-open-in-new</v-icon>  </v-list-item-title>
                                                </a>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-flex>
                                    <v-flex xs12 sm6  v-for="(file, index) in (awardData.edited_file_links? awardData.edited_file_links.filter(file => !oldFiles.has(file.public_file_name) ) : []) " :key="'t'+index.toString()">
                                        <v-list-item v-if="file.link && file.name && !oldFiles.has(file.public_file_name)" class="green lighten-5">
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" > mdi-file-pdf</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content >
                                                <a :href="file.link" target="_blank"> 
                                                    <v-list-item-title  class="award-card-data" > {{ file.name }} <v-icon small class="mx-2">mdi-open-in-new</v-icon>  </v-list-item-title>
                                                </a>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-flex>
                                </v-layout>
                            </v-list-item-group>
                        </v-list>
                        <v-divider></v-divider>

                        <v-card-title class="d-block award-card-title primary--text"> Company Information </v-card-title>
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
                                                    <v-list-item-subtitle class="award-card-data" :class="showChange(awardData, 'company_id', 'object')? 'red--text' : ''"  > {{ awardData.company_id.name }} </v-list-item-subtitle>
                                                    <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'company_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ awardData.user_edit.company_id.name }} </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-icon>
                                                    <v-icon class="award-icons" >mdi-star</v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>
                                                    <v-list-item-title class="award-card-data" > Phone Number </v-list-item-title>
                                                    <v-list-item-subtitle class="award-card-data"  :class="showChange(awardData, 'company_id', 'object')? 'red--text' : ''" > {{ awardData.company_id.phone_number? awardData.company_id.phone_number : 'Not available before' }} </v-list-item-subtitle>
                                                    <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'company_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ awardData.user_edit.company_id.phone_number? awardData.company_id.phone_number : 'Not available now' }} </v-list-item-subtitle>
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
                                                    <v-list-item-subtitle class="award-card-data" :class="showChange(awardData, 'company_id', 'object')? 'red--text' : ''" > {{ awardData.company_id.email? awardData.company_id.email : 'Not available before' }} </v-list-item-subtitle>
                                                    <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'company_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ awardData.user_edit.company_id.email? awardData.company_id.email : 'Not available now' }} </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-icon>
                                                    <v-icon class="award-icons" >mdi-email-open</v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>
                                                    <v-list-item-title class="award-card-data" > Physical address </v-list-item-title>
                                                    <v-list-item-subtitle class="award-card-data"  :class="showChange(awardData, 'company_id', 'object')? 'red--text' : ''" > {{ awardData.company_id.physical_address? awardData.company_id.physical_address : 'Not available before' }} </v-list-item-subtitle>
                                                    <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'company_id', 'object')"  > <v-icon small color="green">mdi-autorenew</v-icon>  {{ awardData.user_edit.company_id.physical_address? awardData.company_id.physical_address : 'Not available now' }} </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                </v-col>
                            </v-row>
                    </v-container>
                    <v-container v-if="awardData.tender_id || (awardData.user_edit && awardData.user_edit.tender_id)">
                        <v-divider  ></v-divider>
                        <v-card-title class="d-block tender-card-title primary--text"> Tender Information </v-card-title>
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
                                                <v-list-item-subtitle class="award-card-data" :class="showChange(awardData, 'tender_id', 'object')? 'red--text' : ''" > {{ awardData.tender_id? awardData.tender_id.title : 'Not available before' }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'tender_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ awardData.user_edit.tender_id.title }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Tender Id </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data"  :class="showChange(awardData, 'tender_id', 'object')? 'red--text' : ''" > {{ awardData.tender_id? awardData.tender_id.tender_id : 'Not available before' }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'tender_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ awardData.user_edit.tender_id.tender_id }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Mode of Procurement </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data"  :class="showChange(awardData, 'tender_id', 'object')? 'red--text' : ''" > {{ awardData.tender_id? awardData.tender_id.mode_of_procurement : 'Not available before'  }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'tender_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ awardData.user_edit.tender_id.mode_of_procurement  }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-email-open</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Bid opening date </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data"  :class="showChange(awardData, 'tender_id', 'object')? 'red--text' : ''" > {{ awardData.tender_id? awardData.tender_id.issued_date : 'Not available before'  }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'tender_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon> {{ awardData.user_edit.tender_id.issued_date }} </v-list-item-subtitle>
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
                                                <v-list-item-subtitle class="award-card-data"  :class="showChange(awardData, 'tender_id', 'object')? 'red--text' : ''" > {{ awardData.tender_id? awardData.tender_id.country : 'Not available before' }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'tender_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ awardData.user_edit.tender_id.country }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons"  >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" >  Sector </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" :class="showChange(awardData, 'tender_id', 'object')? 'red--text' : ''"  > {{ awardData.tender_id? awardData.tender_id.sector : 'Not available before' }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'tender_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ awardData.user_edit.tender_id.sector }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Type </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data"  :class="showChange(awardData, 'tender_id', 'object')? 'red--text' : ''" > {{ awardData.tender_id? awardData.tender_id.procurement_type : 'Not available before' }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'tender_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ awardData.user_edit.tender_id.procurement_type }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-send</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Bid closing date </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" :class="showChange(awardData, 'tender_id', 'object')? 'red--text' : ''"  > {{ awardData.tender_id? awardData.tender_id.closing_date : 'Not available before'  }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="award-card-data green--text" v-if="showChange(awardData, 'tender_id', 'object')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ awardData.user_edit.tender_id.closing_date  }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col>
                                <v-card-title class="award-card-title primary--text">
                                    Tender Details
                                </v-card-title>
                                <v-card-text class="award-card-data">
                                    <div  v-html="awardData.tender_id? awardData.tender_id.details : 'Not available before'" :class="showChange(awardData, 'tender_id', 'object')? 'red--text' : ''" ></div>
                                    <div v-html="awardData.user_edit.tender_id.details" v-if="showChange(awardData, 'tender_id', 'object')" class=" green--text"></div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-form ref="form" v-model="valid" lazy-validation >
                        <v-row>
                            <v-col cols="12" sm="3">
                                <v-card-title class="d-block award-card-title primary--text"> Give Review </v-card-title>
                            </v-col>
                            <v-col cols="12" sm="9">
                                <v-autocomplete
                                    clearable
                                    v-model="review_status" 
                                    :rules="statusTypeRules"
                                    dense
                                    class="tender-card-title mt-3 mr-2 mb-0"
                                    label = "Review status"
                                    :items= "review_types"
                                    >
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12">
                                <vue-editor class="mx-1" v-model="review_note" ></vue-editor> 
                            </v-col>
                            <v-btn :color=" getAwardError.type == 'awardReviewError'? 'red': 'success' " outlined @click="giveReview()" class="award-card-data  ml-auto mr-4 mb-2" :loading="loadingForm">
                                Save
                                <v-icon small color="red" v-if="getAwardError.type == 'awardReviewError'">mdi-exclamation</v-icon>
                            </v-btn>
                        </v-row>
                        </v-form>
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
import { mapGetters, mapActions } from "vuex";
import { VueEditor } from "vue2-editor";

export default {
    components: {
        AwardEditDialog,
        VueEditor
    },

    computed: {
        ...mapGetters(["getLoggedInState", "getUser", "getAwardError"]),
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
            review_status: "",
            newFiles: new Set(),
            oldFiles: new Set(),
            valid: true,
            statusTypeRules: [
                v => !!v || 'Mode Of Procurment is required',
            ],
            newCompanies: new Set(),
            oldCompanies: new Set(),
            loadingForm: false,
            review_types: ["Approved","Rejected","Published_By_User"]
        } 
    },
    methods:{
        ...mapActions(["reviewAwards", "setSnakBarMessage", "usersReviewRequests"]),
        close_dialog(){
            this.dialog = false;
        },
        giveReview(){
            if( this.$refs.form.validate()) {
                this.loadingForm = true;
                let awardParams = {
                    param: true,
                    params: {
                    award_id : this.awardData._id
                    }
                }
                let reviewData = {
                    status_message: this.review_note,
                    status : this.review_status
                }
                this.reviewAwards({reviewData: reviewData, params: awardParams})
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
            if(type == 'object'  &&  (!data.user_edit || data.user_edit[field]._id == data[field]._id ))
                return false
            return true;
        },
        showFileChanges(data){
            data.file_links.forEach( file => this.oldFiles.add(file.public_file_name))
            if(data.edited_file_links)
                data.edited_file_links.forEach( file => this.newFiles.add(file.public_file_name))
        },
        showCompaniesChange(data){
            data.winner_companies.forEach( company => this.oldCompanies.add( company._id))
            if(data.user_edit && data.user_edit.winner_companies)
                data.user_edit.winner_companies.forEach( company => this.newCompanies.add(company._id))
        }
    },
    created(){
        this.showFileChanges(this.awardData)
        this.showCompaniesChange(this.awardData)

        this.unwatch = this.$store.watch(
            (state, getters) => getters.getAwardError,
            (newValue, oldVal) => {
              oldVal;
              this.loadingForm = false;

               if(newValue.type == 'awardReviewSuccess'){
                    this.dialog = false;
                    this.setSnakBarMessage({ message : 'The award has been approved successfully.', random: new Date().getTime() })
                    this.usersReviewRequests()
              }
              
            }
        );
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
.delete-request{
  font-size: 13px !important;
  font-weight: 400 !important;
}
</style>
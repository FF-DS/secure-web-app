<template>
    <div class="text-center">
        <v-dialog
            v-model="dialog"
            class="font-weight-medium"
            max-width="800"
            persistent
            max-height="500"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-card-actions>
                    <v-btn text color="teal accent-4" @click="reveal = true" v-bind="attrs" v-on="on" class="company-card-data">
                        Review
                    </v-btn>
                </v-card-actions>
            </template>

            
                <v-card class="vuetify-compos">
                    <v-card-title class="headline grey lighten-2 company-card-title">
                        <span class="primary--text" >Company Review</span>
                        <v-chip label v-if="companyData.delete_request" color="red" text-color="white" class="px-2 py-0 ml-5 delete-request" > <v-icon left class="company-icons" >mdi-delete</v-icon> DELETE OPERATION REQUESTED </v-chip>
                        <v-chip label v-if="companyData.avatar_edited" color="green" text-color="white" class="px-2 py-0 ml-5 delete-request" > <v-icon left class="company-icons" >mdi-autorenew</v-icon> COMPANY LOGO UPDATED </v-chip>
                        <v-spacer></v-spacer>
                        <CompanyEditDialog v-if="viewEditDialog"  :companyData=" (companyData.user_edit)? companyData.user_edit : companyData" @close_dialog="close_dialog" />
                        <v-icon color="gray" class="ml-3" @click="dialog = false"> mdi-close</v-icon>
                    </v-card-title>

                    <v-container>
                        <v-list>
                            <v-row>
                                <v-col  cols="12" sm="6" >
                                    <v-list-item-group >
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <img width="25" :src="companyData.edited_avatar"  v-if="companyData.edited_avatar"  />
                                                <img width="25" :src="companyData.avatar? companyData.avatar : '/logo/tendermap.png' " v-else />
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="company-card-data"> Name <v-icon>mdi-link</v-icon>  </v-list-item-title>
                                                <v-list-item-subtitle class="company-card-data" :class="showChange(companyData, 'name')? 'red--text' : ''" > {{ companyData.name }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="company-card-data green--text"  v-if="showChange(companyData, 'name')"  > <v-icon small color="green">mdi-autorenew</v-icon> {{ companyData.user_edit.name }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="company-icons" >mdi-phone</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="company-card-data"> Phone number </v-list-item-title>
                                                <v-list-item-subtitle class="company-card-data" :class="showChange(companyData, 'phone_number')? 'red--text' : ''" > {{ companyData.phone_number? companyData.phone_number : 'Not available before' }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="company-card-data green--text"  v-if="showChange(companyData, 'phone_number')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ companyData.user_edit && companyData.user_edit.phone_number? companyData.user_edit.phone_number : 'Not available now' }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="company-icons" >mdi-email</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="company-card-data"> Email </v-list-item-title>
                                                <v-list-item-subtitle class="company-card-data" :class="showChange(companyData, 'email')? 'red--text' : ''"> {{ companyData.email? companyData.email: 'Not available before' }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="company-card-data green--text"  v-if="showChange(companyData, 'email')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ companyData.user_edit && companyData.user_edit.email? companyData.user_edit.email: 'Not available now' }} </v-list-item-subtitle>
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
                                                <v-list-item-subtitle class="company-card-data"  :class="showChange(companyData, 'physical_address')? 'red--text' : ''"> {{ companyData.physical_address }}  <span v-if="companyData.physical_address && companyData.country">/</span> {{ companyData.country  }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="company-card-data green--text"  v-if="showChange(companyData, 'physical_address')" >  <v-icon small color="green">mdi-autorenew</v-icon> {{ companyData.user_edit && companyData.user_edit.physical_address }} / {{ companyData.user_edit.country  }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="company-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="company-card-data"> P.O Box </v-list-item-title>
                                                <v-list-item-subtitle class="company-card-data" :class="showChange(companyData, 'pobox')? 'red--text' : ''"> {{ companyData.pobox? companyData.pobox: 'Not available before'  }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="company-card-data green--text" v-if="showChange(companyData, 'pobox')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ companyData.user_edit && companyData.user_edit.pobox? companyData.user_edit.pobox: 'Not available now' }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="company-icons" >mdi-send</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="company-card-data"> Fax </v-list-item-title>
                                                <v-list-item-subtitle class="company-card-data" :class="showChange(companyData, 'fax')? 'red--text' : ''"> {{ companyData.fax? companyData.fax: 'Not available before' }} </v-list-item-subtitle>
                                                <v-list-item-subtitle class="company-card-data green--text" v-if="showChange(companyData, 'fax')" > <v-icon small color="green">mdi-autorenew</v-icon>  {{ companyData.user_edit && companyData.user_edit.fax? companyData.user_edit.fax: 'Not available now' }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" >
                                    <v-list-item-content>
                                        <v-card-title class="company-card-title primary--text">Categories</v-card-title>
                                        <v-card-subtitle>
                                            <span v-for="(data, index) in companyData.category" :key="index">
                                                <v-chip color="darkgray" class="ma-1 company-card-chip" :class="!(newCategories.has(data))? 'red lighten-4': ''" > {{ data }} </v-chip>
                                            </span>
                                            <span v-for="(data, index) in (companyData.user_edit && companyData.user_edit.category? companyData.user_edit.category : [])" :key="'c'+index.toString()">
                                                <span v-if="companyData.user_edit && companyData.user_edit.category && !(oldCategories.has(data))">
                                                    <v-chip color="darkgray" class="ma-1 company-card-chip green lighten-4" > {{ data }} </v-chip>
                                                </span>
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
                                    <div v-html="companyData.description" :class="showChange(companyData, 'description')? 'red--text' : ''" ></div>
                                    <div v-html="companyData.user_edit.description" class="company-card-data green--text"  v-if="showChange(companyData, 'description')"></div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-card-title class="d-block company-card-title primary--text"> Attachments </v-card-title>
                
                        <v-list>
                            <v-list-item-group >
                                <v-row>
                                    <v-col  cols="12" sm="6"  v-for="(file, index) in companyData.file_links" :key="index">
                                        <v-list-item v-if="file.link && file.name"  :class="!newFiles.has(file.public_file_name)? 'red lighten-5':''">
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
                                    <v-col  cols="12" sm="6"  v-for="(file, index) in (companyData.edited_file_links? companyData.edited_file_links.filter(file => !oldFiles.has(file.public_file_name) ) : []) " :key="'t'+index.toString()">
                                        <v-list-item v-if="file.link && file.name && !oldFiles.has(file.public_file_name)" class="green lighten-5">
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
                        <v-divider></v-divider>
                        <v-form ref="form" v-model="valid" lazy-validation >
                        <v-row>
                            <v-col cols="12" sm="3">
                                <v-card-title class="d-block company-card-title primary--text"> Give Review </v-card-title>
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
                            <v-btn :color=" getCompanyError.type == 'companyReviewError'? 'red': 'success' " outlined @click="giveReview()" class="company-card-data  ml-auto mr-4 mb-2" :loading="loadingForm">
                                Save
                                <v-icon small color="red" v-if="getCompanyError.type == 'companyReviewError'">mdi-exclamation</v-icon>
                            </v-btn>
                        </v-row>
                        </v-form>
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
import { mapGetters, mapActions } from "vuex";
import { VueEditor } from "vue2-editor";

export default {
    name: 'Review',
    components: {
        CompanyEditDialog,
        VueEditor,
    },

    computed: {
        ...mapGetters(["getLoggedInState", "getUser", "getCompanyError"]),
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
            valid: true,
            statusTypeRules: [
                v => !!v || 'Mode Of Procurment is required',
            ],
            loadingForm: false,
            newFiles : new Set(),
            oldFiles : new Set(),
            newCategories : (this.companyData.user_edit && this.companyData.user_edit.category)? new Set(this.companyData.user_edit.category) : new Set(this.companyData.category),
            oldCategories : new Set(this.companyData.category),
            review_types: ["Approved","Rejected","Published_By_User"]
        } 
    },
    methods:{
        ...mapActions(["reviewCompanies",  "setSnakBarMessage", "usersReviewRequests"]),
        getUserType(){
            return this.getLoggedInState && this.getUser.role == 'Admin'
        },
        close_dialog(){
            this.dialog = false;
        },
        giveReview(){
            if( this.$refs.form.validate()) {
                this.loadingForm = true;
                let companyParams = {
                    param: true,
                    params: {
                    company_id : this.companyData._id
                    }
                }
                let reviewData = {
                    status_message: this.review_note,
                    status : this.review_status
                }
                this.reviewCompanies({reviewData: reviewData, params: companyParams})
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
        }
    },
    created(){
        this.showFileChanges(this.companyData)

        this.unwatch = this.$store.watch(
            (state, getters) => getters.getCompanyError,
            (newValue, oldVal) => {
              oldVal;
              this.loadingForm = false;

              if(newValue.type == 'companyReviewSuccess'){
                    this.dialog = false;
                    this.setSnakBarMessage({ message : 'The company has been approved successfully.', random: new Date().getTime() })
                    this.usersReviewRequests()
              }
              
            }
        );
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

.delete-request{
  font-size: 13px !important;
  font-weight: 400 !important;
}
</style>
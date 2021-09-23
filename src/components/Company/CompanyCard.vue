<template>
    <v-hover>
        <template v-slot:default="{ hover }">
            <v-card
                class="mx-auto mb-5"
                :elevation="hover ? 12 : 4"
                :hover = true
                @click = "selectedValue"
            >
                <v-list-item three-line dense>
                    <v-list-item-content>
                        <v-row dense>
                            <v-col cols="12" sm="5">
                                <v-chip label v-if="userServicePage || adminServicePage" :color="getStatus(companyData.status).color" text-color="white" class="award-card-chip px-2 py-0" > <v-icon left class="company-icons" color="white" > {{ getStatus(companyData.status).icon }} </v-icon>  {{companyData.status }} </v-chip>

                                <v-list-item-content>
                                    <v-card-title class="headline mb-1 company-card-title"> {{ companyData.name }} </v-card-title>
                                    <v-card-subtitle>
                                        <span v-for="(data, index) in companyData.category" class="company-card-sub-title" :key="index">
                                            <v-chip color="gray" class="ma-1 company-card-chip" > {{ data }} </v-chip>
                                        </span>
                                    </v-card-subtitle>
                                </v-list-item-content>
                                <CompanyReview :companyData=companyData  v-if="adminServicePage"  />
                                <CompanyDetailCard :companyData=companyData v-else />
                            </v-col>
                    
                            <v-divider vertical inset></v-divider>
                
                            <v-col class="ml-5 pa-3" cols="12" sm="6" >
                                <v-list>
                                    <v-list-item-group >
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="company-icons" >mdi-phone</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="company-card-data"> Phone Number </v-list-item-title>
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
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="company-icons" >mdi-send</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="company-card-data"> Address </v-list-item-title>
                                                <v-list-item-subtitle class="company-card-data"> {{ companyData.physical_address }} / {{ companyData.country  }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>        
                    </v-list-item-content>

                    <v-list-item-avatar tile size="60"  v-if="!$vuetify.breakpoint.xsOnly">
                        <v-img :src="companyData.avatar? companyData.avatar : '/logo/tendermap.png' "></v-img>
                    </v-list-item-avatar>
                </v-list-item>
            </v-card>
        </template>
    </v-hover>
</template>


<script>
import CompanyDetailCard from '@/components/Company/CompanyDetailCard';
import CompanyReview from '@/components/Company/CompanyReview';
import { mapActions } from "vuex";

export default {
    components: {
        CompanyDetailCard,
        CompanyReview
    },
    data (){
        return { show: false, model: 1,}
    },
    computed: {
        userServicePage() {
            return this.$route.name == 'my-service';
        },
        adminServicePage() {
            return this.$route.name == 'admin-service';
        },
    },
    methods:{
        ...mapActions(["setSelectedObject"]),
        getStatus(status){
            if(status == 'Approved')
                return { icon : 'mdi-check', color: 'green' }
            else if(status == 'Published_By_User')
                return { icon : 'mdi-progress-check', color: 'orange' }
            else if(status == 'Under_Review')
                return { icon : 'mdi-clock', color: 'orange' }
            else if(status == 'Rejected')
                return { icon : 'mdi-close', color: 'red' }
        },
        selectedValue(){
            this.setSelectedObject(this.companyData)
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
.award-card-chip{
  font-size: 9px !important;
  font-weight: 400 !important;
  line-height: 6px !important;
  color:white !important;
}

</style>
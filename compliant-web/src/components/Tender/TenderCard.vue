<template>
    <v-hover>
        <template v-slot:default="{ hover }">
            <v-card
                class="mx-auto mb-5"
                :elevation="hover ? 12 : 4"
                :hover = true
                @click = "selectedValue"
            >
                <v-list-item three-line>
                    <v-list-item-content>
                        <v-row row>
                            <v-col  cols="12" sm="5" >
                                <v-chip label v-if="userServicePage || adminServicePage" :color="getStatus(tenderData.status).color" text-color="white" class="tender-card-chip px-2 py-0" > <v-icon left class="tender-icons" > {{ getStatus(tenderData.status).icon }} </v-icon>  {{tenderData.status }} </v-chip>
                                <v-chip label v-else :color="getDateStatus(tenderData.closing_date).color" text-color="white" class="tender-card-chip px-2 py-0" > <v-icon left class="tender-icons" > {{ getDateStatus(tenderData.closing_date).icon }} </v-icon>  {{ getDateStatus(tenderData.closing_date).message }} </v-chip>
                                <v-list-item-content>
                                    <v-card-title class="headline mb-1 tender-card-title" > {{ tenderData.title }} </v-card-title>
                                    <v-card-subtitle class="mb-1 tender-card-sub-title" > {{ tenderData.company_id.name }} </v-card-subtitle>

                                </v-list-item-content>

                                <TenderReview  :tenderData=tenderData v-if="adminServicePage"  />
                                <TenderDetailCard :tenderData=tenderData  v-else />
                            </v-col>
                    
                            <v-divider vertical inset></v-divider>
                
                            <v-col  cols="12" sm="6"   class="ml-5 pa-3">
                                <v-list>
                                    <v-list-item-group >
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons">mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content >
                                                <v-list-item-title class="tender-card-data"> Sector </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data"> {{ tenderData.sector }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons">mdi-send</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content >
                                                <v-list-item-title class="tender-card-data"> Bid closing date </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data"> {{ tenderData.closing_date }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="tender-icons">mdi-email-open</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="tender-card-data"> Bid opening date </v-list-item-title>
                                                <v-list-item-subtitle class="tender-card-data">  {{ tenderData.issued_date }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>        
                    </v-list-item-content>

                    <v-list-item-avatar tile size="50" v-if="!$vuetify.breakpoint.xsOnly">
                        <v-img :src="tenderData.company_id.avatar? tenderData.company_id.avatar : '/logo/tendermap.png' "></v-img>
                    </v-list-item-avatar>
                </v-list-item>
            </v-card>
        </template>
    </v-hover>
</template>


<script>
import TenderDetailCard from '@/components/Tender/TenderDetailCard';
import TenderReview from '@/components/Tender/TenderReview';
import { mapActions } from "vuex";

export default {
    components: {
        TenderDetailCard,
        TenderReview
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
                return { icon : 'mdi-check', color: 'green', message : 'Approved' }
            else if(status == 'Published_By_User')
                return { icon : 'mdi-progress-check', color: 'orange', message : 'Published By User' }
            else if(status == 'Under_Review')
                return { icon : 'mdi-clock', color: 'orange',  message : 'Under Review'  }
            else if(status == 'Rejected')
                return { icon : 'mdi-alarm-check', color: 'red', message : 'Rejected' }
        },
        getDateStatus(date){
            let currDate =  new Date()
            if( new Date(date) > currDate)
                return { icon : 'mdi-check', color: 'green',  message: 'Currently open' }
            else
                return { icon : 'mdi-alarm-check', color: 'red',  message: 'Currently closed' }
        },
        selectedValue(){
            this.setSelectedObject(this.tenderData)
        }
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
</style>
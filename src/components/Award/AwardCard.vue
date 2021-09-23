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
                                <v-chip label :color="getStatus(awardData.status).color" text-color="white" class="award-card-chip px-2 py-0" > <v-icon left class="award-icons" > {{ getStatus(awardData.status).icon }} </v-icon>  {{awardData.status }} </v-chip>
                                <v-list-item-content>
                                    <v-card-title class="headline mb-1 award-card-title"> {{ awardData.title }} </v-card-title>
                                    <v-card-subtitle class="award-card-sub-title"> {{ awardData.award_date }} </v-card-subtitle>
                                </v-list-item-content>

                                <AwardReview :awardData=awardData v-if="adminServicePage" />
                                <AwardDetailCard :awardData=awardData v-else  />
                            </v-col>
                    
                            <v-divider vertical inset></v-divider>
                
                            <v-col class="ml-5 pa-3"  cols="12" sm="6" >
                                <v-list>
                                    <v-list-item-group >
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-inbox</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Publisher </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.company_id.name }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-star</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" >  Tender Id </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.tender_identification }} </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon class="award-icons" >mdi-send</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title class="award-card-data" > Country </v-list-item-title>
                                                <v-list-item-subtitle class="award-card-data" > {{ awardData.country }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>        
                    </v-list-item-content>

                    <v-list-item-avatar tile size="50" v-if="!$vuetify.breakpoint.xsOnly">
                        <v-img src="/logo/tendermap.png"></v-img>
                    </v-list-item-avatar>
                </v-list-item>
            </v-card>
        </template>
    </v-hover>
</template>


<script>
import AwardDetailCard from '@/components/Award/AwardDetailCard';
import AwardReview from '@/components/Award/AwardReview';
import { mapActions } from "vuex";

export default {
    components: {
        AwardDetailCard,
        AwardReview
    },
    data (){
        return { show: false, model: 1,}
    },
    computed: {
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
            this.setSelectedObject(this.awardData)
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
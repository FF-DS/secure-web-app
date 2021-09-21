<template>
   <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"

        class="date-picker ma-0 pa-0"
    >
        <template v-slot:activator="{ on, attrs }" class="ma-0 pa-0">
            <v-text-field
                v-model="date"
                :label="label"
                prepend-icon="mdi-calendar"
                readonly
                dense
                v-bind="attrs"
                v-on="on"
                class="date-picker ma-0 pa-0"
            ></v-text-field>
        </template>

        <v-date-picker v-model="date" type="date" no-title scrollable  :allowed-dates="checkDate" >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false" class="date-picker"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date); datePicked()" class="date-picker"> OK </v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return { date: null, menu: false, modal: false, }
    },
    computed: {
      ...mapGetters(["getDatePickerResetState", "getClosingDateValueStatus"]),
    },
    props: ['label', 'date_value'],
    methods: {
        datePicked(){
            this.$emit('date' , this.date)
        },
        checkDate(date){
            if( (this.label == 'Closing starting date' || this.label == 'Closing date' || this.label == 'Closing ending date') && this.getClosingDateValueStatus == 'Open' ){
                return new Date(date) > new Date()
            }
            return true
        }    
    },
    created(){
        this.date = this.date_value
        
        if( (!this.date || new Date(this.date) < new Date()) && (this.label == 'Closing starting date' || this.label == 'Closing date') && this.getClosingDateValueStatus == 'Open' ){
            // let date = new Date()
            // date.setDate(date.getDate() + 1)
            this.date = '' // date.toISOString().split('T')[0];
        }


        this.unwatch = this.$store.watch(
            (state, getters) => getters.getDatePickerResetState,
            (newValue, oldVal) => {
              this.date = null;
              newValue; oldVal;
            }
        );

        this.unwatch = this.$store.watch(
            (state, getters) => getters.getClosingDateValueStatus,
            (newValue, oldVal) => {
                newValue; oldVal;
                if( (!this.date || new Date(this.date) < new Date()) && (this.label == 'Closing starting date' || this.label == 'Closing date') && this.getClosingDateValueStatus == 'Open' ){
        //             let date = new Date()
        //             date.setDate(date.getDate() + 1)
        //             this.date =  date.toISOString().split('T')[0];
                    this.date = '' 
                }
            }
        );
    }
    
}
</script>

<style scoped>
    .date-picker{
        transform: scale(0.8);
        margin: 0px !important;
        font-size: 15px !important;
        font-weight: 400 !important;
    }

</style>
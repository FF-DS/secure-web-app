<template>
    <v-list-item class="px-2" @click="profileDialogView()">
        <v-list-item-avatar>
        <v-img :src="getUser.avatar ? getUser.avatar : '/res/user_pic.png' "></v-img>
        </v-list-item-avatar>

        <v-list-item-title  >{{  getUser.name.split('/%/')[0] + ' ' + getUser.name.split('/%/')[1]  }}</v-list-item-title>

        <!-- <v-btn icon @click.stop="mini = !mini"> </v-btn> -->
    </v-list-item>
</template>

<script>
import {  mapGetters, mapActions } from "vuex";

export default {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    data: () => ({
    }),
    computed: {
         ...mapGetters(["getSideBarState","getProfileDialogState", "getUser"]),
    },
    methods: {
        ...mapActions(["setProfileDialogState", "setTenderTitles", "setTenderProcurment", "setAwardTitle"]),
        profileDialogView() {
            if(this.closeProfile)
                return false;
    
            this.setProfileDialogState( !this.getProfileDialogState );
        },
    },
    created(){
        this.setTenderProcurment();
        this.setTenderTitles();
        this.setAwardTitle();
    },
    props:['closeProfile']
}
</script>
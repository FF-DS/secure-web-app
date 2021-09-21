<template>
    <div class="mr-0">
        <v-navigation-drawer @transitionend="updateState" width="70px" :value="getSideBarState" bottom dark app>
            <v-list nav>
                <Profile/>
                <v-divider></v-divider>

                <v-list dense >
                    <v-list-item
                        v-for="item in items[getUserType]"
                        :key="item.title"
                        link
                        @click=" excuteRequest( item.title ) "
                    >
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-list-item-icon v-bind="attrs" v-on="on" :style=" $vuetify.breakpoint.mdAndDown? '' : 'position:absolute; left:0%' " >
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-icon>
            
                                <v-list-item-content v-if="! $vuetify.breakpoint.lgAndUp" >
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item-content>
                    
                            </template>
                            <span>{{ item.title }}</span>
                        </v-tooltip>
                    </v-list-item>
                </v-list>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import {  mapActions, mapGetters } from "vuex";
import Profile from "@/components/User/Profile"

export default {
    components: {
        Profile,
    },
    data: () => ({
        drawer: true,
        items: { 
            'Admin':
                [
                    { title: 'Home', icon: 'mdi-home-city' },
                    { title: 'Dashbord', icon: 'mdi-view-dashboard' },
                    { title: 'Users', icon: 'mdi-account-group-outline' },
                    { title: 'Logout', icon: 'mdi-logout' },
                ],
            'Basic':
                [
                    { title: 'Home', icon: 'mdi-home-city' },
                    { title: 'My Service', icon: 'mdi-account-convert' },
                    { title: 'Logout', icon: 'mdi-logout' },
                ],
        },
        mini: true,

    }),
    computed: {
         ...mapGetters(["getSideBarState", "getSideBarBurgerState", "getSideBarBurgerState", "getUserType"]),
    },
    methods: {
        ...mapActions(['logoutUser', 'setSideBarState', 'setSideBarBurgerState', "setUserValue", "setLoggedInStateValue", "changeSidBarTab", "myServiceTab"]),
        excuteRequest( req ){
            if( req == 'Logout' ){
                this.logoutUser().then( () => {
                    this.$router.push('home')
                    this.$router.go()
                });
            }
            else if( req == 'Home' ){
                this.$router.push('home')
                this.$router.go()

                this.changeSidBarTab('Home');
            }
            else if( req == 'Dashbord' ){
                this.$router.push('admin-service')
                this.$router.go()

                this.changeSidBarTab('Admin_service');
            }
            else if( req == 'Users' ){
                this.$router.push('admin-user-management')
                this.$router.go()

                this.changeSidBarTab('Admin_service');
            }
            else if( req == 'My Service' ){
                this.$router.push('my-service')
                this.$router.go()

                this.changeSidBarTab('My_Service');
            }
        },
        updateState( state ){
            if(state.propertyName == 'visibility'){
                this.setSideBarState( !this.getSideBarBurgerState );
                this.setSideBarBurgerState( !this.getSideBarBurgerState);
            }
        },
    }
}
</script>

<style scoped>
.v-overlay {
  z-index: 6 !important;
}
</style>
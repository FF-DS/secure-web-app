import API  from '@/store/api';
import { getLink } from '@/store/links'


const actions = {
    setSelectedObject({ commit }, selectedObject) {
        commit("setSelectedObjectValue", selectedObject);
    },
    setNotificationDialogState({ commit }, flag) {
        commit("setNotificationDialogStateValue", flag);
    },
    setProfileDialogState({ commit }, stateFlag) {
        commit("setProfileDialogStateFlag", stateFlag);
    },
    setSnakBarMessage({ commit }, message) {
        commit("setSnakBarMessageValue", message);
    },
    setSideBarState({ commit }, stateFlag) {
        commit("setSideBarStateFlag", stateFlag);
    },
    setSideBarBurgerState({ commit }, stateFlag) {
        commit("setSideBarBurgerStateFlag", stateFlag);
    },
    setProfileEditDialogState({ commit }, stateFlag) {
        commit("setProfileEditDialogStateFlag", stateFlag);
    },
    registerUser( { commit }, userObject ){
        API.post( getLink('registerUser', {}), userObject).then( ( response ) => {
                commit("setUser", response.user)
                commit("setUserTypeValue", response.user.role)
                commit("setLoggedInState", true)
                localStorage.setItem("accessToken", response.token)
            }
        ).catch( ( error ) => {
            var errorObj = {}
            for (var key in error.response.data){
                errorObj[ key ] = error.response.data[key].msg;
            }
            errorObj['type'] = 'register';
            commit("setUserError", errorObj)

        })
    },
    updateUser( { commit }, userObject ){
        API.put( getLink('updateUser', {}), userObject).then( ( response ) => {
                commit("setUserError", { type: 'profileSuccess' })
                commit("setUser", response)
            }
        ).catch( ( error ) => {
            console.log( error, error.response.data)
            var errorObj = {}
            for (var key in error.response.data){
                errorObj[ key ] = error.response.data[key].msg;
            }
            errorObj['type'] = 'update';
            commit("setUserError", errorObj)

        })
    },
    loginUser( { commit }, loginObject ){
        API.post( getLink('loginUser', {}), loginObject).then( ( response ) => {
                commit("setLoggedInState", true)
                commit("setUser", response.user)
                commit("setUserTypeValue", response.user.role)
                localStorage.setItem("accessToken", response.token)
            }
        ).catch( ( error ) => {
            var errorObj = {}
            for (var key in error.response.data){
                errorObj[ key ] = error.response.data[key].msg;
            }
            errorObj['type'] = 'login';
            commit("setUserError", errorObj)
        })
    },
    logoutUser( {commit}){
        API.get( getLink('logout', {}), null).then( (  ) => {
        });
        commit("setLoggedInState", false)
        commit("setUser", null)
        commit("setUserTypeValueUser", 'Basic')
        localStorage.setItem("accessToken", null)
        
    },
    changeProfilePicture( {commit}, picture ){
        API.post( getLink('changeProfile', {}), picture).then( ( ) => {
            API.get( getLink('getUser', {}), null ).then( ( user) => {  commit( "setUser", user )  })
        }).catch( ( error ) => {
            console.log(error, error.response)
        })
    },
    changePassword( {commit}, password){
        API.post( getLink('changePassword', {}), password).then( ( response ) => {
            commit("setUser", response.user)
            localStorage.setItem("accessToken", response.token)
            commit("setUserError", { type: 'passwordSuccess' })
        }).catch( ( error ) => {
            var errorObj = {}
            for (var key in error.response.data){
                errorObj[ key ] = error.response.data[key].msg;
            }
            errorObj['type'] = 'changePassword';
            commit("setUserError", errorObj)
        })
    },
    sendResetPassword( {commit}, email){
        API.post( getLink('sendResetLink', {}), email).then( ( ) => {
            commit("setUserError", { type: 'passwordResetSuccess' })
        }).catch( ( error ) => {
            var errorObj = {}
            for (var key in error.response.data){
                errorObj[ key ] = error.response.data[key].message;
            }
            errorObj['type'] = 'resetPassword';
            commit("setUserError", errorObj)
        })
    },
    forgottenPassword( {commit}, password){
        API.post( getLink('resetPassword', {}), password).then( ( ) => {
            commit("setUserError", { type: 'passwordForgotSuccess' })
        }).catch( ( error ) => {
            var errorObj = {}
            errorObj['link'] = error.response.data.message;
            errorObj['type'] = 'resetPasswordError';
            commit("setUserError", errorObj)
        })
    },
    verifyAccount( {commit}, req){
        API.post( getLink('verifyUser', {}), req).then( ( ) => {
            commit("setUserError", { type: 'verifySuccess' })
        }).catch( ( error ) => {
            var errorObj = {}
            errorObj['link'] = error.response.data.message;
            errorObj['type'] = 'verifyError';
            commit("setUserError", errorObj)
        })
    },
    sendVerifyAccount( {commit}, req){
        API.get( getLink('verifyUser', {}), req).then( ( ) => {
            commit("setUserError", { type: 'verifySuccess' })
        }).catch( ( ) => {
            commit("setUserError", { type: 'unable to verify' })
        })
    },
    fetchUserNotification( { commit }, ){
        API.get( getLink('getNotification', {}),).then( ( response ) => {
                commit("setUserNotification", response.notification.reverse())
            }
        ).catch( ( error ) => {
            console.log(error)
        })
    },
    updateUserNotification( { commit }, seenNotificationData ){
        API.put( getLink('updateNotification', {}), seenNotificationData).then( ( response ) => {
                commit("setUserNotification", response.notification)
            }
        ).catch( ( error ) => {
            console.log( error)
        })
    },

}

export default actions;
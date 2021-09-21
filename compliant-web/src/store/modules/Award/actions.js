import API  from '@/store/api';
import { getLink } from '@/store/links'

const actions = {
    setAwardFileDialogState({ commit }, flag) {
        commit("setAwardFileDialogStateFlag", flag);
    },
    setAwardData({ commit }, awardData) {
        commit("setAwardData", awardData);
    },
    setAwardAddDialogState({ commit }, flag) {
        commit("setAwardAddDialogFlag", flag);
    },
    setAwardCountry( { commit }){
        API.get( getLink('awardCountry', {} ), null ).then( ( awardCountry) => 
                commit("setAwardCountries", awardCountry)
        )
    },
    setAwardTitle( { commit }){
        API.get( getLink('awardTitle', {} ), null ).then( ( awardTitle) => {
                let names = []
                let namesToID = {}
                for( var key in awardTitle){
                    names.push( awardTitle[key] )
                    namesToID[ awardTitle[key] ] = key;

                }
                commit("setAwardTitles", names)
                commit("setAwardTitlesDict", namesToID)
            }
        )
    },
    awardAdd( { commit, dispatch }, awardObject ){
        let link = awardObject.myService? 'awardAddUser' : 'awardAdd';

        API.post( getLink( link, {}), awardObject).then( ( award ) => {
                commit("setAwardError", { type: 'awardAddSuccess' })
                award;

                if(awardObject.myService)
                    dispatch('myServiceTab'); 
                else
                    dispatch('populateFirstPage'); 
            }
        ).catch( ( error ) => {
            var errorObj = {}
            for (var key in error.response.data){
                errorObj[ key ] = error.response.data[key].msg;
            }
            errorObj['type'] = 'awardAddError';
            commit("setAwardError", errorObj)
        })
    },

    awardUpdate( { commit, dispatch }, awardObject ){
        let link = awardObject.myService? 'awardEditUser' : 'awardEdit';

        API.put( getLink( link, awardObject.awardParams), awardObject.awardData).then( ( award ) => {
                commit("setAwardError", { type: 'awardEditSuccess' })
                award;

                if(awardObject.myService)
                    dispatch('myServiceTab'); 
                else if(awardObject.adminService)
                    dispatch('usersReviewRequests'); 
                else
                    dispatch('populateFirstPage'); 
            }
        ).catch( ( error ) => {
            var errorObj = {}
            for (var key in error.response.data){
                errorObj[ key ] = error.response.data[key].msg;
            }
            errorObj['type'] = 'awardEditError';
            commit("setAwardError", errorObj)
        })
    },

    awardDelete( { commit, dispatch }, awardParams ){
        let link = awardParams.myService? 'awardDeleteUser' : 'awardDelete';

        API.delete( getLink( link, awardParams), null).then( ( award ) => {
                commit("setAwardError", { type: 'awardDeleteSuccess' })
                award;

                if(awardParams.myService)
                    dispatch('myServiceTab'); 
                else if(awardParams.adminService)
                    dispatch('usersReviewRequests'); 
                else
                    dispatch('populateFirstPage');  
            }
        ).catch( ( error ) => {
            var errorObj = {}
            for (var key in error.response.data){
                errorObj[ key ] = error.response.data[key].msg;
            }
            errorObj['type'] = 'awardDeleteError';
            commit("setAwardError", errorObj)
        })
    },

    searchAwards( {commit, getters}, params ){
        let link = params.myService? 'awardUser' : 'award';
        params.queries.size = getters.getAmountOfDataItem

        API.get( getLink( link, params), null ).then( ( awardData) => {
                commit("setAwardData", awardData.data )
                commit("setAwardPageInfo", awardData);
            }
        ).catch( (err) => {
            console.log(err)
        })
    },
    
    retriveReviewAwards( {commit, getters}, params ){
        params.queries.size = getters.getAmountOfDataItem

        API.get( getLink( 'awardReviewRequests', params), null ).then( ( awardData) => {
                commit("setAwardData", awardData.data )
                commit("setAwardPageInfo", awardData);
            }
        ).catch( (err) => {
            console.log(err)
        })
    },

    publishedUserAwards( {commit}, params ){
        API.get( getLink( 'awardByUserId', params), null ).then( ( awardData) => {
                commit("setUserPublishedAward", awardData )
            }
        ).catch( (err) => {
            console.log(err)
        })
    },

    setAwardSearchParams({ commit }, params) {
        commit("setAwardParams", params);
    },

    addAwardFile( {commit}, awardData ){
        let link = awardData.myService? 'awardFileUser' : 'awardFile';

        API.post( getLink(link, awardData.params), awardData.file ).then( ( file_address ) => {
            
            var errorObj = { type: 'awardFileSuccess', file: file_address };
            commit("setAwardError", errorObj)

        }).catch( ( error ) => {
            var errorObj = { type: 'awardFileError' };
            error;
            commit("setAwardError", errorObj)
        })
    },
    
    updateAwardFile( { commit }, awardData ){
        let link = awardData.myService? 'awardUpdateFileUser' : 'awardUpdateFile';

        API.put( getLink(link, awardData.params), {file_links: awardData.file } ).then( ( ) => {

            var errorObj = { type: 'awardFileSuccess' };
            commit("setAwardError", errorObj)
        }).catch( ( error ) => {
            var errorObj = { type: 'awardFileError' };
            error;
            commit("setAwardError", errorObj)
        })
    },

        
    reviewAwards( { commit }, reviewData ){
        API.post( getLink('awardAdminReview', reviewData.params), reviewData.reviewData ).then( ( ) => {

            var errorObj = { type: 'awardReviewSuccess' };
            commit("setAwardError", errorObj)
        }).catch( ( error ) => {
            var errorObj = { type: 'awardReviewError' };
            error;
            commit("setAwardError", errorObj)
        })
    },
}


export default actions;
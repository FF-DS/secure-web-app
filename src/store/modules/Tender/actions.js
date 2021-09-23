import API  from '@/store/api';
import { getLink } from '@/store/links'

const actions = {
    changeClosingDateValueStatus({ commit }, status) {
        commit("setClosingDateValueStatus", status);
    },
    setTenderFileDialogState({ commit }, flag) {
        commit("setTenderFileDialogStateFlag", flag);
    },
    setTenderEditDialogState({ commit }, flag) {
        commit("setTenderEditDialogFlag", flag);
    },
    setTenderData({ commit }, tenderData) {
        commit("setTenderData", tenderData);
    },
    setTenderSector( { commit }){
        API.get( getLink('tenderSector', {} ), null ).then( ( tenderSector) => 
                commit("setTenderSector", tenderSector)
        )
    },
    setTenderType( { commit }){
        API.get( getLink('tenderType', {} ), null ).then( ( tenderType) => 
                commit("setTenderType", tenderType)
        )
    },
    setTenderCountry( { commit }){
        API.get( getLink('tenderCountry', {} ), null ).then( ( tenderCountry) => 
                commit("setTenderCountries", tenderCountry)
        )
    },
    setTenderTitles( { commit }){
        API.get( getLink('tenderTitle', {} ), null ).then( ( tenderTitle) => {
                let names = []
                let namesToID = {}
                for( var key in tenderTitle){
                    names.push( tenderTitle[key] )
                    namesToID[ tenderTitle[key] ] = key;

                }
                commit("setTenderTitles", names)
                commit("setTenderTitlesDict", namesToID)
            }
        )
    },
    setTenderProcurment( { commit }){
        API.get( getLink('tenderProcurment', {} ), null ).then( ( tenderProcurment) => 
                commit("setTenderProcurments", tenderProcurment)
        )
    },

    searchTenders( {commit, getters}, params ){
        let link = params.myService? 'tenderUser' : 'tender';
        params.queries.size = getters.getAmountOfDataItem

        API.get( getLink( link, params), null ).then( ( tenderData) => {
            commit("setTenderData", tenderData.data);
            commit("setTenderPageInfo", tenderData);
        }
        ).catch( (err) => {
            console.log(err)
        })
    },

    retriveReviewTenders( {commit, getters}, params ){
        params.queries.size = getters.getAmountOfDataItem

        API.get( getLink( 'tenderReviewRequests', params), null ).then( ( tenderData) => {
            commit("setTenderData", tenderData.data);
            commit("setTenderPageInfo", tenderData);
        }
        ).catch( (err) => {
            console.log(err)
        })
    },

    publishedUserTenders( {commit}, params ){

        API.get( getLink( 'tendersByUserId', params), null ).then( ( tenderData) => {
            commit("setUserPublishedTender", tenderData);
        }
        ).catch( (err) => {
            console.log(err)
        })
    },

    setTenderSearchParams({ commit }, params) {
        commit("setTenderParams", params);
    },

    addTender( { commit, dispatch }, tenderObject ){
        let link = tenderObject.myService? 'tenderAddUser' : 'tenderAdd';

        API.post( getLink( link, {}), tenderObject).then( ( tender ) => {
                commit("setTenderError", { type: 'tenderAddSuccess' })
                tender;
                
                if(tenderObject.myService)
                    dispatch('myServiceTab'); 
                else
                    dispatch('populateFirstPage'); 
            }
        ).catch( ( error ) => {
            var errorObj = {}
            for (var key in error.response.data){
                errorObj[ key ] = error.response.data[key].msg;
            }
            errorObj['type'] = 'tenderAddError';
            commit("setTenderError", errorObj)
        })
    },
    
    updateTender( { commit, dispatch }, tenderObject ){
        let link = tenderObject.myService? 'tenderEditUser' : 'tenderEdit';

        API.put( getLink( link, tenderObject.tenderParams), tenderObject.tenderData).then( ( tender ) => {
                commit("setTenderError", { type: 'tenderEditSuccess' })
                tender;
                
                if(tenderObject.myService)
                    dispatch('myServiceTab');
                else if(tenderObject.adminService)
                    dispatch('usersReviewRequests'); 
                else
                    dispatch('populateFirstPage');
            }
        ).catch( ( error ) => {
            var errorObj = {}
            for (var key in error.response.data){
                errorObj[ key ] = error.response.data[key].msg;
            }
            errorObj['type'] = 'tenderEditError';
            commit("setTenderError", errorObj)
        })
    },

    deleteTender( { commit, dispatch }, tenderParams ){
        let link = tenderParams.myService? 'tenderDeleteUser' : 'tenderDelete';

        API.delete( getLink( link, tenderParams), null ).then( ( tender ) => {
                commit("setTenderError", { type: 'tenderDeleteSuccess' })
                tender;
                
                if(tenderParams.myService)
                    dispatch('myServiceTab'); 
                else if(tenderParams.adminService)
                    dispatch('usersReviewRequests'); 
                else
                    dispatch('populateFirstPage');
            }
        ).catch( ( error ) => {
            var errorObj = {}
            for (var key in error.response.data){
                errorObj[ key ] = error.response.data[key].msg;
            }
            errorObj['type'] = 'tenderDeleteError';
            commit("setTenderError", errorObj)
        })
    },
    
    setTenderErrorData( { commit }, tenderError ){
        commit("setTenderError", tenderError);
    },

    addTenderFile( {commit}, tenderData ){
        let link = tenderData.myService? 'tenderFileUser' : 'tenderFile';

        API.post( getLink(link, tenderData.params), tenderData.file ).then( ( file_address ) => {
            var errorObj = { type: 'tenderFileSuccess', file: file_address };
            commit("setTenderError", errorObj)
            return file_address;
            
        }).catch( ( error ) => {
            var errorObj = { type: 'tenderFileError' };
            error;
            commit("setTenderError", errorObj)
        })
    },
    
    updateTenderFile( { commit }, tenderData ){
        let link = tenderData.myService? 'tenderUpdateFileUser' : 'tenderUpdateFile';

        API.put( getLink(link, tenderData.params), {file_links: tenderData.file} ).then( ( ) => {
            var errorObj = { type: 'tenderFileSuccess' };
            commit("setTenderError", errorObj)
            }
        ).catch( ( error ) => {
            var errorObj = { type: 'tenderFileError' };
            error;
            commit("setTenderError", errorObj)
        })
    },

    reviewTenders( { commit }, reviewData ){
        API.post( getLink('tenderAdminReview', reviewData.params), reviewData.reviewData ).then( ( ) => {

            var errorObj = { type: 'tenderReviewSuccess' };
            commit("setTenderError", errorObj)
        }).catch( ( error ) => {
            var errorObj = { type: 'tenderReviewError' };
            error;
            commit("setTenderError", errorObj)
        })
    },
}

export default actions;
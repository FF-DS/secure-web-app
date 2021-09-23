import API  from '@/store/api';
import { getLink } from '@/store/links'


const actions = {
    setCompanyData({ commit }, companyData) {
        commit("setCompanyData", companyData);
    },

    setAddCompanyDialogState({ commit }, flag) {
        commit("setAddCompanyDialogFlag", flag);
    },

    setCompanyCountry( { commit }){
        API.get( getLink('companyCountry', {} ), null ).then( ( companyCountry) => 
                commit("setCompanyCountries", companyCountry)
        )
    },

    setCompanyCategory( { commit }){
        API.get( getLink('companyCategory', {} ), null ).then( ( companyCategory) => 
                commit("setCompanyCategories", companyCategory)
        )
    },

    setCompanyName( { commit }){
        API.get( getLink('companyNames', {} ), null ).then( ( companyNames) => {
                let names = []
                let namesToID = {}
                for( var key in companyNames){

                    names.push( companyNames[key] )
                    namesToID[ companyNames[key] ] = key;

                }
                commit("setCompanyNames", names)
                commit("setCompanyNameDict", namesToID)
            }
        )
    },

    searchCompanies( {commit, getters}, params ){
        let link = params.myService? 'companyUser' : 'company';
        params.queries.size = getters.getAmountOfDataItem

        API.get( getLink( link, params), null ).then( ( companyData) => {
                commit("setCompanyData", companyData.data )
                commit( "setCompanyPageInfo", companyData )
            }
        ).catch( (err) => {
            console.log(err)
        })
    },
    
    retriveReviewCompanies( {commit, getters}, params ){
        params.queries.size = getters.getAmountOfDataItem

        API.get( getLink( 'companyReviewRequests', params), null ).then( ( companyData) => {
                commit("setCompanyData", companyData.data )
                commit( "setCompanyPageInfo", companyData )
            }
        ).catch( (err) => {
            console.log(err)
        })
    },

    publishedUserCompanies( {commit}, params ){
        API.get( getLink( 'companyByUserId', params), null ).then( ( companyData) => {
                commit("setUserPublishedCompany", companyData )
            }
        ).catch( (err) => {
            console.log(err)
        })
    },

    setCompanySearchParams({ commit }, params) {
        commit("setCompanyParams", params);
    },

    addCompany( { commit, dispatch }, companyObject ){
        let link = companyObject.myService? 'companyAddUser' : 'companyAdd';

        API.post( getLink( link, {}), companyObject).then( ( company ) => {
                commit("setCompanyError", { type: 'companyAddSuccess' })
                company;

                if(companyObject.myService)
                    dispatch('myServiceTab'); 
                else
                    dispatch('populateFirstPage'); 
            }
        ).catch( ( error ) => {
            var errorObj = {}
            for (var key in error.response.data){
                errorObj[ key ] = error.response.data[key].msg;
            }
            errorObj['type'] = 'companyAddError';
            commit("setCompanyError", errorObj)
        })
    },

    updateCompany( { commit, dispatch }, companyObject ){
        let link = companyObject.myService? 'companyEditUser' : 'companyEdit';

        API.put( getLink( link, companyObject.companyParams ), companyObject.companyData ).then( ( company ) => {
                commit("setCompanyError", { type: 'companyEditSuccess' })
                company;
                
                if(companyObject.myService)
                    dispatch('myServiceTab'); 
                else if(companyObject.adminService)
                    dispatch('usersReviewRequests'); 
                else
                    dispatch('populateFirstPage'); 
            }
        ).catch( ( error ) => {
            var errorObj = {}
            for (var key in error.response.data){
                errorObj[ key ] = error.response.data[key].msg;
            }
            errorObj['type'] = 'companyEditError';
            commit("setCompanyError", errorObj)
        })
    },

    deleteCompany( { commit, dispatch }, companyParams ){
        let link = companyParams.myService? 'companyDeleteUser' : 'companyDelete';

        API.delete( getLink( link, companyParams ), null ).then( ( company ) => {
                commit("setCompanyError", { type: 'companyDeleteSuccess' })
                company;
                
                if(companyParams.myService)
                    dispatch('myServiceTab'); 
                else if(companyParams.adminService)
                    dispatch('usersReviewRequests');
                else
                    dispatch('populateFirstPage'); 
            }
        ).catch( ( error ) => {
            var errorObj = {}
            for (var key in error.response.data){
                errorObj[ key ] = error.response.data[key].msg;
            }
            errorObj['type'] = 'companyDeleteError';
            commit("setCompanyError", errorObj)
        })
    },

    addCompanyFile( {commit}, companyData ){
        let link = companyData.myService? 'companyFileUser' : 'companyFile';

        API.post( getLink(link, companyData.params), companyData.file ).then( ( file_address ) => {
            
            var errorObj = { type: 'companyFileSuccess', file: file_address };
            commit("setCompanyError", errorObj)

        }).catch( ( error ) => {
            var errorObj = { type: 'companyFileError' };
            error;
            commit("setCompanyError", errorObj)
        })
    },
    
    updateCompanyFile( { commit }, companyData ){
        let link = companyData.myService? 'companyUpdateFileUser' : 'companyUpdateFile';

        API.put( getLink(link, companyData.params), {file_links: companyData.file } ).then( ( ) => {

            var errorObj = { type: 'companyFileSuccess' };
            commit("setCompanyError", errorObj)
        }).catch( ( error ) => {
            var errorObj = { type: 'companyFileError' };
            error;
            commit("setCompanyError", errorObj)
        })
    },
    
    updateCompanyLogo( { commit }, companyData ){
        let link = companyData.myService? 'companyUpdateLogoUser' : 'companyUpdateLogo';

        API.post( getLink(link, companyData.params), companyData.logo ).then( ( company ) => {

            var errorObj = { type: 'companyFileSuccess', logo : company.avatar };
            commit("setCompanyError", errorObj)
        }).catch( ( error ) => {
            var errorObj = { type: 'companyFileError' };
            error;
            commit("setCompanyError", errorObj)
        })
    },

    setCompanyFileDialogState({ commit }, flag) {
        commit("setCompanyFileDialogStateFlag", flag);
    },

    reviewCompanies( { commit }, reviewData ){
        API.post( getLink('companyAdminReview', reviewData.params), reviewData.reviewData ).then( ( ) => {

            var errorObj = { type: 'companyReviewSuccess' };
            commit("setCompanyError", errorObj)
        }).catch( ( error ) => {
            var errorObj = { type: 'companyReviewError' };
            error;
            commit("setCompanyError", errorObj)
        })
    },
}

export default actions;
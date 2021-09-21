import API  from '@/store/api';
import { getLink } from '@/store/links'

const actions = {
    setAccountDataValue({ commit }, data) {
        commit("setAccountData", data);
    },

    setAccountSearchParams({ commit }, params) {
        commit("setAccountSearchParamsValue", params);
    },

    searchAccounts( {commit, getters}, params ){
        params.queries.size = getters.getAmountOfDataItem

        API.get( getLink( 'getAccounts', params), null ).then( ( tenderData) => {
            commit("setAccountData", tenderData.data);
            commit("setAccountPageInfo", tenderData);
        }
        ).catch( (err) => {
            console.log(err)
        })
    },

    changeAccountState( { commit, dispatch }, accountStateObject ){

        API.post( getLink( 'changeAccountState', {}), accountStateObject).then( (  ) => {
                commit("setAccountError", { type: 'accountChangeSuccess' })
                const searchQueries = {
                    query : true,
                    queries: {
                        size : 12,
                    }
                }
                dispatch('searchAccounts', searchQueries); 
            }
        ).catch( ( error ) => {
            var errorObj = {}
            for (var key in error.response.data){
                errorObj[ key ] = error.response.data[key].msg;
            }
            errorObj['type'] = 'accountChangeError';
            commit("setAccountError", errorObj)
        })
    },
    
    deleteAccount( { commit, dispatch }, accountStateParam ){
    
        API.delete( getLink( 'deleteAccount', accountStateParam), null ).then( ( ) => {
                commit("setAccountError", { type: 'accountDeleteSuccess' })
                const searchQueries = {
                    query : true,
                    queries: {
                        size : 12,
                    }
                }
                dispatch('searchAccounts', searchQueries); 
            }
        ).catch( ( error ) => {
            var errorObj = {}
            for (var key in error.response.data){
                errorObj[ key ] = error.response.data[key].msg;
            }
            errorObj['type'] = 'accountDeleteError';
            commit("setAccountError", errorObj)
        })
    },
    
}

export default actions;
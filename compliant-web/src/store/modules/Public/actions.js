import API  from '@/store/api';
import { getLink } from '@/store/links'

const actions = {
    setDatePickerResetState({ commit }, flag) {
        commit("setDatePickerResetFlagState", flag);
    },
    setSearchParams({ commit }, flag) {
        commit("setSearchProgressValue", flag);
    },
    changeTab({ commit }, tabName) {
        commit("setTab", tabName);
    },
    setCurrentSearchParams({ commit }, searchParams) {
        commit("setCurrentSearchParams", searchParams);
    },


    setAmountOfDataItem({ commit }, amount) {
        commit("setAmountOfDataItemValue", amount);
    },
    setCurrentTenderSearchType({ commit }, searchType) {
        commit("setCurrentTenderSearchTypeValue", searchType);
    },

    changeSidBarTab({ commit }, tabName) {
        commit("setSidBarTab", tabName);
    },
    setFabVisibility({ commit }, fabState) {
        commit("setFabState", fabState);
    },
    changeSearchTab({ commit }, searchTab) {
        commit("setSearchTab", searchTab);
    },
    changeViewOption({ commit }, option) {
        commit("setViewOption", option);
    },

    populateFirstPage( {commit,dispatch} ){
        const searchQueries = {
            query : true,
            queries: {
                size : 12,
            }
        }

        dispatch('setAwardData', []); dispatch('setAwardSearchParams', searchQueries); dispatch('searchAwards', searchQueries); 
        dispatch('setCompanyData', []); dispatch('setCompanySearchParams', searchQueries); dispatch('searchCompanies', searchQueries);
        dispatch('setTenderData', []); dispatch('setTenderSearchParams', searchQueries); dispatch('searchTenders', searchQueries);

        dispatch('setCompanyName'); dispatch('setTenderSector'); dispatch('setTenderType'); dispatch('setTenderCountry');
        dispatch('setCompanyCategory'); dispatch('setCompanyCountry'); dispatch('setAwardCountry'); dispatch('setAwardTitle'); 
        dispatch('setTenderProcurment'); dispatch('setTenderTitles');

        if(localStorage.getItem("accessToken") &&  localStorage.getItem("accessToken") != 'null'){
            API.get( getLink('getUser', {}), null ).then( ( user) => {
                    commit( "setUser", user )
                }
            ).catch( (err) => {
                console.log(err)
            }) 
        }
    },
    myServiceTab({ dispatch }){
        let searchQueries = {
            query: true,
            myService:true,
            queries:{
                size: 12,
            }
        }
        dispatch('setAwardData', []); dispatch('setAwardSearchParams', searchQueries); dispatch('searchAwards', searchQueries); 
        dispatch('setCompanyData', []); dispatch('setCompanySearchParams', searchQueries); dispatch('searchCompanies', searchQueries);
        dispatch('setTenderData', []); dispatch('setTenderSearchParams', searchQueries); dispatch('searchTenders', searchQueries);

        dispatch('setCompanyName'); dispatch('setTenderSector'); dispatch('setTenderType'); dispatch('setTenderCountry');
        dispatch('setCompanyCategory'); dispatch('setCompanyCountry'); dispatch('setAwardCountry'); dispatch('setAwardTitle'); 
        dispatch('setTenderProcurment'); dispatch('setTenderTitles');
    },
    usersReviewRequests({ dispatch }){
        let searchQueries = {
            query: true,
            myService:true,
            queries:{
                size: 12,
            }
        }

        dispatch('setAwardData', []);  dispatch('retriveReviewAwards',searchQueries); 
        dispatch('setCompanyData', []); dispatch('retriveReviewCompanies',searchQueries);
        dispatch('setTenderData', []); dispatch('retriveReviewTenders',searchQueries);

        dispatch('setCompanyName'); dispatch('setTenderSector'); dispatch('setTenderType'); dispatch('setTenderCountry');
        dispatch('setCompanyCategory'); dispatch('setCompanyCountry'); dispatch('setAwardCountry'); dispatch('setAwardTitle'); 
        dispatch('setTenderProcurment'); dispatch('setTenderTitles');
    }

}

export default actions;
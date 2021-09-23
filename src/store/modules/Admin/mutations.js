exports.mutations = {
    setAccountData: (state, data) => (state.accountsData = data),
    setAccountError: (state, data) => (state.accountError = data),
    setAccountSearchParamsValue: (state, param) => (state.searchParams = param),
    setAccountPageInfo: (state, info) => {
        state.accountPageInfo.currentPage = info.current_page;
        state.accountPageInfo.pageSize  = info.page_size;
        state.accountPageInfo.totalCount = info.data_count;
        state.accountPageInfo.numberOfPages = Math.ceil(info.data_count/info.page_size);
        state.accountCountryCount = info.data_per_country;
        state.accountCountryCenter = info.map_location.reverse();
    },
    
}
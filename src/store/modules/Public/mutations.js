exports.mutations = {
  setTab: (state, tabName) => (state.currentTab = tabName),
  setSidBarTab: (state, tabName) => (state.currentSidBarTab = tabName),
  setSearchProgressValue: (state, flag) => (state.searchProgress = flag),

  setAmountOfDataItemValue: (state, amount) =>
    (state.amountOfDataItem = amount),
  setCurrentTenderSearchTypeValue: (state, searchType) =>
    (state.currentTenderSearchType = searchType),
  setCurrentSearchParams: (state, searchParam) =>
    (state.currentSearchParams = searchParam),

  setFabState: (state, fabState) => (state.fabState = fabState),
  setViewOption: (state, option) => (state.viewOption = option),

  setSearchTab: (state, searchTab) => (state.searchTab = searchTab),
  setDatePickerResetFlagState: (state, flag) => (state.datePickerState = flag),

  setTenderPageInfo: (state, info) => {
    state.tenderPageInfo.currentPage = info.current_page;
    state.tenderPageInfo.pageSize = info.page_size;
    state.tenderPageInfo.totalCount = info.data_count;
    state.tenderPageInfo.numberOfPages = Math.ceil(
      info.data_count / info.page_size
    );
    state.tenderCountryCount = info.data_per_country;
    state.countryMapCenter = info.map_location.reverse();
  },
  setAwardPageInfo: (state, info) => {
    state.awardPageInfo.currentPage = info.current_page;
    state.awardPageInfo.pageSize = info.page_size;
    state.awardPageInfo.totalCount = info.data_count;
    state.awardPageInfo.numberOfPages = Math.ceil(
      info.data_count / info.page_size
    );
    state.awardCountryCount = info.data_per_country;
    state.countryMapCenter = info.map_location.reverse();
  },
  setCompanyPageInfo: (state, info) => {
    state.companyPageInfo.currentPage = info.current_page;
    state.companyPageInfo.pageSize = info.page_size;
    state.companyPageInfo.totalCount = info.data_count;
    state.companyPageInfo.numberOfPages = Math.ceil(
      info.data_count / info.page_size
    );
    state.companyCountryCount = info.data_per_country;
    state.countryMapCenter = info.map_location.reverse();
  },
  setCompliantPageInfo: (state, info) => {
    state.compliantPageInfo.currentPage = info.current_page;
    state.compliantPageInfo.pageSize = info.page_size;
    state.compliantPageInfo.totalCount = info.data_count;
    state.compliantPageInfo.numberOfPages = Math.ceil(
      info.data_count / info.page_size
    );
  },
};

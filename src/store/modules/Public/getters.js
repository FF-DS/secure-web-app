exports.getters = {
  getTab: (state) => state.currentTab,
  getCurrentSidBarTab: (state) => state.currentSidBarTab,
  getViewOption: (state) => state.viewOption,
  getSearchTab: (state) => state.searchTab,

  getTenderPageInfo: (state) => state.tenderPageInfo,
  getAwardPageInfo: (state) => state.awardPageInfo,
  getCompanyPageInfo: (state) => state.companyPageInfo,
  getCompliantPageInfo: (state) => state.compliantPageInfo,

  getTenderCountryCount: (state) => state.tenderCountryCount,
  getAwardCountryCount: (state) => state.awardCountryCount,
  getCompanyCountryCount: (state) => state.companyCountryCount,

  getFabVisibility: (state) => state.fabState,
  getDatePickerResetState: (state) => state.datePickerState,

  getAmountOfDataItem: (state) => state.amountOfDataItem,
  getCurrentTenderSearchType: (state) => state.currentTenderSearchType,
  getCurrentSearchParams: (state) => state.currentSearchParams,
  getSearchParams: (state) => state.searchProgress,

  getCountryMapCenter: (state) => state.countryMapCenter,
};

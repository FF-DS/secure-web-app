exports.getters = {
    getCompanyData: (state) => state.companyData,
    getCompanyHeader: (state) => state.headers,
    getCompanyCountries: (state) => state.countriesList,
    getCompanyCategories: (state) => state.companyCategory,
    getCompanyNames: (state) => state.companyNames,
    getCompanyDict: (state) => state.companyDict,
    getCompanySearchParams: (state) => state.searchParams,
    getAddCompanyDialogState:  (state) => state.addCompanyDialogState,
    getCompanyError:  (state) => state.companyError,
    getCompanyFileDialogState: (state) => state.companyFileDialogState,
    getPublishedUserCompanies: (state) => state.publishedUserCompany
}
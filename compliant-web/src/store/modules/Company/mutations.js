exports.mutations = {
    setCompanyData: (state, companyData) => (state.companyData = companyData),
    setCompanyCountries: (state, companyCountries) => (state.companyCountries = companyCountries),
    setCompanyCategories: (state, companyCategory) => (state.companyCategory = companyCategory),
    setCompanyNames: (state, companyNames) => (state.companyNames = companyNames),
    setCompanyNameDict: (state, companyDict) => (state.companyDict = companyDict),
    setCompanyParams: (state, params) => (state.searchParams = params),
    setAddCompanyDialogFlag: (state, flag) => (state.addCompanyDialogState = flag),
    setCompanyFileDialogStateFlag: (state, flag) => (state.companyFileDialogState = flag),
    setCompanyError: (state, error) => (state.companyError = error),
    setUserPublishedCompany: (state, companies) => (state.publishedUserCompany = companies),
}
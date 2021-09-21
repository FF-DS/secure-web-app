exports.getters = {
    getTenderData: (state) => state.tenderData,
    getTenderHeader: (state) => state.headers,
    getTenderSector: (state) => state.tenderSector,
    getTenderType: (state) => state.tenderType,
    getTenderCountries: (state) => state.countriesList,
    getTenderSearchParams: (state) => state.searchParams,
    getTenderEditDialogState:  (state) => state.tenderEditDialogState,
    getTenderError: (state) => state.tenderError,
    getTenderProcurments: (state) => state.tenderProcurments,
    getTenderTitles: (state) => state.tenderTitles,
    getTenderDict: (state) => state.tenderDict,
    getTenderFileDialogState: (state) => state.tenderFileDialogState,
    getPublishedUserTenders: (state) => state.publishedUserTender,
    getClosingDateValueStatus: (state) => state.closingDateValueStatus,
}
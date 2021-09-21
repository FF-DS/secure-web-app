exports.getters = {
    getAwardData: (state) => state.awardData,
    getAwardHeader: (state) => state.headers,
    getAwardCountry: (state) => state.countriesList,
    getAwardSearchParams: (state) => state.searchParams,
    getAwardAddDialogState: (state) => state.awardAddDialogState,
    getAwardTitle: (state) => state.awardTitles,
    getAwardTitlesDict: (state) => state.awardTitlesDict,
    getAwardError: (state) => state.awardError,
    getAwardFileDialogState: (state) => state.awardFileDialogState,
    getPublishedUserAwards: (state) => state.publishedUserAward,
}
exports.mutations = {
    setAwardData: (state, awardData) => (state.awardData = awardData),
    setAwardCountries: (state, awardCountry) => (state.awardCountry = awardCountry),
    setAwardParams: (state, params) => (state.searchParams = params),
    setAwardAddDialogFlag: (state, flag) => (state.awardAddDialogState = flag),
    setAwardTitles: (state, awardTitles) => (state.awardTitles = awardTitles),
    setAwardTitlesDict: (state, awardTitlesDict) => (state.awardTitlesDict = awardTitlesDict),
    setAwardError: (state, error) => (state.awardError = error),
    setAwardFileDialogStateFlag: (state, flag) => (state.awardFileDialogState = flag),
    setUserPublishedAward: (state, awards) => (state.publishedUserAward = awards),
}
exports.mutations = {
  setCompliantData: (state, compliantData) =>
    (state.compliantData = compliantData),
  setCompliantParams: (state, params) => (state.searchParams = params),
  setCompliantEditDialogFlag: (state, flag) =>
    (state.compliantEditDialogState = flag),
  setCompliantError: (state, errorObj) => (state.compliantError = errorObj),
  setCompliantFileDialogStateFlag: (state, flag) =>
    (state.compliantFileDialogState = flag),
  setUserPublishedCompliant: (state, compliants) =>
    (state.publishedUserCompliant = compliants),
};

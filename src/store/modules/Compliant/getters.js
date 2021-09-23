exports.getters = {
  getCompliantData: (state) => state.compliantData,
  getCompliantHeader: (state) => state.headers,
  getCompliantEditDialogState: (state) => state.compliantEditDialogState,
  getCompliantError: (state) => state.compliantError,
  getCompliantFileDialogState: (state) => state.compliantFileDialogState,
  getPublishedUserCompliants: (state) => state.publishedUserCompliant,
};

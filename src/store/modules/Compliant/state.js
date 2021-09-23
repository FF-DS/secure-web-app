exports.state = {
  compliantData: [],
  headers: [
    {
      text: "Title",
      align: "start",
      sortable: false,
      value: "title",
    },
    { text: "User Name", value: "creator_user.name" },
    { text: "Email", value: "creator_user.email" },
    { text: "Detail", value: "detail", sortable: false },
  ],

  searchParams: { query: true, queries: { size: 12 } },
  compliantEditDialogState: false,
  compliantError: {},
  compliantFileDialogState: false,
  publishedUserCompliant: [],
};

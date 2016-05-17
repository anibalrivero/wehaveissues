A.app({
  appName: "WeHaveIssues",
  appIcon: "issue",
  onlyAuthenticated: true,
  allowSignUp: true,
  menuItems: [
    {
      name: "Issues",
      icon: "issue",
      entityTypeId: "Issue",
    }
  ],
  entities: function(Fields) {
    return {
      Issue: {
        title: 'Issues',
        fields: {
          id: Fields.integer("Issue Id").required(),
          assigned_to: Fields.text("Assigned to"),
        }
      }
    }
  }
});

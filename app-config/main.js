A.app({
  appName: "WeHaveIssues",
  appIcon: "bug",
  onlyAuthenticated: true,
  allowSignUp: true,
  menuItems: [
    {
      name: "Issues",
      icon: "bug",
      entityTypeId: "Issue",
    }
  ],
  entities: function(Fields) {
    return {
      Issue: {
        title: 'Issues',
        fields: {
          issue_id: Fields.integer("Issue Id").required(),
          assigned_to: Fields.text("Assigned to"),
        }
      }
    }
  }
});

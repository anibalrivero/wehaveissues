A.app({
  appName: "WeHaveIssues",
  appIcon: "bug",
  onlyAuthenticated: true,
  allowSignUp: true,
  menuItems: [
    {
      name: "Bugs",
      icon: "bug",
      entityTypeId: "Bug",
    }
  ],
  entities: function(Fields) {
    return {
      Bug: {
        title: 'Bugs',
        fields: {
          id: Fields.integer("Bug Id").required(),
          assigned_to: Fields.text("Assigned to"),
        }
      }
    }
  }
});

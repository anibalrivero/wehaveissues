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
          issue_id: Fields.integer("Issue Id").readOnly(),
          assigned_to: Fields.fixedReference("Assigned to", "User"),
          creation_date: Fields.date("Date").readOnly(),
        },
        beforeSave: function (Entity, Dates, Crud) {
          if (!Entity.creation_date) {
            Entity.creation_date = Dates.nowDate();
          }
          return Crud.crudFor('IssueCounter').find({}).then(function (last) {
            if (!Entity.issue_id) {
              Entity.issue_id = last[0].number;
              return Crud.crudFor('IssueCounter').updateEntity({id: last[0].id, number: last[0].number + 1});
            }
          })
        },
      },
      IssueCounter: {
        fields: {
          number: Fields.integer("Counter")
        }
      },
      User:{
        permissions:{
          read: null
        }
      }
    }
  },
  migrations: function (Migrations) { return [
    {
      name: "issue-counter",
      operation: Migrations.insert("IssueCounter", [
        {id: "2", number: 1}
      ])
    }
  ]}
});

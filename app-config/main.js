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
    },
    {
      name: "Products",
      icon: "th",
      entityTypeId: "Product",
    },
  ],
  entities: function(Fields) {
    return {
      Issue: {
        title: 'Issues',
        fields: {
          issue_id: Fields.integer("Issue Id").readOnly(),
          creation_ts: Fields.datetime("Creation timestamp").readOnly(),
          short_desc: Fields.text("Short description"),
          delta_ts: Fields.datetime("Modification timestamp").readOnly(),
          product: Fields.fixedReference("Product","Product"),
          component: Fields.text("Component"),
          version: Fields.text("Version"),
          rep_platform: Fields.text("Affected platform"),
          op_sys: Fields.text("Affected OS"),
          issue_status: Fields.text("Issue status"),
          assigned_to: Fields.fixedReference("Assigned to", "User"),
          creation_date: Fields.date("Date").readOnly(),
        },
        beforeSave: function (Entity, Dates, Crud) {
          if (!Entity.creation_date) {
            Entity.creation_date = Dates.nowDate();
            Entity.creation_ts = new Date();
          }
          Entity.delta_ts = new Date();
          return Crud.crudFor('IssueCounter').find({}).then(function (last) {
            if (!Entity.issue_id) {
              Entity.issue_id = last[0].number;
              return Crud.crudFor('IssueCounter').updateEntity({id: last[0].id, number: last[0].number + 1});
            }
          })
        },
      },
      Product:{
        fields:{
          name: Fields.text("Name"),
        },
        referenceName: "name",
      },
      Component:{
        fields:{
          name: Fields.text("Name"),
          product: Fields.fixedReference("Product","Product")
        },
        referenceName: "name",
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

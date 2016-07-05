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
    /*
    {
      name: "Projects",
      icon: "th",
      entityTypeId: "Project",
    },
    */
  ],
  entities: function(Fields) {
    return {
      Issue: {
        title: 'Issues',
        fields: {
          issue_id: Fields.integer("Issue Id").readOnly(),
          creation_ts: Fields.datetime("Creation timestamp").readOnly(),
          summary: Fields.text("Summary"),
          description: Fields.textarea("Description"),
          delta_ts: Fields.datetime("Modification timestamp").readOnly(),
          project: Fields.text("Project"),
          creator: Fields.fixedReference("Created by", "User").readOnly(),
          creation_date: Fields.date("Date").readOnly(),
          comments: Fields.relation("Comments", "Comment", "issue")
        },
        beforeSave: function (Entity, Dates, Crud, User) {
          if (!Entity.creation_date) {
            Entity.creator = User
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
      Comment:{
        title: 'Comments',
        fields:{
          issue: Fields.fixedReference("Issue", "Issue").readOnly(),
          creation_ts: Fields.date("Created on").readOnly(),
          creator: Fields.fixedReference("Created by", "User").readOnly(),
          text: Fields.textarea("Text"),
        },
        beforeSave: function (Entity, Dates, Crud, User) {
          if (!Entity.creation_date) {
            Entity.creator = User
            Entity.creation_date = Dates.nowDate();
            Entity.creation_ts = new Date();
          }
        }
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

Positions = new Meteor.Collection('positions');
Steerings = new Meteor.Collection('steerings');

Deps.autorun(function () {
    Meteor.publish('our_positions', function () {
        return Positions.find({});
    });
    Meteor.publish('our_steerings', function () {
        return Steerings.find({});
    });
});

Meteor.startup(function () {
    Positions.remove({});
    Positions.insert({ value: 0 });
    Steerings.remove({});
    Steerings.insert({ value: 0 });
});

Meteor.Router.add({
    '/position/:status': function(status) {
      Positions.update({}, { $set: { value: (status == 'moving') ? 1 : 0 } });
      return 'YES.';
    }
});

Meteor.Router.add({
    '/steering/:position': function(position) {
        var values = {
            'left': -1,
            'center': 0,
            'right': 1
        }
      Steerings.update({}, { $set: { value: values[position]} });
      return 'YES.';
    }
});

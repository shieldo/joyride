Positions = new Meteor.Collection('positions');
Steerings = new Meteor.Collection('steerings');

Meteor.startup(function () {
    Deps.autorun(function () {
        Meteor.subscribe('our_positions');
        Meteor.subscribe('our_steerings');
    });
});

Template.position.position = function () {
    $(document).trigger('changePosition');
    var positions = Positions.find({}).fetch();
    if (positions.length == 0) {
        return 0;
    } else {
        return positions[0].value;
    };
};

Template.steering.steering = function () {
    $(document).trigger('changeSteering');
    var steerings = Steerings.find({}).fetch();
    if (steerings.length == 0) {
        return 0;
    } else {
        return steerings[0].value;
    };
};


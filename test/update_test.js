const assert = require('assert');
const User = require('../src/user');

describe('Updating a user', () => {
    let joe; 

    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        joe.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation.then(() => User.find({}))
        .then(users => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
        });
    }

    it('instance methods set & save', (done) => {
        //set will change the property in memory, it doesn't persist the changes in database.
        joe.set('name', 'Alex');
        //if we would like to persist the changes in database, we should use save method.
        assertName(joe.save(), done);
    });

    it('instance method update', (done) => {
        assertName(joe.update({name: 'Alex'}), done);
    });

    it('class method update', (done) => {
       assertName(User.update({name: 'Joe'}, {name: 'Alex'}), done);
    });

    it('class method findOneAndUpdate', (done) => {
        assertName(User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}), done);
     });

     it('class method findByIdAndRemove', (done) => {
        assertName(User.findByIdAndUpdate(joe._id, {name: 'Alex'}), done);
     });
});
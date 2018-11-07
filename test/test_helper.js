const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost:27017/users_test', {useNewUrlParser: true});
    mongoose.connection
        .once('open', () => done())
        .on('error', err => console.warn('Warning', err));
});

beforeEach((done) => {
    const {users, comments, blogposts} = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                //Ready to run the next test!
                done();
            });
        });
    });
});
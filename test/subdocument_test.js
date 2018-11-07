const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('creates a subdocument', (done) => {

        const joe = new User({
            name: 'Joe', 
            posts: [{
                title: 'Post title'
            }]
        });

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {
                assert(user.posts[0].title === 'Post title');
                done();
            });
    });

    it('adds subdocuments to an existing user', (done) => {
        const joe = new User({name: 'Joe', posts: []});

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {
                user.posts.push({title: 'New post'});
                return user.save();
            })
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {
                assert(user.posts.length === 1);
                assert(user.posts[0].title === 'New post');
                done();
            })
    });

    it('removes an existing subdocument', (done) => {
        const joe = new User({name: 'Joe', posts: [{title: 'New title'}]});

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {
                user.posts[0].remove();
                return user.save();
            })
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {
                assert(user.posts.length === 0);
                done();
            })
    });
})
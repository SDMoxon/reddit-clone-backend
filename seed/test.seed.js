const models = require('../models/models');

const savedData = {};

function saveUser () {
  const user = new models.Users({
    username: 'northcoder',
    name: 'Awesome Northcoder',
    password: '$2a$08$SEF88mByNJ2wYizYRTwX1e8lAbKz7FY5lHCP1sp6aakMqfzIpjjbG',
    avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200'
  });
  return user.save();
}

function saveTopics() {
  const topics = [
    { title: 'Football', slug: 'football' },
    { title: 'Cooking', slug: 'cooking' },
    { title: 'Cats', slug: 'cats' }
  ].map(t => new models.Topics(t).save());
  return Promise.all(topics);
}

function saveArticles() {
  const articles = [
    { title: 'Cats are great', body: 'something', belongs_to: 'cats' },
    { title: 'Football is fun', body: 'something', belongs_to: 'football' }
  ].map(a => new models.Articles(a).save());
  return Promise.all(articles);
}

function saveComments(articles) {
  const comments = [
    { body: 'this is a comment', belongs_to: articles[0]._id, created_by: 'northcoder' },
    { body: 'this is another comment', belongs_to: articles[0]._id, created_by: 'northcoder' }
  ].map(c => new models.Comments(c).save());
  return Promise.all(comments);
}

function saveTestData() {
  return saveUser()
    .then((user) => {
      savedData.user = user;
      return saveTopics();
    })
    .then(topics => {
      savedData.topics = topics;
      return saveArticles();
    })
    .then(articles => {
      savedData.articles = articles;
      return saveComments(articles);
    })
    .then((comments) => {
      savedData.comments = comments;
      return savedData;
    });
}

module.exports = saveTestData;
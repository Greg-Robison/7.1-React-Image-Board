var Backbone = require('backbone');

var Image = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: 'https://tiny-lasagna-server.herokuapp.com/collections/greg_images/'
});

var ImageCollection = Backbone.Collection.extend({
  model: Image,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/greg_images/'
});

module.exports = {
  Image: Image,
  ImageCollection: ImageCollection
};

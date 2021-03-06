var db = require('../config');
var crypto = require('crypto');
var mongoos = require('mongoos');

var linkSchema = mongoos.Schema({
  
  url: String
  baseUrl: String
  code: String
  title: String 
  visits: Number

});

var Link = db.Model.extend({
  tableName: 'urls',
  hasTimestamps: true,
  defaults: {
    visits: 0
  },
  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      var shasum = crypto.createHash('sha1');
      shasum.update(model.get('url'));
      model.set('code', shasum.digest('hex').slice(0, 5));
    });
  }
});

module.exports = Link;

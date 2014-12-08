import Ember from "ember";
import DS from "ember-data";

export default DS.RESTAdapter.extend({
  namespace: 'data',
  suffix: '.json',


  buildURL: function(record, suffix) {
    alert(record);
    var s = this._super(record, suffix);
    return s + ".json";
  }
});

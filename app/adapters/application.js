import DS from "ember-data";

export default DS.RESTAdapter.extend({
  namespace: 'api',
  suffix: '.json',
  pathForType: function(type) {
    return this._super(type) + this.get('suffix');
  }
});
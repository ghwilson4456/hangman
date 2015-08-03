import DS from "ember-data";

export default DS.RESTAdapter.extend({
  namespace: 'api',
  suffix: '.json',
  pathForType(type) {
    return this._super(type) + this.get('suffix');
  }
});
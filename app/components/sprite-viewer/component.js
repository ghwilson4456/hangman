import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'aside',
  attributeBindings: ['style'],
  stepClasses: '',
  classNameBindings: ['stepClasses'],
  style: Ember.computed('attrs.index', 'attrs.length', 'attrs.width', 'attrs.height', 'attrs.sprite', 'attrs.disableInlineStyles', function() {
    let i = Number(this.attrs.index.value);
    let l = Number(this.attrs.length);
    let w = Number(this.attrs.width);
    let h = Number(this.attrs.height);
    let s = this.attrs.sprite;
    let px = (i * w);
    let py = 0;
    this.set('stepClasses', 'sprite-viewer--slide' + (i + 1));
    return (this.attrs.disableInlineStyles === true) ? null : new Ember.Handlebars.SafeString(`overflow:hidden;width:${w}px;height:${h}px;background:transparent url(${s}) no-repeat -${px}px -${py}px;`);
  })
});

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'aside',
  attributeBindings: ['style'],
  stepClasses: '',
  classNameBindings: ['stepClasses'],
  style: Ember.computed('attrs.index', 'attrs.length', 'attrs.width', 'attrs.height', 'attrs.sprite', 'attrs.disableInlineStyles', function() {
    let index = Number(this.attrs.index.value);
    let length = Number(this.attrs.length);
    let width = Number(this.attrs.width);
    let height = Number(this.attrs.height);
    let sprite = this.attrs.sprite;
    let x = (index * width);
    let y = 0;

    if (length > 0 && index > length - 1) {
      index = length - 1;
    }

    this.set('stepClasses', 'sprite-viewer--slide-' + (index + 1));
    return (this.attrs.disableInlineStyles === true) ? null : new Ember.Handlebars.SafeString(`overflow:hidden;width:${width}px;height:${height}px;background:transparent url(${sprite}) no-repeat -${x}px -${y}px;`);
  })
});

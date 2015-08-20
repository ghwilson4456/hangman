import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'aside',
  attributeBindings: ['style'],
  stepClasses: '',
  classNameBindings: ['stepClasses'],
  style: Ember.computed('index', 'length', 'width', 'height', 'sprite', 'disableInlineStyles', function() {
    let index = Number(this.get('index'));
    let length = Number(this.get('length'));
    let width = Number(this.get('width'));
    let height = Number(this.get('height'));
    let sprite = this.get('sprite');
    let x = (index * width);
    let y = 0;

    if (length > 0 && index > length - 1) {
      index = length - 1;
    }

    this.set('stepClasses', 'c-sprite-viewer--slide-' + (index + 1));
    return (this.get('disableInlineStyles') === true) ? null : new Ember.Handlebars.SafeString(`overflow:hidden;width:${width}px;height:${height}px;background:transparent url(${sprite}) no-repeat -${x}px -${y}px;`);
  })
});

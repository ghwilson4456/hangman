import Ember from 'ember';

const get = Ember.get;
const set = Ember.set;

const {
  Component,
  computed,
  Handlebars
} = Ember;

export default Component.extend({
  tagName: 'aside',
  attributeBindings: ['style'],
  stepClasses: '',
  classNameBindings: ['stepClasses'],
  style: computed('index', 'length', 'width', 'height', 'sprite', 'disableInlineStyles', function() {
    let index = Number(get(this, 'index'));
    let length = Number(get(this, 'length'));
    let width = Number(get(this, 'width'));
    let height = Number(get(this, 'height'));
    let sprite = get(this, 'sprite');
    let x = (index * width);
    let y = 0;

    if (length > 0 && index > length - 1) {
      index = length - 1;
    }

    set(this, 'stepClasses', 'c-SpriteViewer--slide-' + (index + 1));
    return (get(this, 'disableInlineStyles') === true) ? null : new Handlebars.SafeString(Handlebars.escapeCSS(`overflow:hidden;width:${width}px;height:${height}px;background:transparent url(${sprite}) no-repeat -${x}px -${y}px;`));
  })
});

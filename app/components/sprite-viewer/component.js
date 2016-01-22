/**
 * Display a single sprite from a spritesheet by index.
 * @param {number} index
 * @param {number} length
 * @param {string} sprite
 * @param {string} maxScale
 * @param {number} width
 * @param {number} height
 * @param {number} columns
 * @param {boolean} disableInlineStyles
 */

import Ember from 'ember';

const {
  Component,
  computed,
  get,
  Handlebars,
  set
} = Ember;

export default Component.extend({
  tagName: 'aside',
  attributeBindings: ['style'],
  stepClasses: '',
  classNameBindings: ['stepClasses'],

  defaults: {
    columns: 1,
    disableInlineStyles: false,
    index: 0,
    maxScale: 1
  },

  style: computed('index', 'length', 'width', 'height', 'sprite', 'columns', 'disableInlineStyles', function() {
    const length = Number(get(this, 'length'));
    const width = Number(get(this, 'width'));
    const height = Number(get(this, 'height'));
    const scale = window.devicePixelRatio;
    let index = Number(get(this, 'index'));
    let bgSize = (scale > 1) ? width + 'px' : 'auto';
    let sprite = get(this, 'sprite');

    if (scale > 1) {
      sprite = sprite.replace(/(\.[0-9a-z]+$)/i, `@${scale}x$1`);
      bgSize = (width * scale) + 'px';
    }

    let columns = Number(get(this, 'columns'));
    let x = -((index % columns) * width);
    let y = -(Math.floor(index / columns) * height);

    if (length > 0 && index > length) {
      index = length - 1;
    }

    set(this, 'stepClasses', 'c-SpriteViewer--slide-' + (index + 1));
    return (get(this, 'disableInlineStyles') === true) ? null : new Handlebars.SafeString(Handlebars.Utils.escapeExpression(`overflow:hidden;width:${width}px;height:${height}px;background:transparent url(${sprite}) no-repeat ${x}px ${y}px;background-size:${bgSize}`));
  }),

  init() {
    this._super.apply(this, arguments);

    for (var key in get(this, 'defaults')) {
      if (!get(this, key)) {
        set(this, key, get(this, 'defaults')[key]);
      }
    }
  }
});

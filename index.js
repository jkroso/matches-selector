
/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = vendor 
  ? match
  // Fallback for IE8 etc..
  : function match (el, selector) {
    var parent = el.parentNode, frag

    // use a DocumentFragment if the node isn't part of any other DOM node
    if (!parent) {
      parent = frag = document.createDocumentFragment();
      frag.appendChild(el);
    }

    var nodes = parent.querySelectorAll(selector)
      , i = nodes.length
    while (i--) {
      if (nodes[i] === el) {
        // detach from DocumentFragment if we used one
        if (frag) frag.removeChild(frag.lastChild)
        return true
      }
    }

    return false
  } 

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  return vendor.call(el, selector);
}
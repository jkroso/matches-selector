
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
    var root = el
      , frag

    while (root.parentNode) {
      root = root.parentNode;
    }

    // root can't be the el unless its either a Document or a DocumentFragment
    if (root === el && !(root instanceof Document || root instanceof DocumentFragment)) {
      root = frag = document.createDocumentFragment();
      frag.appendChild(el);
    }

    var nodes = root.querySelectorAll(selector)
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
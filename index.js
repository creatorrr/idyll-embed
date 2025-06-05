import React from 'react';
import ReactDOM from 'react-dom';
import IdyllDocument from 'idyll-document';
import * as IdyllComponents from 'idyll-components';

/**
 * Update this to add your own custom component. For example:
 *
 *  import MyComponent from './my-custom-component.js';
 *
 *  let components = Object.assign({}, IdyllComponents, {
 *    MyComponent: MyComponent
 *  })
 */

// Function to ensure components are properly wrapped
function wrapComponent(Component) {
  // Check if it's already a valid React component
  if (
    typeof Component === 'function' ||
    (typeof Component === 'object' && Component && Component.$$typeof)
  ) {
    return Component;
  }
  
  // If it's a class that needs wrapping, create a functional wrapper
  if (Component && Component.prototype && Component.prototype.isReactComponent) {
    return Component;
  }
  
  // Return as-is for other cases
  return Component;
}

// Wrap all components to ensure they work properly
const wrappedComponents = {};
Object.keys(IdyllComponents).forEach(key => {
  wrappedComponents[key] = wrapComponent(IdyllComponents[key]);
});

let components = Object.assign({}, wrappedComponents, {
  // put more components here
});

const Idyll = {
  render: function(markup, container, options = {}) {
    // You must provide idyllMarkup
    // and the container element (a DOM node).
    ReactDOM.render(
      React.createElement(IdyllDocument, {
        markup: markup,
        components: components,
        ...options
      }),
      container
    )
  },
  registerComponent: function(name, value) {
    const newObj = {};
    newObj[name] = value;
    components = Object.assign(components, newObj);
  }
}

window.Idyll = Idyll;
window.IdyllComponents = wrappedComponents;

// Expose all component class names (starting with uppercase) as globals
// Skip native JavaScript constructors to avoid conflicts
const nativeConstructors = ['Boolean', 'Number', 'String', 'Array', 'Object', 'Function', 'Date', 'RegExp', 'Error'];
Object.keys(wrappedComponents).forEach(key => {
  if (key[0] === key[0].toUpperCase() && !nativeConstructors.includes(key)) {
    window[key] = wrappedComponents[key];
  }
});


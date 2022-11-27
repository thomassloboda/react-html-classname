React Html ClassName
====================

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

Provides a declarative way to specify `document.getElementsByTagName("html")[0].className` in a single-page app.  
This component can be used on server side as well.

Built with [React Side Effect](https://github.com/gaearon/react-side-effect).

====================

## Installation

```
npm install --save react-html-classname
```

Dependencies: React >= 0.13.0

## Features

* Does not emit DOM, not even a `<noscript>`;
* Like a normal React compoment, can use its parent's `props` and `state`;
* Can be defined in many places throughout the application;
* Supports arbitrary levels of nesting, combining each className;
* Works just as well with isomorphic apps.

## Example

```jsx
class SomeComponent {
  render() {
    // This will add 'home' to the html
    return (
      <HtmlClassName className='home'>
        <h1>Home, sweet home.</h1>
      </HtmlClassName>
    );
  }
}

class App {
  render() {
    // This will add 'app' to the html
    return (
      <HtmlClassName className='app'>
        <SomeComponent/>
      </HtmlClassName>
    );
    // Becaase we nested the component, our html will now have 'app home'
    // as the class name
  }
}
```

Use CSS modules with webpack or similar?

```jsx
import styles from './some.css';

class Thing {
  render() {
    return (
      <HtmlClassName className={styles.html}>
        <h1>CSS modules rock!</h1>
      </HtmlClassName>
    );
  }
}
```

## Server Usage

If you use it on server, call `HtmlClassName.rewind()` **after rendering components to string** to retrieve the combined class name. You can then embed this className into HTML page template.

Because this component keeps track of mounted instances, **you have to make sure to call `rewind` on server**, or you'll get a memory leak.

[npm-url]: https://npmjs.org/package/react-html-classname
[downloads-image]: http://img.shields.io/npm/dm/react-html-classname.svg
[npm-image]: http://img.shields.io/npm/v/react-html-classname.svg

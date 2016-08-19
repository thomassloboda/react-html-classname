/*jshint newcap: false */
/*global global, describe, it, afterEach, before, after */
'use strict';
var expect = require('expect.js'),
    React = require('react'),
    HtmlClassName = require('../');

describe('HtmlClassName (in a browser)', function () {
  afterEach(function () {
    React.unmountComponentAtNode(global.document.getElementsByTagName("html")[0]);
  });
  before(function () {
    // Prepare the globals React expects in a browser
    global.window = require('global/window');
    global.document = require('global/document');
    global.window.document = document;
    global.window.location = {};
    global.window.navigator = {userAgent: 'Chrome'};
    console.debug = console.log;
    HtmlClassName.canUseDOM = true;
  });
  after(function () {
    delete global.window;
    delete global.document;
    delete console.debug;
  });

  it('changes the document html class name on mount', function (done) {
    var className = 'hello world';
    var Component = React.createClass({
      componentDidMount: function () {
        expect(global.document.getElementsByTagName("html")[0].className).to.equal(className);
        done();
      },
      render: function () {
        return React.createElement(HtmlClassName, {className: className});
      }
    });
    React.render(React.createElement(Component), global.document.getElementsByTagName("html")[0]);
  });

  it('supports nesting, gathering all classNames used', function (done) {
    var called = false;
    var firstName = 'hello world';
    var Component1 = React.createClass({
      componentDidMount: function () {
        setTimeout(function () {
          expect(called).to.be(true);
          expect(global.document.getElementsByTagName("html")[0].className).to.equal(firstName + ' ' + secondName);
          done();
        });
      },
      render: function () {
        return React.createElement(HtmlClassName, {className: firstName});
      }
    });
    var secondName = 'foo bar';
    var Component2 = React.createClass({
      componentDidMount: function () {
        called = true;
      },
      render: function () {
        return React.createElement(HtmlClassName, {className: secondName},
          React.DOM.div(null, React.createElement(Component1))
        );
      }
    });
    React.render(React.createElement(Component2), global.document.getElementsByTagName("html")[0]);
  });
});

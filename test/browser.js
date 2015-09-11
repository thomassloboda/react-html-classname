/*jshint newcap: false */
/*global global, describe, it, afterEach, before, after */
'use strict';
var expect = require('expect.js'),
    React = require('react'),
    BodyClassName = require('../');

describe('BodyClassName (in a browser)', function () {
  afterEach(function () {
    React.unmountComponentAtNode(global.document.body);
  });
  before(function () {
    // Prepare the globals React expects in a browser
    global.window = require('global/window');
    global.document = require('global/document');
    global.window.document = document;
    global.window.location = {};
    global.window.navigator = {userAgent: 'Chrome'};
    console.debug = console.log;
    BodyClassName.canUseDOM = true;
  });
  after(function () {
    delete global.window;
    delete global.document;
    delete console.debug;
  });
  it('changes the document body class name on mount', function (done) {
    var className = 'hello world';
    var Component = React.createClass({
      componentDidMount: function () {
        expect(global.document.body.className).to.equal(className);
        done();
      },
      render: function () {
        return React.createElement(BodyClassName, {className: className});
      }
    });
    React.render(React.createElement(Component), global.document.body);
  });
  it('supports nesting', function (done) {
    var called = false;
    var firstName = 'hello world';
    var Component1 = React.createClass({
      componentDidMount: function () {
        setTimeout(function () {
          expect(called).to.be(true);
          expect(global.document.body.className).to.equal(firstName + ' ' + secondName);
          done();
        });
      },
      render: function () {
        return React.createElement(BodyClassName, {className: firstName});
      }
    });
    var secondName = 'foo bar';
    var Component2 = React.createClass({
      componentDidMount: function () {
        called = true;
      },
      render: function () {
        return React.createElement(BodyClassName, {className: secondName},
          React.DOM.div(null, React.createElement(Component1))
        );
      }
    });
    React.render(React.createElement(Component2), global.document.body);
  });
});

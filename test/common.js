/*jshint newcap: false */
/*global describe, it, before */
'use strict';
var expect = require('expect.js'),
    React = require('react'),
    HtmlClassName = require('../');

describe('HtmlClassName', function () {
  before(function () {
    HtmlClassName.canUseDOM = false;
  });

  it('has a displayName', function () {
    var el = React.createElement(HtmlClassName);
    expect(el.type.displayName).to.be.a('string');
    expect(el.type.displayName).not.to.be.empty();
  });

  it('hides itself from the DOM', function () {
    var Component = React.createClass({
      render: function () {
        return React.createElement(HtmlClassName, {className: 'irrelevant'},
          React.createElement('div', null, 'hello')
        );
      }
    });
    var markup = React.renderToStaticMarkup(React.createElement(Component));
    expect(markup).to.equal('<div>hello</div>');
  });

  it('throws an error if it has multiple children', function (done) {
    var Component = React.createClass({
      render: function () {
        return React.createElement(HtmlClassName, {className: 'irrelevant'},
          React.createElement('div', null, 'hello'),
          React.createElement('div', null, 'world')
        );
      }
    });
    expect(function () {
      React.renderToStaticMarkup(React.createElement(Component));
    }).to.throwException(function (e) {
      expect(e.message).to.match(/^Invariant Violation:/);
      done();
    });
  });

  it('works with complex children', function () {
    var Component1 = React.createClass({
      render: function() {
        return React.createElement('p', null,
          React.createElement('span', null, 'c'),
          React.createElement('span', null, 'd')
        );
      }
    });
    var Component2 = React.createClass({
      render: function () {
        return React.createElement(HtmlClassName, {className: 'irrelevant'},
          React.createElement('div', null,
            React.createElement('div', null, 'a'),
            React.createElement('div', null, 'b'),
            React.createElement('div', null, React.createElement(Component1))
          )
        );
      }
    });
    var markup = React.renderToStaticMarkup(React.createElement(Component2));
    expect(markup).to.equal(
      '<div>' +
        '<div>a</div>' +
        '<div>b</div>' +
        '<div>' +
          '<p>' +
            '<span>c</span>' +
            '<span>d</span>' +
          '</p>' +
        '</div>' +
      '</div>'
    );
  });
});

describe('HtmlClassName.rewind', function () {
  it('clears the mounted instances', function () {
    HtmlClassName.rewind();
    React.renderToStaticMarkup(
      React.createElement(HtmlClassName, {className: 'a'},
        React.createElement(HtmlClassName, {className: 'b'},
          React.createElement(HtmlClassName, {className: 'c'}))
      )
    );
    expect(HtmlClassName.peek()).to.equal('a b c');
    HtmlClassName.rewind();
    expect(HtmlClassName.peek()).to.equal(undefined);
  });
  it('returns all the classNames used', function () {
    React.renderToStaticMarkup(
      React.createElement(HtmlClassName, {className: 'one'},
        React.createElement(HtmlClassName, {className: 'two'},
          React.createElement(HtmlClassName, {className: 'three'}))
      )
    );
    expect(HtmlClassName.rewind()).to.equal('one two three');
  });
  it('returns undefined if no mounted instances exist', function () {
    React.renderToStaticMarkup(
      React.createElement(HtmlClassName, {className: 'a'},
        React.createElement(HtmlClassName, {className: 'b'},
          React.createElement(HtmlClassName, {className: 'c'}))
      )
    );
    HtmlClassName.rewind();
    expect(HtmlClassName.peek()).to.equal(undefined);
  });
});

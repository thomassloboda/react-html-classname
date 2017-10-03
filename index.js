'use strict';

var React = require('react'),
  PropTypes = require('prop-types'),
  createReactClass = require('create-react-class'),
  uniq = require('lodash.uniq'),
  withSideEffect = require('react-side-effect');

function reducePropsToState(propsList) {
  return uniq(propsList.map(function(props) {
    return props.className;
  })).join(' ');
}

function handleStateChangeOnClient(stringClassNames) {
  document.getElementsByTagName("html")[0].className = stringClassNames || '';
}

var DocumentTitle = createReactClass({
  propTypes: {
    className: PropTypes.string.isRequired
  },

  render: function render() {
    if (this.props.children) {
      return React.Children.only(this.props.children);
    } else {
      return null;
    }
  }
});

module.exports = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(DocumentTitle);

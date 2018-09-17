import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core';

export default class ContentCard extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    showLength: PropTypes.string,
  }

  render() {
    const { content, showLength } = this.props;
    let showContent = content.length >= showLength
      ?
      content.slice(0, showLength) + '...'
      :
      content;

    return (
      <div>
        <Typography
          color="primary"
          variant="body1"
        >{showContent}</Typography>
      </div>
    )
  }
}

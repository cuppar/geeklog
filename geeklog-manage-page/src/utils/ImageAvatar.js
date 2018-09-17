import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Avatar } from '@material-ui/core'

export default class ImageAvatar extends Component {
  static propTypes = {
    imageUrl: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
  }

  render() {
    const { imageUrl, width, height } = this.props;

    return (
      imageUrl
        ?
        <Avatar
          alt="avatar"
          style={{ width: width || '60', height: height || '60' }}
          src={imageUrl}></Avatar>
        :
        <Avatar
          style={{
            backgroundColor: 'yellow',
            color: 'red',
          }}
        >
          U
        </Avatar>
    )
  }
}

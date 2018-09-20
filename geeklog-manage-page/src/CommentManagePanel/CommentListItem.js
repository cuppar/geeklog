import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import ImageAvatar from '../utils/ImageAvatar';
import { DangerButton } from '../utils/Buttons'
import MsgBar from '../utils/MsgBar';
import ContentCard from './ContentCard'
import axios from 'axios'

export default class CommentListItem extends Component {
  constructor(props) {
    super(props)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.token;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.baseURL = 'http://47.106.158.254/';
  }

  static propTypes = {
    comment: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
  }

  state = {
    isDeleted: false,
    resMsg: '',
  }

  componentWillUnmount = () => {
    let CancelToken = axios.CancelToken;
    let source = CancelToken.source();
    source.cancel()
  }

  handleClick = () => {
    axios.delete(`/admin/comments/${this.props.comment.comment_id}`)
      .then(res => {
        if (res.data && res.data.code === 200 && res.data.data) {
          this.setState({
            isDeleted: true,
            resMsg: res.data.message,
          })
        } else if (res.data) {
          // console.log(`Fail: delete /admin/comments/${this.props.comment.comment_id}`)
          // console.log(res.data.code + ': ' + res.data.message)
          this.setState({
            resMsg: res.data.message,
          })
        } else {
          // console.log(`Fail: delete /admin/comments/${this.props.comment.comment_id}`)
          // console.log(res)
        }
      })
      .catch(err => {
        // console.log(`Fail: delete /admin/comments/${this.props.comment.comment_id}`)
        // console.log(err)
      })
  }

  render() {
    const { comment, author } = this.props;
    const { isDeleted, resMsg } = this.state;

    return (
      isDeleted
        ?
        <MsgBar
          message={resMsg}
          display={isDeleted}
        ></MsgBar>
        :
        <div>
          <Grid container spacing={16}>
            <Grid item xs={3}>
              <ImageAvatar
                imageUrl={author.avatar}
                width="60"
                height="60"></ImageAvatar>
            </Grid>
            <Grid item xs={6}>
              <ContentCard
                content={comment.content}
                showLength="20"
              ></ContentCard>
            </Grid>
            <Grid item xs={3}>
              <DangerButton
                onClick={this.handleClick}
              >
                删除
            </DangerButton>
            </Grid>
          </Grid>
        </div>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  withStyles,
  Grid,
  Typography,
} from '@material-ui/core'
import { PinkButton } from '../utils/Buttons'
import axios from 'axios'


const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
  },
});


class AddCategoryForm extends Component {
  constructor(props) {
    super(props)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.token;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.baseURL = 'http://47.106.158.254/';
  }


  static propTypes = {
    onChangeMessage: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
  }


  handleClickDeleteButton = () => {
    axios.delete(`/admin/categories/${this.props.categoryId}`)
      .then(res => {
        console.log(res)
        if (res.data && res.data.code === 200 && res.data.data) {
          this.props.onChangeMessage(`${res.data.message}`)
        } else if (res.data) {
          this.props.onChangeMessage(res.data.code + ': ' + res.data.message)
        } else {
          console.log(`Fail: delete /admin/categories/${this.props.categoryId}`)
          console.log(res)
        }
      })
      .catch(err => {
        if (err.data) {
          this.props.onChangeMessage(err.toString())
          console.log(`Fail: delete /admin/categories/${this.props.categoryId}`)
        } else {
          this.props.onChangeMessage(err.toString())
          console.log(`Fail: delete /admin/categories/${this.props.categoryId}`)
        }
      })
  }

  render() {
    // const { classes } = this.props;

    return (
      <div>
        <Grid
          container
          direction="column"
          alignItems="stretch"
          spacing={16}
        >
          <Grid item xs={12}>
            <Typography
              color="primary"
              variant="display1"
            >
              注意: 不能删除非空分类
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PinkButton
              fullWidth
              onClick={this.handleClickDeleteButton}
            >
              确认删除分类
        </PinkButton>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(AddCategoryForm)
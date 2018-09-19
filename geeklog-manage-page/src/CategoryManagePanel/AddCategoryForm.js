import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  withStyles,
  Grid,
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
  }

  state = {
    categoryName: '',
    categoryDescription: '',
  }

  componentWillUnmount = () => {
    let CancelToken = axios.CancelToken;
    let source = CancelToken.source();
    source.cancel()
  }

  handleChangeName = (e) => {
    this.setState({
      categoryName: e.target.value,
    })
  }

  handleChangeDescription = (e) => {
    this.setState({
      categoryDescription: e.target.value,
    })
  }

  handleClickAddButton = () => {
    axios.post('/admin/categories', {
      "name": this.state.categoryName,
      "description": this.state.categoryDescription,
    })
      .then(res => {
        console.log(res)
        if (res.data && res.data.code === 200 && res.data.data) {
          this.props.onChangeMessage(`${res.data.message}: ${this.state.categoryName}`)
        } else if (res.data) {
          this.props.onChangeMessage(res.data.code + ': ' + res.data.message)
        } else {
          console.log('Fail: post /admin/forbiddens ')
          console.log(res)
        }
      })
      .catch(err => {
        if (err.data) {
          this.props.onChangeMessage(err.toString())
          console.log('Fail: post /admin/forbiddens ')
        } else {
          this.props.onChangeMessage(err.toString())
          console.log('Fail: post /admin/forbiddens ')
        }
      })
  }

  render() {
    const { classes } = this.props;
    const { categoryName, categoryDescription } = this.state;

    return (
      <div>
        <Grid
          container
          direction="column"
          alignItems="stretch"
          spacing={16}
        >
          <Grid item xs={12}>
            <Input
              fullWidth
              value={categoryName}
              onChange={this.handleChangeName}
              placeholder="分类名称"
              className={classes.input}
              inputProps={{
                'aria-label': 'category name',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              fullWidth
              value={categoryDescription}
              onChange={this.handleChangeDescription}
              placeholder="分类描述"
              className={classes.input}
              inputProps={{
                'aria-label': 'category description',
              }}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <PinkButton fullWidth onClick={this.handleClickAddButton}>添加分类</PinkButton>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(AddCategoryForm)
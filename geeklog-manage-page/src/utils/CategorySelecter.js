import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

const styles = theme => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class CategorySelecter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // categoryId: props.categoryId ? String(props.categoryId) : '',
      categorys: null,
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.token;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.timeout = 3000;
    axios.defaults.baseURL = 'http://47.106.158.254/';
  }


  static propTypes = {
    onChangeArticleCategory: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
  }


  handleChangeSelectedArticleCategory = event => {
    console.log('event.target.value: ' + event.target.value)
    console.log('event.target' + event.target.toString())
    this.props.onChangeArticleCategory(String(event.target.value))
  }

  componentDidMount = () => {
    axios.get('/admin/categories')
      .then(res => {
        if (res.data && res.data.code === 200 && res.data.data) {
          this.setState({
            // categoryId: String(res.data.data[0].category_id),
            categorys: res.data.data,
          });
          // this.props.onChangeArticleCategory(this.state.categoryId);
          console.log('res.data.data[0].categoryId: ' + res.data.data[0].category_id)
          this.props.onChangeArticleCategory(String(res.data.data[0].category_id));
        } else {
          console.log(`Fail: GET /users/categories`)
          console.log(res)
        }
      })
      .catch(err => {
        console.log(`Fail: GET /users/categories`)
        console.log(err)
      })
  }

  render() {
    const { categorys } = this.state;
    const { classes, categoryId } = this.props;
    console.log('categoryId in selecter: ' + categoryId)

    return (
      <div>
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="categoryId-selecter">文章分类</InputLabel>
            <Select
              value={categoryId}
              onChange={this.handleChangeSelectedArticleCategory}
              inputProps={{
                name: 'categoryId',
                id: 'categoryId-selecter',
              }}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {
                !categorys
                  ? <div></div>
                  :
                  categorys.map((category, index) => (
                    <MenuItem
                      key={index}
                      value={String(category.category_id)}
                    >
                      {category.name}
                    </MenuItem>
                  ))
              }
            </Select>
          </FormControl>
        </form>
      </div >
    )
  }
}

export default withStyles(styles)(CategorySelecter);

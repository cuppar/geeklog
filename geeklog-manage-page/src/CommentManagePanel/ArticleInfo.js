import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import ContentCard from './ContentCard';
import TitleBar from '../utils/TitleBar'

export default class ArticleInfo extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
  }

  render() {
    const { article } = this.props;

    return (
      <div>
        <Grid container direction="column" alignItems="center" spacing={16}>
          <Grid item container spacing={16}>
            <Grid item xs={12}>
              <TitleBar title={article.title}></TitleBar>
            </Grid>
            <Grid item xs={4}>
              <Typography
                color="secondary"
                variant="body2"
              >
                {new Date(article.created_at).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <ContentCard
              content={article.content}
              showLength="100"
            ></ContentCard>
          </Grid>
        </Grid>
      </div>
    )
  }
}

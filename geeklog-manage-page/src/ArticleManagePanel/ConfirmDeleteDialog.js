import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PropTypes } from 'prop-types';
import {
  withStyles, Typography,
} from '@material-ui/core';


const styles = theme => ({
  confirmText: {
    minWidth: 500,
  },
  fontSize24: {
    fontSize: 24,
  },
});

class ConfirmDeleteDialog extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirmDeleteDialogClose: PropTypes.func.isRequired,
    onConfirmedDeleteArticle: PropTypes.func.isRequired,
    confirmedArticleTitle: PropTypes.string.isRequired,
  };

  handleConfirmDeleteArticleButtonClick = (e) => {
    this.props.onConfirmedDeleteArticle();
  };

  handleConfirmDeleteDialogClose = (e) => {
    this.props.onConfirmDeleteDialogClose();
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleConfirmDeleteDialogClose}
          aria-labelledby="confirm-dialog-title"
        >
          <DialogTitle
            color="primary"
            className={classes.fontSize24}
            id="confirm-dialog-title">
            删除确认
          </DialogTitle>
          <DialogContent>
            <Typography
              className={classes.confirmText}
              color="primary"
              display="display1">
              {`确认删除标题为 "${this.props.confirmedArticleTitle}" 文章吗?`}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.fontSize24}
              onClick={this.handleConfirmDeleteDialogClose}
              color="primary">
              取消
            </Button>
            <Button
              className={classes.fontSize24}
              onClick={this.handleConfirmDeleteArticleButtonClick}
              color="primary">
              确定
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ConfirmDeleteDialog);
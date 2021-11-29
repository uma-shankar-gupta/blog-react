import React from 'react';
import {Button, Dialog, DialogActions, DialogTitle} from '@material-ui/core';

const ConfirmDialog = ({open_status,msg, handleDialog, confirmClick}) => {

    return 	<Dialog open={open_status} onClose={handleDialog}>
						<DialogTitle id="form-dialog-title">Are you sure want to {msg}?</DialogTitle>
						<DialogActions>
						  <Button onClick={handleDialog} color="primary">
							Cancel
						  </Button>
						  <Button onClick={confirmClick} color="primary">
							confirm
						  </Button>
					</DialogActions>
			</Dialog>
};

export default ConfirmDialog;
import React from 'react';
import {Button, Dialog, DialogActions, DialogTitle} from '@material-ui/core';

const OutDialog = ({open_logout, handlelogoutClick,logoutClick}) => {
    return 	<Dialog open={open_logout} onClose={handlelogoutClick}>
						<DialogTitle id="form-dialog-title">Are you sure want to Logout?</DialogTitle>
						<DialogActions>
						  <Button onClick={handlelogoutClick} color="primary">
							Cancel
						  </Button>
						  <Button onClick={logoutClick} color="primary">
							Yes! Logout me
						  </Button>
					</DialogActions>
			</Dialog>
};
export default OutDialog;
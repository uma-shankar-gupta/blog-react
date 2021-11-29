import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alerts =({alert_s,dur=2000, setAlert, alt_msg,alt_type})=> {

	  const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}

		setAlert(false);
	  };

	  return <Snackbar 
					open={alert_s} 
					anchorOrigin={{horizontal:'center', vertical:'top'}}
					autoHideDuration={dur} 
					onClose={handleClose}	>
				<MuiAlert 
					onClose={handleClose} 
					severity={alt_type}  
					variant='filled'					
					elevation={4} >
						{alt_msg}
				</MuiAlert>
			</Snackbar> ;
}

export default Alerts;
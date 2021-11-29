import React from 'react'; 
import {Typography, Button} from '@material-ui/core';

const Logout = ({logoutClicked}) => {
	
    return 	<Button onClick={logoutClicked} >
				<Typography style={{'color':'white'}} >
					LogOut
				</Typography>
			</Button>
};
export default Logout;
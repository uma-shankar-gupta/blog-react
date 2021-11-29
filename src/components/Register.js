import React from 'react'; 
import {Typography, Button} from '@material-ui/core';

const Register = ({handleRegClick}) => {
    return 	<Button onClick={handleRegClick}>
				<Typography style={{'color':'white'}} >
					Register
				</Typography>
			</Button>
};
export default Register;
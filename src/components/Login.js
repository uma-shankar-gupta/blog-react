import React from 'react'; 
import {Typography, Button} from '@material-ui/core';

const Login = ({loginClicked}) => {
    return 	<Button onClick={loginClicked} >
				<Typography style={{'color':'white'}} >
					Login
				</Typography>
			</Button>
};
export default Login;
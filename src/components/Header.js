import React, {useState} from 'react'; 
import {AppBar, Typography, Toolbar, IconButton} from '@material-ui/core';
import { Menu } from "@material-ui/icons";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import OutDialog ,{InDialog, RegDialog} from "./InOutDialog";


const Header = ({pz, setPz, loginClicked,toggleDrawer, open_login}) => {
	
	const [open_logout, setOpen_logout] = useState(false);
	const [open_reg, setOpen_reg] = useState(false);
	
	const logoutClicked = () => setOpen_logout(!open_logout);
	const handleRegClick = () => setOpen_reg(!open_reg);
	
    return <div>
			<AppBar>
                  <Toolbar>
                    <IconButton edge="start" onClick={toggleDrawer} color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        Blogger
                    </Typography>
					{pz? <React.Fragment><Typography variant="subtitle1">
                        <span style={{'marginLeft':'30px'}}></span>{pz.user},
						</Typography>
						<Logout logoutClicked={logoutClicked} /></React.Fragment>
						:
					<div><Login loginClicked={loginClicked} /><Register handleRegClick={handleRegClick} /></div>}
                </Toolbar>
            </AppBar>
			
			<InDialog 
				setPz={setPz}
				open_login={open_login} 
				handleloginClick={loginClicked}/>		
			
			<OutDialog 
				pz={pz} 
				setPz={setPz} 
				open_logout={open_logout} 
				handlelogoutClick={logoutClicked} />
				
			<RegDialog 
				open_reg={open_reg} 
				handleRegClick={handleRegClick} />
			
			
		</div>
};
export default Header;
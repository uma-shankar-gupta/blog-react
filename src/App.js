import React, {useState} from 'react';
import Header from './components/Header';
import LDrawer from './components/LDrawer';
import PostList from './components/PostList';
import {Container,CircularProgress} from '@material-ui/core';

function App() {
	
	let pz0 = JSON.parse(localStorage.getItem('pz'));
	
	const [pz, setPz] = useState(pz0);
	const [open_login, setOpen_login] = useState(false);
	const [open_d, setOpenD] = useState(false);
	const [loading, setLoadingM] = useState(true);
	
	const loader =<div style={{'position':'absolute','top':'0','width':'100vw', 'height':'100vh','backgroundColor':'rgb(0,255,200,0.5)'}}>
					<CircularProgress 
					size={60}
					thickness={1}
					style={{'position':'relative', 'marginTop':'40vh','marginLeft':'40%'}} color='secondary' />
				</div>;

	setTimeout(()=>{setLoadingM(false)}, 500)

	
	const toggleDrawer = () =>setOpenD(!open_d);
	const loginClicked = () =>setOpen_login(!open_login);
	
  return <React.Fragment>
			{loading?loader:
			<div className="App">
					<Header 
						pz={pz} 
						setPz={setPz} 
						toggleDrawer={toggleDrawer} 
						loginClicked={loginClicked} 
						open_login={open_login} 
									/>
					<LDrawer 
						toggleDrawer={toggleDrawer} 
						open_d={open_d} 
									/>
					
					<Container maxWidth="sm">
						<PostList pz={pz} loginClicked={loginClicked}/>
					</Container>
					
				</div>}
			</React.Fragment>;
}

export default App;

import React, {useState}from 'react';
import {Button, Dialog, DialogActions, DialogTitle ,DialogContent, TextField} from '@material-ui/core';
import axios from 'axios';
import ConfirmDialog from './ConfirmDialog';
import Alerts from "./Alerts";

const login_url = 'http://localhost:8000/api/login/';
const logout_url = 'http://localhost:8000/api/logout/';
const reg_url = 'http://localhost:8000/api/register/';


const OutDialog = ({pz, setPz, open_logout, handlelogoutClick}) => {
	
	const [alert_s, setAlert] = useState(false);
	
	const logoutClick = ()=>{
		axios({
		'method': 'POST',
		'url': logout_url,
		'headers':{
			'Authorization': `Token ${pz.t}`
		}
	})
		.then(res => {
			if(res.status===204){
			localStorage.removeItem('pz');
			setPz(null)
			setAlert(true);
		}})
		.catch(err=> console.log(err))
		handlelogoutClick();
	}
	
	
	return 	<React.Fragment>
				<ConfirmDialog 
					open_status={open_logout} 
					handleDialog={handlelogoutClick} 
					confirmClick={logoutClick}
					msg='logout'
				/>
				<Alerts 
						alert_s={alert_s} 
						setAlert={setAlert}
						alt_msg = 'You are logged out'
						alt_type='info' />
			</React.Fragment>
};


const InDialog = ({setPz, open_login, handleloginClick})=>{
	
	const [msg, setMsg] = useState('');
	const [alert_s, setAltOpen] = useState(false);
	
	const loginClick = () => {
		let username = document.getElementById('username').value;
		let password = document.getElementById('password').value;
		if (username && password){
			axios({
					'method': 'POST',
					'url': login_url,
					'auth':{
						'username': username,
						'password': password
							}
						})
					.then(res =>
					{  	handleloginClick();
						if(res.status===200){
						
						var pz1 = {
							't':res.data.token,
							'id':res.data.id,
							'user':res.data.username};
						var pz_str = JSON.stringify(pz1);
						localStorage.setItem('pz', pz_str);
						setPz(pz1);
						setAltOpen(true);
						setMsg('');
					}})
					.catch(err=> {setMsg('* invalid username or password !');
					console.log(err)})
		}else{
			setMsg('* please fill all fields!')
		}
	};

	
	return <React.Fragment>
				<Dialog open={open_login} onClose={handleloginClick}>
						<DialogTitle id="form-dialog-title">Login</DialogTitle>
					<DialogContent>
							<TextField autoFocus margin="dense" id="username" label="Username" type="text" fullWidth  />
							<TextField margin="dense" id="password" label="Password" type="password" fullWidth />
							<p style={{'margin':'0', 'color':'red'}}>{msg}</p>
					</DialogContent>
						<DialogActions>
						  <Button onClick={handleloginClick} color="primary">
							Cancel
						  </Button>
						  <Button onClick={loginClick} color="primary">
							Login
						  </Button>
					</DialogActions>
				</Dialog>
				<Alerts 
					alert_s={alert_s} 
					setAlert={setAltOpen}
					alt_msg = 'You are logged in!'
					alt_type='success' />
			</React.Fragment>	
}

const RegDialog = ({open_reg, handleRegClick})=>{
	
	const [err, setErr] = useState('');
	const [alert_s, setAlert] = useState(false);
	const [new_user, setUser] = useState('')
	
	const ajaxCall=()=>{
		var username = document.getElementById('username1').value;
		if(username){
			axios({
				'method':'GET',
				'url':'http://localhost:8000/register/validuser/',
				'params':{
				'username':username
			}})
					.then(res => {
						if(res.data.is_taken){
						setErr('username already exists! try other')
						}else{setErr('')}
						})
					.catch(err=> console.log(err))
			}
	}
	
	const RegClick = () => {
		let username = document.getElementById('username1').value;
		let password1 = document.getElementById('password1').value;
		let password2 = document.getElementById('password2').value;
		let email = document.getElementById('email').value;
		
	if(username && password1 && password2){
			if(password1===password2){
				axios.post(reg_url,{
							'username': username,
							'email':email,
							'password': password2
							})
		.then(res =>{
			setUser(res.data.username);
		  	handleRegClick();
			setAlert(true);
			setErr('');
			})
		.catch(er => {
			setErr('Server Error :'+err);
			})
			}else{
			setErr("passord and confirm password doesn't match");
		}}else{
		setErr('Enter all Details');}
		}
	

	
	return 	<React.Fragment>
				<Dialog open={open_reg} onClose={handleRegClick}>
						<DialogTitle id="form-dialog-title">Register</DialogTitle>
					<DialogContent>
							<TextField autoFocus margin="dense" onBlur={ajaxCall} id="username1" label="Username" type="text" fullWidth  />
							<TextField margin="dense" id="email" label="Email" type="email" fullWidth  />
							<TextField margin="dense" id="password1" label="Password" type="password" fullWidth />
							<TextField margin="dense" id="password2" label="confirm password" type="password" fullWidth />
							<p style={{'margin':'0', 'color':'red'}}>{err}</p>
					</DialogContent>
						<DialogActions>
						  <Button onClick={handleRegClick} color="primary">
							Cancel
						  </Button>
						  <Button onClick={RegClick} color="primary">
							Submit
						  </Button>
					</DialogActions>
				</Dialog>
				<Alerts 
					alert_s={alert_s} 
					setAlert={setAlert}
					alt_msg = {'You are Registered! '+new_user+' now you can log in'}
					alt_type='success' />
			</React.Fragment>
}

export default OutDialog;
export  {InDialog};
export  {RegDialog};

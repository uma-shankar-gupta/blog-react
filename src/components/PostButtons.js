import React,{useState, useEffect} from 'react'; 
import {Typography,IconButton} from '@material-ui/core';
import {ThumbUp,Delete, Edit} from '@material-ui/icons';
import axios from 'axios';
import ConfirmDialog from './ConfirmDialog';
import PostDialog from './PostDialog';
import Alerts from "./Alerts";
//-----------------------urls--------------
const like_url = 'http://localhost:8000/api/like/';
const post_url = 'http://localhost:8000/api/posts/';

//-----------------------axiosPromise function-------------
const axiosCall=(url,method, pz,data)=>{
	var request = axios({
						'method': method,
						'url': url,
						'headers':{
							'Authorization': `Token ${pz.t}`
						},
						'data':data
					
					})
		return request
		}
		
		

//************--------PostlikeButton component--------***************		
const PostLikeButton = ({pz,likes, id,loginClicked}) => {
	
		let like_n = likes? likes.length : 0;
		let data = {'post_id':id};
//-----------states----------
	   const [like, setLike] = useState(false);
	   const [like_c, setLike_c] = useState(like_n);
	
//-----------effects--------
	   useEffect(()=>{   
	   if(likes){
		for(var lik of likes){
			if(pz && lik.like_by===pz.id){setLike(true)}
				}
	   }},[pz, likes])
	   
	   useEffect(()=>{
	   if(!pz){setLike(false);}
	   },[pz, like])
	   
//-------------click--functions----
	  const likeClicked=()=>{
		 pz? axiosCall(like_url, 'POST', pz, data)
			.then(res => {
						setLike_c(res.data.like_count);
					setLike(!like)})
			.catch(err=> console.log(err))
			: loginClicked();
	  }
	  
//-------------render-------  
		return <IconButton onClick={likeClicked}>
					<Typography varient='subtitle2'>{like_c} &nbsp;</Typography>
					<ThumbUp style={{'color': pz&&like?'blue':'gray',}}/>
				</IconButton>
	};
export {PostLikeButton};




//*********------------PostDeleteButton------------*********
const PostDeleteButton = ({pz,id, getdata, setAlert}) => {
	
	
//-----------states------
	const [open_del, setOpenDel] = useState(false);
//-----------effects-----

//----------click--functions------ 
	const handleDel = ()=>setOpenDel(!open_del)
	
	  const deleteClicked=()=>{
			axiosCall(post_url+id+'/', 'DELETE', pz)
				.then(res => {
					getdata();
					handleDel();
					setAlert(true);
					})
				.catch(err=> console.log(err))
	  }
	  
//-------------render----- 
		return		<React.Fragment>
						<IconButton onClick={handleDel}>
								<Delete style={{'color': '#313140'}}/>
						</IconButton>
						<ConfirmDialog
							open_status={open_del}
							handleDialog={handleDel}
							msg='Delete'
							confirmClick={deleteClicked}
								/>

					</React.Fragment>
	};
export {PostDeleteButton};


//*********------------PostDeleteButton------------*********
const PostEditButton = ({pz,id, getdata, data}) => {

//-----------states----
	const [open_edit, setOpenEdit] = useState(false);
	const [err, setErr] = useState('');
	const [alert_s, setAlert] = useState(false);
//-----------effects----

//-------------click--functions--  
	const handleEdit = ()=>setOpenEdit(!open_edit)
	
	  const editClicked=()=>{
			let title=document.getElementById('title').value;
			let content=document.getElementById('content').value;
			let new_data ={
				'title': title,
				'content': content,
			}
		 if(title && content){
			 axiosCall(post_url+id+'/', 'PUT', pz, new_data)
				.then(res => {
					getdata();
					handleEdit();
					setAlert(true);
					setErr('');
					})
				.catch(err=> console.log(err))
		 }else{
			setErr('* Fill all fields');
		 };
	  }
	  
//-------------render----
		return	<React.Fragment>
					<IconButton onClick={handleEdit}>
						<Edit style={{'color': '#4c79ff'}}/>
					</IconButton>
					<PostDialog 
						open_d={open_edit} 
						msg={'New'}
						submitClicked={editClicked}
						title={data.title}
						content={data.content}
						err ={err}
						handleDialog={handleEdit} 
						/>
					<Alerts 
						alert_s={alert_s} 
						setAlert={setAlert}
						alt_msg = 'Post Edited'
						alt_type='success' />
				</React.Fragment>
	};
export {PostEditButton};




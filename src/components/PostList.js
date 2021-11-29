import React, {useState, useEffect} from 'react'; 
import Post from './Post';
import NewPost from './NewPost';
import {Grid, Fab,CircularProgress} from '@material-ui/core';
import {Edit, Lock} from '@material-ui/icons';
import axios from 'axios';
import Alerts from "./Alerts";

const post_url = 'http://localhost:8000/api/posts/';


const PostList = ({pz, loginClicked}) => {
	
	const [open_new, setOpen_new] = useState(false);
	const [post_list, setPost] = useState();
	const [alert_s, setAlert] = useState(false);
	const [loadingpost, setLoading] = useState(true);	
		
	const getdata=()=>{
			setLoading(true);
			axios.get(post_url)
			.then(res => {setPost(res.data.reverse())})
			.catch(err => console.log(err))
	}
	
	useEffect(()=>{
		 getdata();
		 }, [pz]);
	useEffect(()=>{
		setTimeout(()=>{
			setLoading(false)
		},300)
	},[post_list])
	 
	const handleNewClick = () => setOpen_new(!open_new);
	
	 
   return <div style={{'marginTop':'60px'}}>
			{loadingpost?<div style={{'position':'absolute','top':'0','marginLeft':'-20px','width':'100vw', 'height':'100vh', 'backgroundColor':'rgb(0,0,0,0.5)'}}>
						<CircularProgress size={40} thickness={2} style={{'position':'relative', 'marginTop':'200px','marginLeft':'45%','color':'#26ffff'}}  />
				</div>
				:
				<Grid container spacing={2} direction='column'>
					
					{ post_list && post_list.map((post) => { 
						
					return <Post 
								loginClicked={loginClicked} 
								key={post.id} 
								getdata={getdata} 
								pz={pz} 
								post={post}
								setAlert={setAlert}
								/> ;
					})}
				
				</Grid>}
				
				<NewPost 
					pz= {pz}
					getdata={getdata}
					open_new={open_new} 
					handleNewClick={handleNewClick} />
						
			{ pz?<div style={{'position':'sticky','bottom':'30px'}}>
					<Fab color="secondary" aria-label="edit" onClick={handleNewClick}>
						<Edit />
					</Fab>
				</div>
				: 
				<div style={{'position':'sticky','bottom':'30px'}}>
					<Fab color="primary" onClick={loginClicked}>
						<Lock />
					</Fab>
				</div> }
				<Alerts 
						alert_s={alert_s} 
						setAlert={setAlert}
						alt_msg = 'Post deleted'
						alt_type='success' />
			</div>
};


export default PostList;
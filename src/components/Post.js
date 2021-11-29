import React,{useState, useEffect} from 'react'; 
import {Grid, Typography, Paper,Avatar, Link, IconButton, Divider} from '@material-ui/core';
import {Comment} from '@material-ui/icons';
import {PostLikeButton, PostDeleteButton, PostEditButton} from './PostButtons';

const image_url = 'http://localhost:8000';

const Post = ({post, pz,setAlert, getdata,loginClicked}) => {
	
	const {likes,title, content, author, date_posted, comments, id, image} = post;
	let data ={
		'title':title,
		'content':content
	}
	let comment_c = comments? comments.length : 0;
	const [owner, setOwner] = useState(false);
	  
	   useEffect(()=>{
		if (pz && author===pz.user){
			setOwner(true);
		}else{setOwner(false)}
	   },[pz,author])
	   
	   let dt = new Date(date_posted);
	   let date = dt.toLocaleDateString('en-GB',{
		   day :'2-digit',
		   month: 'short',
		   year: 'numeric'
	   });
	   let tim = dt.toLocaleTimeString('en-GB',{
		   hour :'2-digit',
		   minute: '2-digit',
		   second: '2-digit'
	   });
	  
	return <Grid item>
				<Paper style={{'padding':'20px'}}>
					<Grid container spacing={2} direction='column'>
						<Grid container item wrap="nowrap" spacing={2}>
							<Grid item>
								<Avatar src={image_url+image} />
							</Grid>
							<Grid item container direction='column' xs>
								<Grid item>
									<Typography variant='h5'>{title}</Typography>
								</Grid>
								<Grid item sm>
									<Typography variant='body1'> <Link href="#">{author}</Link> &nbsp;&nbsp;&nbsp;at {tim}&nbsp; on {date} </Typography>
								</Grid>
							</Grid>
						</Grid>
					<Divider />
						<Grid container item justify='flex-start' direction='column' style={{'paddingLeft':'25px'}}>
							<Grid item>
								<Typography variant='subtitle1'>{content}</Typography>
							</Grid>
							<Grid container item justify='space-between' direction='row'>
								<Grid item>
									<PostLikeButton 
										pz={pz} 
										likes ={likes} 
										id={id} 
										loginClicked={loginClicked} />
									<IconButton>
										<Typography varient='subtitle2' >{comment_c} &nbsp;</Typography>
										<Comment style={{'color': 'blue'}}/>
									</IconButton>
								</Grid>
								<Grid item>
						{owner?<React.Fragment>
									<PostEditButton 
										pz={pz}
										id={id}
										getdata={getdata} 
										data={data}	/>
									<PostDeleteButton 
										pz={pz} 
										id={id}
										getdata={getdata}
										setAlert={setAlert} />
								</React.Fragment>
								:''}
								</Grid>
							</Grid>
						</Grid>
						</Grid>
					</Paper>
				</Grid>
	};


export default Post;
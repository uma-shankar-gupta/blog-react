import React , {useState}from 'react'; 
import axios from 'axios';
import PostDialog from './PostDialog';
import Alerts from "./Alerts";

const post_url = 'http://localhost:8000/api/posts/';

const NewPost = ({pz,getdata, open_new, handleNewClick}) => {
	
	const [err, setErr] = useState('');
	const [alert_s, setAlert] = useState(false);
	
	
	const submitPost = ()=>{
		
		var title = document.getElementById('title').value;
		var content = document.getElementById('content').value;
		
		if(title && content){
			axios({
			'method': 'POST',
			'url': post_url,
			'headers':{'Authorization': `Token ${pz.t}`},
			'data' :{'title':title, 'content': content}})
			.then(res => { 
			if (res.status===201){
				getdata();
			}})
			.catch(err=> console.log(err))
			handleNewClick();
			setAlert(true);
			setErr('');
		}else{
			setErr('* Please Fill All fields!');
		}
};

    return 	<React.Fragment>	
				<PostDialog open_d={open_new} 
					msg={'New'}
					err={err}
					submitClicked={submitPost}
					handleDialog={handleNewClick} />
					<Alerts 
						alert_s={alert_s} 
						setAlert={setAlert}
						alt_msg = 'Posted'
						alt_type='success' />
			</React.Fragment>
};

export default NewPost;
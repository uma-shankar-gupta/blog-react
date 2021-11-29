import React from 'react'; 
import {Button, Dialog, DialogActions, DialogTitle ,DialogContent, TextField} from '@material-ui/core';

const PostDialog = ({open_d,msg,err,submitClicked,title,content, handleDialog}) => {
	
    return 	<Dialog open={open_d} onClose={handleDialog} aria-labelledby="form-dialog-title">
						<DialogTitle id="form-dialog-title">{msg} Post</DialogTitle>
					<DialogContent>
							<TextField autoFocus margin="dense" id="title" label="Post Title" defaultValue={title} type="text" fullWidth  />
							<TextField variant='outlined' multiline margin="dense" id="content" label="Post Content" defaultValue={content} type="text" fullWidth />
							<p style={{'margin':'0', 'color':'red'}}>{err}</p>
					</DialogContent>
						<DialogActions>
						  <Button onClick={handleDialog} color="primary">
							Cancel
						  </Button>
						  <Button onClick={submitClicked} color="primary">
							  submit
						  </Button>
					</DialogActions>
			</Dialog>
};

export default PostDialog;
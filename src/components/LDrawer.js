import React from 'react';
import {Drawer,List, Divider, ListItem,ListItemIcon, ListItemText} from '@material-ui/core';
import {Inbox, Mail} from '@material-ui/icons';

export default function LDrawer({open_d,toggleDrawer}) {


  return <div>
          <Drawer anchor='left' open={open_d} onClose={toggleDrawer}>
            <div>
			<List>
				<ListItem button >
					<ListItemIcon><Inbox /> </ListItemIcon>
					<ListItemText primary='Inbox' />
				</ListItem>
				<Divider />
				<ListItem button >
					<ListItemIcon><Mail /> </ListItemIcon>
					<ListItemText primary='Mail' />
				</ListItem>
			</List>
			</div>
          </Drawer>
		</div>
}
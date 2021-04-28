import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';


export default class sideBar extends React.Component {
    
    render() {
        return (  
            <ProSidebar style={{height: `100vh`}}>
                <Menu >
                    <MenuItem >Sorting Visualizer</MenuItem>
                    <MenuItem ></MenuItem>
                    <MenuItem >Reset Array</MenuItem>
                    <MenuItem >Change Length</MenuItem>
                    <MenuItem >change speed</MenuItem>
                    <MenuItem >Choose Algorithm</MenuItem>
                </Menu>
            </ProSidebar>            
        )
    }
}
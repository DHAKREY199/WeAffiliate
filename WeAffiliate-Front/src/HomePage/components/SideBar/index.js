import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import UserInfo from './UserInfo';
import Nav from './Nav';


class SideBar extends Component {

  state = {};

  render() {
  let  backgroundImage=require( '../../assets/images/sidebar-5.jpg');
    return (
      <div className="sidebar" data-image={backgroundImage}>
        <div className="sidebar-wrapper">
          <UserInfo />
          <div className="line"></div>
          <Nav />
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
 //enableBackgroundImage: state.ThemeOptions.enableBackgroundImage,
 //backgroundColor: state.ThemeOptions.backgroundColor,
  //backgroundImage: state.ThemeOptions.backgroundImage
});

export default withRouter(
  connect(mapStateToProps)(SideBar)
);
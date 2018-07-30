import React from 'react';
import { Route} from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { setMobileNavVisibility } from '../../reducers/Layout';
import { withRouter } from 'react-router-dom';
import '../../assets/styles/base.scss';
import Header from '../../pages/Main/Header';
import Users from '../../components/Users'
import UserProfile from '../UserProfile';
import SideBar from '../../components/SideBar';
import FieldSetting from '../../components/Field Setting'
import CategorySetting from '../../components/Category Setting'
import ThankYou from '../../components/Thank You Message'
import buttonsetting from '../../components/Button Setting'
import Feedback from '../../components/View Feedback'
import Style from '../../components/Style'

const Main = ({
  mobileNavVisibility,
  hideMobileMenu,
  history
}) => {
  history.listen(() => {
    if (mobileNavVisibility === true) {
      hideMobileMenu();
    }
  });

  return (

    <div className={cx({
    'nav-open': mobileNavVisibility === true
  })}>

    <div className="wrapper">
      <div className="close-layer" onClick={hideMobileMenu}></div>
      <SideBar />

      <div className="main-panel">
        <Header />

        <Route path="/Users" component={Users}/>
        <Route path="/profile" component={UserProfile} />
        <Route path="/components/FieldSetting" component={FieldSetting}/>
        <Route path="/components/CategorySetting" component={CategorySetting}  />
        <Route path="/components/Thank"  component={ThankYou}/>
        <Route path="/components/buttonsetting" component={buttonsetting} />
        <Route path="/ViewFeedback" component={Feedback} />
        <Route path="/components/Style" component={Style} />

      </div>
    </div>
  </div>



  )
};

const mapStateToProp = state => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
});

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));

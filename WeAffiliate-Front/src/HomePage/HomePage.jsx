import React from 'react';
import { connect } from 'react-redux';
import Dashboard from './pages/Main'

class HomePage extends React.Component {    
    render() {
            return (
            <div>
                <Dashboard/>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}
const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
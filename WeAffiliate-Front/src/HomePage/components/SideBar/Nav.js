import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';


class Nav extends Component {

  state = {};

  render() {
    let { location } = this.props;
    return (
      <ul className="nav">
        <li className={location.pathname === '/Users' ? 'active' : null}>
          <Link to="/Users">
            <i className="pe-7s-graph"></i>
            <p>Users</p>
          </Link>
        </li>
        <li className={this.isPathActive('/CustomizeWidget') || this.state.componentMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ componentMenuOpen: !this.state.componentMenuOpen })}
            data-toggle="collapse">
            <i className="pe-7s-plugin"></i>
            <p>
              Customize Widget
            <b className="caret"></b>
            </p>
          </a>
          <Collapse in={this.state.componentMenuOpen}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/components/buttonsetting') ? 'active' : null}>
                  <Link to='/components/buttonsetting'>Button Setting</Link>
                </li>
                <li className={this.isPathActive('/components/CategorySetting') ? 'active' : null}>
                  <Link to='/components/CategorySetting'>Category Setting</Link>
                </li>
                <li className={this.isPathActive('/components/FieldSetting') ? 'active' : null}>
                  <Link to='/components/FieldSetting'>Field Setting</Link>
                </li>
                <li className={this.isPathActive('/components/Thank') ? 'active' : null}>
                  <Link to='/components/Thank'>ThankYou Message</Link>
                </li>
                <li className={this.isPathActive('/components/Thank') ? 'active' : null}>
                  <Link to='/components/Style'>Style</Link>
                </li>


              </ul>
            </div>
          </Collapse>
        </li>

        <li className={this.isPathActive('/ViewFeedback') ? 'active' : null}>
          <Link to="/ViewFeedback">
            <i className="pe-7s-date"></i>
            <p>View Feedback</p>
          </Link>
        </li>
      </ul>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);

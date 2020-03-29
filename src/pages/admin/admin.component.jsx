import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectUser, selectCurrentUser } from "../../redux/user/user.selector";

import "./admin.styles.scss";

const Admin = ({ currentUser }) => (
  <div className=".admin-page">
    Admin
    {currentUser ? (
      <React.Fragment>
        <p>I'm a user</p>
        {currentUser.admin ? <p>I'm admin</p> : <p>I'm not admin</p>}
      </React.Fragment>
    ) : (
      <p>Signed in as a Guest</p>
    )}
    <p>asdfas</p>
    <h1>asfasfa</h1>
  </div>
);
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Admin);

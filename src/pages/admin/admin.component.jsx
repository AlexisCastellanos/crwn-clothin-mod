import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectUser, selectCurrentUser } from "../../redux/user/user.selector";
import {
  firestore,
  convertCollectionsSnapShotToMap
} from "../../firebase/firebase.utils";

import "./admin.styles.scss";

class Admin extends React.Component {
  unsubscribeFromSnapshot = null;

  state = {
    isdata: false,
    data: null
  };

  getOrders = () => {
    const collectionRef = firestore.collection("pendings");

    collectionRef.onSnapshot(async snapshot => {
      console.log("collectionRef");
      console.log(snapshot);
      const ddata=convertCollectionsSnapShotToMap(snapshot);
      console.log(ddata);
      console.log(ddata[0].id);
      let obj=[ddata];
      console.log(obj);
      this.setState({
        data:ddata[0].id+ddata[1].id
      })
    });
    console.log("this.state");
    console.log(this.state);
  };

  getOrders2 = () => {
    console.log(this.state);
  };

  render() {
    let orders = null;
    if (this.props.currentUser) {
      console.log("I'm a user");
      if (this.props.currentUser.admin) {
        console.log("I'm an Admin");
        orders = <p>{this.state.data}</p>;
      } else {
        console.log("I'm not an Admin");
        orders = <p>Im NOT an admin</p>;
      }
    } else {
      console.log("I'not a user");
    }

    return (
      <div className=".admin-page">
        Admin
        <button onClick={this.getOrders}>Pedidos</button>
        <button onClick={this.getOrders2}>Pedidos</button>
        {orders}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Admin);

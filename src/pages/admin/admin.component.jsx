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
    order: null,
    collectionOrder: null,
    show: false
  };

  getOrders = () => {
    const collectionRef = firestore.collection("pendings");

    collectionRef.onSnapshot(async snapshot => {
      console.log("collectionRef");
      console.log(snapshot);
      const collectionOrder = convertCollectionsSnapShotToMap(snapshot);

      var order = collectionOrder.reduce(function(acc, cur, i) {
        acc[i] = cur;
        return acc;
      }, {});
      let ddata = { ...[collectionOrder] };
      console.log("collectionOrder[0]");
      console.log(collectionOrder[0]);
      console.log("order[0]");
      console.log(order[0]);

      const test = [...ddata[0]];
      console.log("test.map(item => console.log(item.id))");
      test.map(item => console.log(item.id));
      this.setState({
        collectionOrder,
        order: test,
        show: true
      });
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
        if (this.state.show == false) {
          orders = <p></p>;
        } else {
          console.log("this.state.order");
          console.log(this.state.order[0].id);
          console.log("this.state.order");

          this.state.order.map(item => console.log(item.id));
          // orders = <p>{this.state.order[0].id}</p>;
          orders = (
            <div>
              {this.state.order.map(item => (
                <React.Fragment key={item.currentUser + "" + item.id}>
                  <p
                    style={{ justifyContent: "space-evenly", display: "flex" }}
                    key={item.currentUser + "" + item.id}
                  >
                    {item.id +
                      " / " +
                      item.currentUserID +
                      " / " +
                      item.personal.address.phone1 +
                      " / " +
                      item.personal.address.phone2}

                    <p
                      // style={{ justifyContent: "space-evenly", display: "flex" }}
                      key={item.currentUser + "" + item.id}
                    >
                      {"$" + item.total}
                    </p>
                    <button key={item.currentUser + "" + item.id}>
                      Show Items
                    </button>
                  </p>
                </React.Fragment>
              ))}
            </div>
          );
        }
      } else {
        orders = <p>Im NOT an admin</p>;
      }
    } else {
      console.log("I'not a user");
    }

    return (
      <div className=".admin-page">
        <button onClick={this.getOrders}>Show Pending Orders</button>
        {orders}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Admin);

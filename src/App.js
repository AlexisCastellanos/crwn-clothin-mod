import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SingInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import emailTest from "./pages/emailTest/emailTest.component";
import Admin from "./pages/admin/admin.component";

import {
  auth,
  createUserProfileDocument,
  createUserProfileDocument2,
  dummy
} from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectUser, selectCurrentUser } from "./redux/user/user.selector";

const HatsPage = () => (
  <div>
    <h1>Hats</h1>
  </div>
);

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     currentUser: null
  //   };
  // }
  unsubscribeFromAuth = null;
  unsubscribeFromAuth2 = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    const additionalDatax = {
      favorites: {
        food: "Pizza",
        color: "Blue",
        subject: "Recess"
      }
    };

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(
          snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
          },
          () => {
            // console.log(this.state);
          }
        );
      } else {
        setCurrentUser(userAuth);
      }
    });

    // this.unsubscribeFromAuth2 = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument2(userAuth);

    //     userRef.onSnapshot(
    //       snapShot => {
    //         setCurrentUser({
    //           id: snapShot.id,
    //           ...snapShot.data()
    //         });
    //       },
    //       () => {
    //         console.log(this.state);
    //       }
    //     );
    //   } else {
    //     setCurrentUser(userAuth);
    //   }
    // });

    // dummy();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.unsubscribeFromAuth2();
  }

  render() {
    const { setCurrentUser } = this.props;
    console.log("this.props.currentUser/");
    // debugger
    const admin = { ...this.props.currentUser };
    console.log(this.props.currentUser);
    console.log("this.state.admin");
    console.log(admin.admin);

    var aux=null;
    if(admin.admin==true){
      aux=false;
    }else{
      aux=true;
    }
    
    admin.admin===true  ? (
      console.log("null....")
    ) : (
      console.log("nullxxxxx")
    )
    return (
      <div>
        {/* <Header currentUser={this.state.currentUser} /> */}
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/email" component={emailTest} />
          {/*<Route path="/signin" component={SingInAndSignUpPage} />*/}

          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SingInAndSignUpPage />
              )
            }
          />

          <Route
            exact
            path="/admin"
            render={() =>
              admin.admin===true ? (
                <Redirect to="/" />
              ) : (
                <Admin />
              )
            }
          />
          
          <Route path="/hats" component={HatsPage} />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

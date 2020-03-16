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

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
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

  componentDidMount() {
    const { setCurrentUser } = this.props;

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
            console.log(this.state);
          }
        );
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        {/* <Header currentUser={this.state.currentUser} /> */}
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
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

import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selectors";
import { selectUser, selectCurrentUser } from "../../redux/user/user.selector";
import { setCurrentUser } from "../../redux/user/user.actions";
import { dummy } from "../../firebase/firebase.utils";
import "./checkout.styles.scss";
// import CartItem from "../../components/cart-item/cart-item.component";

class CheckoutPage extends React.Component {
  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  sendToFirebse = () => {
    // this.setState({ show: false });
    console.log("send 2 Firbase Database");
    dummy(this.props.currentUser, this.props.cartItems, this.props.total);
    this.hideModal();
  };
  componentDidMount() {}

  render() {
    const Modal = ({ handleClose, show, children, handleTest }) => {
      const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";
      const buttonAccount = user => (
        <button className="custom-button" onClick={handleTest}>
          Yes, Proceed
        </button>
      );
      const buttonsNoAccount = () => {
        return (
          <React.Fragment>
            <button className="custom-button" onClick={handleClose}>
              You need to sign in to proceed.
            </button>
            <button className="custom-button" onClick={handleClose}>
              Proceed without and account.
            </button>
          </React.Fragment>
        );
      };

      return (
        <div className={showHideClassName}>
          <section className="modal-main">
            {children}

            <div
              style={{
                display: "flex",
                justifyContent: "center"
                // width: "380px"
                // margin:"20px auto"
              }}
            >
              <button className="custom-button" onClick={handleClose}>
                Cancel
              </button>
              {this.props.currentUser
                ? buttonAccount(this.props.currentUser)
                : buttonsNoAccount()}
              {/*<button className="custom-button" onClick={handleClose}>
                Yes, Proceed
              </button>
              <button className="custom-button" onClick={handleClose}>
                You need to sign in to proceed.
              </button>
              <button className="custom-button" onClick={handleClose}>
                Proceed without and account.
            </button>*/}
            </div>
          </section>
        </div>
      );
    };

    return (
      <div className="checkout-page">
        <div className="checkout-header">
          <div className="header-block">
            <span>Product</span>
          </div>
          <div className="header-block">
            <span>Description</span>
          </div>
          <div className="header-block">
            <span>Quantity</span>
          </div>
          <div className="header-block">
            <span>Price</span>
          </div>
          <div className="header-block">
            <span>Remove</span>
          </div>
        </div>
        {/*{cartItems.map(cartItem => cartItem.name)}*/}
        {this.props.cartItems.map(cartItem => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
        <div className="total">
          <span>TOTAL: ${this.props.total}</span>
        </div>

        <main>
          <Modal
            show={this.state.show}
            handleClose={this.hideModal}
            handleTest={this.sendToFirebse}
          >
            <div style={{ textAlign: "center" }}>
              <h1>Confirmation</h1>
              <p>
                You will be contact shortly by customer service to confirm your
                order.
              </p>
              <p>Are you sure to proceed?</p>
            </div>
          </Modal>
          <button
            className="custom-button"
            type="button"
            onClick={this.showModal}
          >
            Send Order
          </button>
        </main>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(CheckoutPage);

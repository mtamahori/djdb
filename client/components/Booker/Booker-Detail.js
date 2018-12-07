import React, { Component } from "react";
import { connect } from "react-redux";
import { updateBooker } from "../../store";

class BookerDetail extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitUpdateBooker = this.handleSubmitUpdateBooker.bind(this);
  }

  render() {
    return (
      <div>
        <div>{this.renderCurrentBooker()}</div>
        <div>{this.renderUpdateBooker()}</div>
      </div>
    );
  }

  renderCurrentBooker() {
    const { bookers } = this.props;
    return (
      <div>
        <h3>Booker Detail</h3>
        {
          bookers
            .filter(booker => booker.id === this.props.currentBooker.id)
            .map(booker => (
              <div key={booker.id}>
                <h4>{booker.name}</h4>
                <h4>{booker.email}</h4>
                <h4>{booker.phone}</h4>
              </div>
            ))
        }
      </div>
    );
  }

  renderUpdateBooker() {
    return (
      <div>
        <form onSubmit={this.handleSubmitUpdateBooker}>
          <div>
            <h3>Update Booker Details</h3>
            <h4>
              <input name="name" type="text" required placeholder="Name" />
            </h4>
            <h4>
              <input name="email" type="text" required placeholder="Email" />
            </h4>
            <h4>
              <input name="phone" type="text" required placeholder="Phone #" />
            </h4>
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    );
  }

  handleSubmitUpdateBooker(event) {
    event.preventDefault();
    const { updateBooker, currentBooker } = this.props;
    const booker = {
      id: currentBooker.id,
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value
    };
    updateBooker(booker);
    event.target.name.value = '';
    event.target.email.value = '';
    event.target.phone.value = '';
  }
}
const mapState = ({ bookers }, ownProps) => {
  const bookerParamId = Number(ownProps.match.params.id)
  return {
    bookers,
    currentBooker: bookers.filter(booker => booker.id === bookerParamId)[0]
  }
};
const mapDispatch = { updateBooker };

export default connect(
  mapState,
  mapDispatch
)(BookerDetail);

import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../actions/user";

export default function(ComposedClass, reload) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true
    };

    constructor(props){
      super(props);
      this.props.dispatch(auth());
    }



    componentWillReceiveProps(nextProps) {
      this.setState({ loading: false });

      if (!nextProps.user.login.isAuth) {
        if (reload) {
          this.props.history.push("/admin/login");
        }
      } else {
        if (reload === false) {
          this.props.history.push("/admin/beak");
        }
      }
    }

    render() {
      if (this.state.loading) {
        return <div className="loader">Loading...</div>;
      }
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }
  function mapStateToProps(state) {
    return {
      user: state.user
    };
  }
  return connect(mapStateToProps)(AuthenticationCheck);
}

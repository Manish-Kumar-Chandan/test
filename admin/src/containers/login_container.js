import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  notification,
  Card,
} from "antd";
import { connect } from "react-redux";
import { loginUser } from "../actions/user";



class LoginContainer extends Component {
  onFinish = (values) => {
    // console.log("Success:", values);
    this.props.dispatch(loginUser(values.username, values.password));
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  componentWillReceiveProps(nextProps) {
    const { login } = nextProps.login.user;
    const placement = "bottomRight";
    if (login) {
      // console.log(login)
      if (login.error === true) {
        notification.error({
          message: "Validation Error!",
          description: "Check Username or Password",
          placement,
        });
        // nextProps.dispatch(clearLoginUser());
      }
    }
    return 1;
  }

  render() {
    return (
      <>
        <Card
          style={{
            width: "30%",
            margin: "auto",
            boxShadow: "0px 10px 30px #0000001c",
          }}
        >
          <div className="logo-area">
           <h1>Backend | Admin Panel</h1>
          </div>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish.bind(this)}
            onFinishFailed={this.onFinishFailed.bind(this)}
          >
            <Form.Item
              style={{ fontWeight: 600, wordBreak: "break-all" }}
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              style={{ fontWeight: 600 }}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit" size="large">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    login: state,
  };
}
export default connect(mapStateToProps)(LoginContainer);

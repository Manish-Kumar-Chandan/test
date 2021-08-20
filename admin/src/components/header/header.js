import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Layout,
  Modal,
  Button,
  Form,
  Input,
  Typography,
  notification,
} from "antd";
import { logout } from "../../actions/user";
import { changePassword } from "../../actions/user";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

class PageHeader extends React.Component {
  state = {
    loading: false,
    visible: false,
    p1: "",
    p2: "",
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  logout() {
    this.props.dispatch(logout());
    setTimeout(() => {
      window.location.replace("/");
    }, 2000);
  }

  onFinish = () => {
    if (this.state.p1.length < 8) {
      notification.error({
        message: "Length Should be greater then or equal to 8",
        placement: "bottomRight",
      });
      return;
    }
    if (this.state.p1 === this.state.p2) {
      this.props.dispatch(changePassword(this.state.p1));
    } else {
      notification.error({
        message: "Password did not matched",
        placement: "bottomRight",
      });
      return;
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.changePassword) {
      if (props.changePassword.response) {
        notification.success({
          message: "Password Changed Successfully",
          placement: "bottomRight",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        return {
          visible: false,
        };
      }
    }
    return null;
  }

  render() {
    let login = false;
    if (this.props.login.user.login) {
      login = this.props.login.user.login.isAuth;
    }

    if (this.props.login.user.logout) {
      window.location.reload();
    }

    const { visible, loading } = this.state;
    const urlSegment = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    let check = false;

    if (urlSegment === "login") {
      check = true;
    }
    if (check) {
      return <></>;
    }
    return (
      <>
        <Header className="header">
          <Link to="/admin">
           
          </Link>
          {login && (
            <div className="right-top-corner">
              <span onClick={this.showModal}>
                <SettingOutlined />
                Change Password
              </span>
              <span onClick={this.logout.bind(this)}>
                <LogoutOutlined />
                Logout
              </span>
            </div>
          )}
        </Header>
        {/* Add New Post Modal will start from here */}
        <Modal
          visible={visible}
          title="Show your Voice | Change Password"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.onFinish}
            >
              Submit
            </Button>,
          ]}
        >
          <Title style={{ textAlign: "center" }} level={3}>
            Set a New Password
          </Title>
          <Form name="basic">
            <Form.Item>
              <Input
                type="text"
                onChange={(e) => this.setState({ p1: e.target.value })}
                placeholder="Type new Password..."
                required="required"
              />
            </Form.Item>

            <Form.Item>
              <Input
                type="text"
                onChange={(e) => this.setState({ p2: e.target.value })}
                placeholder="Type Password again..."
                required="required"
              />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state,
    logout: state,
    changePassword: state.user.changePassword,
  };
}

export default connect(mapStateToProps)(PageHeader);

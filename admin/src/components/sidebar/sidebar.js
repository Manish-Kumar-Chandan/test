import React from "react";
import {
  UserOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";

import { Menu, Layout } from "antd";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;

class PageSidebar extends React.Component {
  render() {
    //  console.log(this.props)
    if (this.props.login) {
      if (!this.props.login.isAuth) {
        return null;
      }
    }
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
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          title={
            <span>
              <UserOutlined className="sidebar-icon" />
              Users
            </span>
          }
        >
          <SubMenu key="sub1" title="Attributes">
          <Menu.Item key="1">
              <Link to="/admin/beak">Beak</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/admin/comb">Comb</Link>
            </Menu.Item><Menu.Item key="3">
              <Link to="/admin/eyes">Eyes</Link>
            </Menu.Item><Menu.Item key="4">
            {/* <SkinOutlined /> &nbsp; */}
              <Link to="/admin/skins">Skins</Link>
            </Menu.Item><Menu.Item key="5">
              <Link to="/admin/stripes">Stripes</Link>
            </Menu.Item><Menu.Item key="6">
              <Link to="/admin/wattle">Wattle</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title="Chicken">
            <Menu.Item key="9"><Link to="/admin/create_chicken">Create</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.user.login,
  };
}

export default connect(mapStateToProps)(PageSidebar);

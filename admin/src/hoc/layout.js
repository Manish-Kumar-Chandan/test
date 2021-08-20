import React from "react";
import PageHeader from "../components/header/header";
import PageSidebar from "../components/sidebar/sidebar";

// static
import StaticHeader from "../static/header/header";
import StaticFooter from "../static/footer/footer";

import { Layout } from "antd";

const { Footer } = Layout;

class PageLayout extends React.Component {
  render() {
    let isAdminPanel = false;
    const urlSegment = window.location.href;
    if (urlSegment.includes("admin")) {
      isAdminPanel = true;
    }
    return (
      <>
        {isAdminPanel ? (
          <>
            <PageHeader />
            <Layout>
              <PageSidebar />
              <Layout>
                {this.props.children}
                <Footer style={{ textAlign: "center" }}>
                  Copyright Ⓒ 2020. All rights reserved by Chickens.
                </Footer>
              </Layout>
            </Layout>
          </>
        ) : (
          <>
            <StaticHeader />
            {this.props.children}
            <StaticFooter />
          </>
        )}
      </>
    );
  }
}

export default PageLayout;

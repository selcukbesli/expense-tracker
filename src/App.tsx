import { Layout, Menu } from "antd";
import { Route } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from "./components/PriveRoute";
import Categories from "./components/Categories";
import Records from "./components/Records";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          <Route path="/register" component={Signup} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/categories" component={Categories} />
          <PrivateRoute path="/records" component={Records} />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Expense Tracker ©2021</Footer>
    </Layout>
  );
}

export default App;

import { Layout } from "antd";
import { Route } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from "./components/PriveRoute";
import Categories from "./components/Categories";
import Records from "./components/Records";
import AppHeader from "./components/AppHeader";
import Logout from "./components/Logout";

const { Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <AppHeader />
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
          <Route path="/logout" component={Logout} />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Expense Tracker ©2021</Footer>
    </Layout>
  );
}

export default App;

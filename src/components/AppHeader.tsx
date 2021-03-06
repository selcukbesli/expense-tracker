import { Layout, Menu } from "antd";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { asyncIsLoggedIn } from "../store/userSlice";

const AppHeader = () => {
  const dispatch = useAppDispatch();

  const {
    data: { username },
    loading,
  } = useAppSelector((state) => state.user);

  const { pathname } = useLocation();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(asyncIsLoggedIn());
    }
  }, [dispatch]);

  return (
    <Layout.Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
        {!username ? (
          loading ? null : (
            <Menu.Item key="/login">
              <NavLink to="/login">Login</NavLink>
            </Menu.Item>
          )
        ) : (
          <>
            <Menu.Item key="/categories">
              <NavLink to="/categories">Categories</NavLink>
            </Menu.Item>
            <Menu.Item key="/records">
              <NavLink to="/records">Records</NavLink>
            </Menu.Item>
            <Menu.Item key="/logout">
              <NavLink to="logout">Logout</NavLink>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Layout.Header>
  );
};

export default AppHeader;

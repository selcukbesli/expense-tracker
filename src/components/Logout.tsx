import { useEffect } from "react";
import { Redirect } from "react-router";

import { useAppDispatch, useAppSelector } from "../store";
import { logout } from "../store/actions/userActions";

const Logout = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  if (!data.username) {
    return <Redirect to="/login" />;
  }

  return <div>Logging out...</div>;
};

export default Logout;

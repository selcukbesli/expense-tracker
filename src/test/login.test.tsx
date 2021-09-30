import userEvent from "@testing-library/user-event";
import { render, screen } from "./test-utils";

import App from "../App";

test("should login with credentials", async () => {
  render(<App />);

  const loginMenuItem = screen.getByRole("menuitem", { name: /login/i });
  // loginMenuItem should have active class when hovered
  userEvent.hover(loginMenuItem);
  expect(loginMenuItem).toHaveClass("ant-menu-item-active");

  // loginMenuItem should have selected class when clicked
  userEvent.click(loginMenuItem.firstElementChild!.firstElementChild!);
  expect(loginMenuItem).toHaveClass("ant-menu-item-selected");

  // user redirect to '/login' and form should appear sync. in page
  // find inputs and button and click submit
  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  userEvent.clear(usernameInput);
  userEvent.type(usernameInput, "selcuk");

  userEvent.clear(passwordInput);
  userEvent.type(passwordInput, "123456");

  userEvent.click(submitButton);
  const successMessage = await screen.findByText(/login successful/i);
  expect(successMessage).toBeInTheDocument();

  // 3 menuItems should appear on page
  const navMenuItems = screen.getAllByRole("menuitem");
  expect(navMenuItems).toHaveLength(3);
});

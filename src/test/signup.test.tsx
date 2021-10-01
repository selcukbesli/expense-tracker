import userEvent from "@testing-library/user-event";
import { render, screen } from "../test/test-utils";

import App from "../App";

test("should signup successfully and redirect to login page", async () => {
  render(<App />);

  // should redirect to /login after clicking Login MenuItem
  const loginMenuItem = screen.getByRole("menuitem", { name: /login/i });
  userEvent.click(loginMenuItem.firstElementChild!.firstElementChild!);

  // Find register  button and click
  const registerButton = screen.getByRole("button", {
    name: /click for register/i,
  });

  userEvent.click(registerButton);

  // Find all inputs and buttons
  const submitButton = screen.getByRole("button", { name: /submit/i });
  const nameInput = screen.getByLabelText("Name");
  const passwordInput = screen.getByLabelText(/password/i);
  const emailInput = screen.getByLabelText(/email/i);
  const fullNameInput = screen.getByLabelText(/full name/i);

  // should page redirect to /login after clicking submit button  if inputs are valid
  userEvent.clear(nameInput);
  userEvent.type(nameInput, "selcuk");
  userEvent.clear(passwordInput);
  userEvent.type(passwordInput, "123456");
  userEvent.clear(emailInput);
  userEvent.type(emailInput, "selcuk@selcuk.com");
  userEvent.clear(fullNameInput);
  userEvent.type(fullNameInput, "selcuk besli");

  userEvent.click(submitButton);

  await screen.findByText(/you successfully signed up/i);
});

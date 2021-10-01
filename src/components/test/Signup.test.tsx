import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "../../test/test-utils";

import Signup from "../Signup";
import { server } from "../../mocks/server";
import { baseUrl } from "../../test/constants";

test("should alerts appear/disappear under inputs, after clicking submit depends on form values", async () => {
  render(<Signup />);

  // Find all inputs and button
  const submitButton = screen.getByRole("button", { name: /submit/i });
  const nameInput = screen.getByLabelText("Name");
  const passwordInput = screen.getByLabelText(/password/i);
  const emailInput = screen.getByLabelText(/email/i);
  const fullNameInput = screen.getByLabelText(/full name/i);

  // submit button should be disabled initially
  expect(submitButton).toBeDisabled();

  // should button disabled and 4 alerts on the screen when inputs  are invalid
  userEvent.type(nameInput, " ");
  userEvent.type(passwordInput, "12345");
  userEvent.type(emailInput, "selcuk@selcuk");
  userEvent.type(fullNameInput, "  ");

  await waitFor(() => {
    const alerts = screen.getAllByRole("alert");
    expect(alerts).toHaveLength(4);
    expect(submitButton).toBeDisabled();
  });

  // should button enabled and alert disappear when all inputs are valid
  userEvent.clear(nameInput);
  userEvent.type(nameInput, "selcuk");
  userEvent.type(passwordInput, "6");
  userEvent.type(emailInput, ".com");
  userEvent.clear(fullNameInput);
  userEvent.type(fullNameInput, "selcuk besli");

  await waitFor(() => {
    const alerts = screen.queryAllByRole("alert");
    expect(alerts).toHaveLength(0);
    expect(submitButton).toBeEnabled();
  });
});

test("should error message appear/disapper if username already in use", async () => {
  // reset default mock response to an error
  server.resetHandlers(
    rest.post(`${baseUrl}/users/register`, (req, res, ctx) => {
      return res(
        ctx.status(400),
        ctx.json({ errorMessage: "Username is used by someone else" })
      );
    })
  );

  render(<Signup />);

  // Find all inputs and button
  const submitButton = screen.getByRole("button", { name: /submit/i });
  const nameInput = screen.getByLabelText("Name");
  const passwordInput = screen.getByLabelText(/password/i);
  const emailInput = screen.getByLabelText(/email/i);
  const fullNameInput = screen.getByLabelText(/full name/i);

  // Type valid inputs to avoid async-validator
  userEvent.clear(nameInput);
  userEvent.type(nameInput, "selcuk");
  userEvent.clear(passwordInput);
  userEvent.type(passwordInput, "123456");
  userEvent.clear(emailInput);
  userEvent.type(emailInput, "selcuk@selcuk.com");
  userEvent.clear(fullNameInput);
  userEvent.type(fullNameInput, "selcuk besli");

  // Alert should apper on the screeen after clicking the submit button with existing username
  userEvent.click(submitButton);
  const alertMessage = await screen.findByText(
    /username is used by someone else/i
  );

  expect(alertMessage).toBeInTheDocument();

  // Alert should automatically disapper after 3000ms (antd default)
  await waitForElementToBeRemoved(
    () => screen.queryByText(/username is used by someone else/i),
    { timeout: 3000 }
  );
});

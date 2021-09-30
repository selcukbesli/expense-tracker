import { render, screen } from "./test/test-utils";
import App from "./App";

test("should app render header and footer", async () => {
  render(<App />);

  const footer = await screen.findByText(/expense tracker/i);
  expect(footer).toBeInTheDocument();

  const header = await screen.findByRole("menuitem");
  expect(header).toBeInTheDocument();
});

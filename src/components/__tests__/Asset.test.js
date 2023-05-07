import { render, screen } from "@testing-library/react";
import Asset from "../Asset";

// Testing the Asset file.
// Asset file appears to have 3 conditional statements.
// One for a spinner, another for an image, and another for a message.
// Create three separate tests, and then refactor.

test("Test spinner, image and message in Asset file", () => {
    render(<Asset spinner={true} src={true} message={"message"} />);
  
    const assetSpinner = screen.getByTestId("spinner");
    const assetImage = screen.getByRole("img");
    const assetMessage = screen.getByText("message");
  
    expect(assetSpinner).toBeInTheDocument();
    expect(assetImage).toBeInTheDocument();
    expect(assetMessage).toBeInTheDocument();
  });


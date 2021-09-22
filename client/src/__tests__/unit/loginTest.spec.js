import React from "react";
import { act } from "react-dom/test-utils";

import { render, fireEvent, screen } from "../../common/helpers/test-utils";
import Login from "../../features/pages/Login";

describe("Login", () => {
  describe("should render the basic fields", () => {
    it("should render the basic fields", () => {
      render(<Login />);
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      expect(screen.getByLabelText("Username")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Login/i })
      ).toBeInTheDocument();
    });
  });
  describe("with valid inputs", () => {
    test("should calls the onSubmit function", async () => {
      // Arrange
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByTestId } = render(
        <Login testSubmit={mockOnSubmit} />
      );
      // Act
      await act(async () => {
        fireEvent.change(getByLabelText("Username"), {
          target: { value: "baristure" },
        });
        fireEvent.change(getByLabelText("Password"), {
          target: { value: "1234567" },
        });
      });
      await act(async () => {
        fireEvent.click(getByTestId("form-submit-button"));
      });

      // Assert
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  describe("With invalid inputs", () => {
    test("should renders the username validation error for blank", async () => {
      // Arrange
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByTestId, container } = render(
        <Login testSubmit={mockOnSubmit} />
      );
      // Act
      await act(async () => {
        const usernameInput = getByLabelText("Username");

        fireEvent.change(usernameInput, { target: { value: "" } });

        fireEvent.blur(usernameInput);
        fireEvent.click(getByTestId("form-submit-button"));
      });
      // Assert
      expect(container.innerHTML).toMatch("Username is required");
    });
    test("should renders the username validation error for min length", async () => {
      // Arrange
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByTestId, container } = render(
        <Login testSubmit={mockOnSubmit} />
      );
      // Act
      await act(async () => {
        const usernameInput = getByLabelText("Username");

        fireEvent.change(usernameInput, { target: { value: "123" } });

        fireEvent.blur(usernameInput);
        fireEvent.click(getByTestId("form-submit-button"));
      });
      // Assert
      expect(container.innerHTML).toMatch(
        "Username should longer than 4 characters"
      );
    });
    test("should renders the username validation error for max length", async () => {
      // Arrange
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByTestId, container } = render(
        <Login testSubmit={mockOnSubmit} />
      );
      // Act
      await act(async () => {
        const usernameInput = getByLabelText("Username");

        fireEvent.change(usernameInput, {
          target: { value: "asdasdasdasdasdasdasdasdasdasdasdasdasdasd" },
        });

        fireEvent.blur(usernameInput);
        fireEvent.click(getByTestId("form-submit-button"));
      });
      // Assert
      expect(container.innerHTML).toMatch(
        "Username is no more than 20 characters"
      );
    });

    test("should renders the password validation error", async () => {
      // Arrange
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByTestId, container } = render(
        <Login testSubmit={mockOnSubmit} />
      );
      // Act
      await act(async () => {
        const passwordInput = getByLabelText("Password");
        fireEvent.change(passwordInput, { target: { value: "" } });
        // fireEvent.blur(passwordInput);
        fireEvent.click(getByTestId("form-submit-button"));
      });
      // Assert
      expect(container.innerHTML).toMatch("Password is required");
    });
  });
});

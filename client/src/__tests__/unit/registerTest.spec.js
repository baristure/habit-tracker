import React from "react";
import { act } from "react-dom/test-utils";

import { render, fireEvent, screen } from "../../common/helpers/renderWrapper";
import Register from "../../features/pages/Register";

describe("Register", () => {
  it("should render the basic fields", () => {
    render(<Register />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Register/i })
    ).toBeInTheDocument();
  });

  describe("with valid inputs", () => {
    it("Should register with valid inputs", async () => {
      // Arrange
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByTestId } = render(
        <Register testSubmit={mockOnSubmit} />
      );

      // Act
      await act(async () => {
        const emailInput = getByLabelText("Email");
        fireEvent.change(emailInput, {
          target: { value: "baristure@hotmail.com" },
        });

        const userNameInput = getByLabelText("Username");
        fireEvent.change(userNameInput, { target: { value: "baristure" } });

        const passwordInput = getByLabelText("Password");
        fireEvent.change(passwordInput, { target: { value: "1234567" } });
      });
      await act(async () => {
        fireEvent.click(getByTestId("form-submit-button"));
      });

      // Assert
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  describe("with invalid inputs", () => {
    it("should render email required error", async () => {
      // Arrange
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByTestId, container } = render(
        <Register testSubmit={mockOnSubmit} />
      );
      // Act
      await act(async () => {
        const emailInput = getByLabelText("Email");
        fireEvent.change(emailInput, { target: { value: "" } });
        fireEvent.blur(emailInput);
        fireEvent.click(getByTestId("form-submit-button"));
      });
      // Assert
      expect(container.innerHTML).toMatch("Email can not be blank");
    });
    it("should render email input invalid email error", async () => {
      // Arrange
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByTestId, container } = render(
        <Register testSubmit={mockOnSubmit} />
      );
      // Act
      await act(async () => {
        const emailInput = getByLabelText("Email");
        fireEvent.change(emailInput, { target: { value: "aaaa" } });
        fireEvent.blur(emailInput);
        fireEvent.click(getByTestId("form-submit-button"));
      });
      // Assert
      expect(container.innerHTML).toMatch("Enter a valid email address");
    });
    it("should render username required error", async () => {
      // Arrange
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByTestId, container } = render(
        <Register testSubmit={mockOnSubmit} />
      );
      // Act
      await act(async () => {
        const usernameInput = getByLabelText("Username");
        fireEvent.change(usernameInput, { target: { value: "" } });
        fireEvent.blur(usernameInput);
        fireEvent.click(getByTestId("form-submit-button"));
      });
      // Assert
      expect(container.innerHTML).toMatch("Username can not be blank");
    });
    test("should render username min character length error", async () => {
      // Arrange
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByTestId, container } = render(
        <Register testSubmit={mockOnSubmit} />
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
    test("should render username max character length error", async () => {
      // Arrange
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByTestId, container } = render(
        <Register testSubmit={mockOnSubmit} />
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
        <Register testSubmit={mockOnSubmit} />
      );
      // Act
      await act(async () => {
        const passwordInput = getByLabelText("Password");
        fireEvent.change(passwordInput, { target: { value: "" } });
        // fireEvent.blur(passwordInput);
        fireEvent.click(getByTestId("form-submit-button"));
      });
      // Assert
      expect(container.innerHTML).toMatch("Password can not be blank");
    });
  });
});

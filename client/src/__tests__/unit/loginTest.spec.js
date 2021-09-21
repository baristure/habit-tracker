import React from "react";
import { act } from "react-dom/test-utils";
// import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, screen } from "../../common/helpers/test-utils";
import Login from "../../features/pages/Login";

describe("Login", () => {
  describe("with valid inputs", () => {
    test("should calls the onSubmit function", async () => {
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByTestId } = render(
        <Login testSubmit={mockOnSubmit} />
      );

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
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});

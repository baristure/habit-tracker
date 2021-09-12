import store from "../../store/store";
import {
  authReducer,
  loginUser,
  initialState,
  registerUser,
} from "../../store/slices/authSlice";

const appState = store.getState();
describe("authSlice", () => {
  describe("loginUser State, loginUser Action", () => {
    it("should set fetching state on true when API call is pending", async () => {
      // Arrange
      const action = {
        type: loginUser.pending.type,
      };
      // Act
      const nextState = await authReducer(initialState, action);
      // Assert
      const rootState = { ...appState, loginUser: nextState };

      expect(rootState.loginUser.isFetching).toBeTruthy();
      expect(rootState.loginUser.isError).not.toBeTruthy();
      expect(rootState.loginUser.errorMessage).toEqual("");
    });

    it("should set rejected, error and errormessage state on false when API call is rejected", async () => {
      // Arrange
      const action = {
        type: loginUser.rejected.type,
        payload: {
          code: 401,
          message: "Any error message from backend server",
        },
      };
      // Act
      const nextState = await authReducer(initialState, action);
      // Assert
      const rootState = { ...appState, loginUser: nextState };
      expect(rootState.loginUser.isFetching).not.toBeTruthy();
      expect(rootState.loginUser.isError).toBeTruthy();
      expect(rootState.loginUser.errorMessage).toEqual(
        "Any error message from backend server"
      );
    });

    it("should set email, username, id and isSuccess state on false when API call is fulfilled", async () => {
      // Arrange
      const action = {
        type: loginUser.fulfilled.type,
        payload: {
          isAuthenticated: true,
          token: "jwt_token_value",
          user: {
            email: "email_value",
            username: "username_value",
            id: "mongo id",
          },
        },
      };
      // Act
      const nextState = await authReducer(initialState, action);
      // Assert
      const rootState = { ...appState, loginUser: nextState };

      expect(rootState.loginUser.isFetching).not.toBeTruthy();
      expect(rootState.loginUser.isError).not.toBeTruthy();
      expect(rootState.loginUser.isSuccess).toBeTruthy();
      expect(rootState.loginUser.email).toEqual(action.payload.user.email);
      expect(rootState.loginUser.username).toEqual(
        action.payload.user.username
      );
      expect(rootState.loginUser.id).toEqual(action.payload.user.id);
    });
  });

  describe("registerUser State, registerUser Action", () => {
    it("should set fetching state on true when API call is pending", async () => {
      // Arrange
      const action = {
        type: registerUser.pending.type,
      };
      // Act
      const nextState = await authReducer(initialState, action);
      // Assert
      const rootState = { ...appState, registerUser: nextState };

      expect(rootState.registerUser.isFetching).toBeTruthy();
      expect(rootState.registerUser.isError).not.toBeTruthy();
      expect(rootState.registerUser.errorMessage).toEqual("");
    });

    it("should set rejected, error and errormessage state on false when API call is rejected", async () => {
      // Arrange
      const action = {
        type: registerUser.rejected.type,
        payload: {
          code: 400,
          message: "Any error message from backend server",
        },
      };
      // Act
      const nextState = await authReducer(initialState, action);
      // Assert
      const rootState = { ...appState, registerUser: nextState };
      expect(rootState.registerUser.isFetching).not.toBeTruthy();
      expect(rootState.registerUser.isError).toBeTruthy();
      expect(rootState.registerUser.errorMessage).toEqual(
        "Any error message from backend server"
      );
    });

    it("should set email, username, id and isSuccess state on false when API call is fulfilled", async () => {
      // Arrange
      const action = {
        type: registerUser.fulfilled.type,
        payload: {
          email: "email_value",
          username: "username_value",
        },
      };
      // Act
      const nextState = await authReducer(initialState, action);
      // Assert
      const rootState = { ...appState, registerUser: nextState };

      expect(rootState.registerUser.isFetching).not.toBeTruthy();
      expect(rootState.registerUser.isError).not.toBeTruthy();
      expect(rootState.registerUser.isSuccess).toBeTruthy();
      expect(rootState.registerUser.email).toEqual(action.payload.email);
      expect(rootState.registerUser.username).toEqual(action.payload.username);
      expect(rootState.registerUser.id).toEqual(action.payload.id);
    });
  });
});

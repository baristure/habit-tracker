import mongoose from "mongoose";
import httpStatus from "http-status";
import httpMocks from "node-mocks-http";
import { expect, it, jest } from "@jest/globals";

import { errorConverter, errorHandler } from "../../src/middlewares/error";
import ApiError from "../../src/utils/ApiError";
import config from "../../src/config/config";
import logger from "../../src/config/logger";

describe("Error Middleware", () => {
  describe("Error Converter", () => {
    it("Should return the same ApiError object it was called with", () => {
      const error = new ApiError(httpStatus.BAD_REQUEST, "Error Message");
      const next = jest.fn();
      errorConverter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      );

      expect(next).toHaveBeenCalledWith(error);
    });

    it("Should convert an Error to ApiError and preserve its status and message", () => {
      const error = new Error("Any error");
      error.statusCode = httpStatus.BAD_REQUEST;
      const next = jest.fn();

      errorConverter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      );
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: error.statusCode,
          message: error.message,
          isOperational: false,
        })
      );
    });

    it("Should convert an Error without status to ApiError status 500", () => {
      const error = new Error("Any error");
      const next = jest.fn();

      errorConverter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      );
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
          isOperational: false,
        })
      );
    });

    it("Should convert http status to error message if Error without error message", () => {
      const error = new Error();
      error.statusCode = httpStatus.BAD_REQUEST;
      const next = jest.fn();
      errorConverter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      );
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: error.statusCode,
          message: httpStatus[error.statusCode],
          isOperational: false,
        })
      );
    });

    it("Should convert a Mongoose error to ApiError with status 400 and preserve its message", () => {
      const error = new mongoose.Error("Any mongoose error");
      const next = jest.fn();

      errorConverter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      );

      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.BAD_REQUEST,
          message: error.message,
          isOperational: false,
        })
      );
    });

    it("Should convert any other error to ApiError with status 500 and its message", () => {
      const error = {};
      const next = jest.fn();

      errorConverter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      );
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
          isOperational: false,
        })
      );
    });
  });

  describe("Error Handler", () => {
    beforeEach(() => {
      jest.spyOn(logger, "error").mockImplementation(() => {});
    });

    it("Should send proper error response and put the error message in res.locals", () => {
      const error = new ApiError(httpStatus.BAD_REQUEST, "Error message");
      const res = httpMocks.createResponse();
      const sendSpy = jest.spyOn(res, "send");

      errorHandler(error, httpMocks.createRequest(), res);

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          code: error.statusCode,
          message: error.message,
        })
      );
      expect(res.locals.errorMessage).toBe(error.message);
    });

    it("Should put the error stack in the response if in development mode", () => {
      config.env = "development";
      const error = new ApiError(httpStatus.BAD_REQUEST, "Error message");
      const res = httpMocks.createResponse();
      const sendSpy = jest.spyOn(res, "send");
      errorHandler(error, httpMocks.createRequest(), res);
      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          code: error.statusCode,
          message: error.message,
          stack: error.stack,
        })
      );
      config.env = process.env.NODE_ENV;
    });

    it("should send internal server error status and message if in production mode and error is not operational", () => {
      config.env = "production";
      const error = new ApiError(
        httpStatus.BAD_REQUEST,
        "Error message",
        false
      );
      const res = httpMocks.createResponse();
      const sendSpy = jest.spyOn(res, "send");

      errorHandler(error, httpMocks.createRequest(), res);

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
        })
      );
      expect(res.locals.errorMessage).toBe(error.message);
      config.env = process.env.NODE_ENV;
    });

    it("should preserve original error status and message if in production mode and error is operational", () => {
      config.env = "production";
      const error = new ApiError(httpStatus.BAD_REQUEST, "Error message");
      const res = httpMocks.createResponse();
      const sendSpy = jest.spyOn(res, "send");

      errorHandler(error, httpMocks.createRequest(), res);

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          code: error.statusCode,
          message: error.message,
        })
      );
      config.env = process.env.NODE_ENV;
    });
  });
});

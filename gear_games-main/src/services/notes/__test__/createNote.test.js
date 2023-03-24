const clientDB = require("../../../database");
const createNote = require("../createNote");

jest.mock("../../../database");

describe("createNote", () => {
  it("should create a new post", () => {
    const mockRequest = {
      body: {
        title: "Test Post",
        url: "http://example.com",
        description: "This is a test post",
        likes: 0,
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    clientDB.query.mockImplementationOnce((query, callback) => {
      callback(null, { rows: [{ id: 1 }] });
    });

    createNote(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockRequest.body);
  });
});

const pool = require("../../../database");
const createRole = require("../createRole");

describe("createRole", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        nameRol: "test role",
        permission: "test permission",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new role", () => {
    const mockQuery = jest
      .spyOn(pool, "query")
      .mockImplementation((query, values, callback) => {
        callback(null, {
          rows: [{ nameRol: "test role", permission: "test permission" }],
        });
      });

    createRole(req, res);

    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith(
      "INSERT INTO roles (nameRol, permission) VALUES ($1, $2) RETURNING *",
      ["test role", "test permission"],
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({
      nameRol: "test role",
      permission: "test permission",
    });
  });

  it("should handle database errors", () => {
    const mockQuery = jest
      .spyOn(pool, "query")
      .mockImplementation((query, values, callback) => {
        callback(new Error("Database error"));
      });

    createRole(req, res);

    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith(
      "INSERT INTO roles (nameRol, permission) VALUES ($1, $2) RETURNING *",
      ["test role", "test permission"],
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith("Error creating new role");
  });
});

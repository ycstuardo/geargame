const pool = require("../../../database");
const getRole = require("../getRole");

jest.mock("../../../database");

describe("getRole", () => {
  let req, res;

  beforeEach(() => {
    req = { params: { id: "1" } };
    res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should send back the role with status 200 when the role is found", () => {
    const rows = [{ id: "1", nameRol: "Admin", permission: "all" }];
    const result = { rows };
    pool.query.mockImplementationOnce((text, values, callback) => {
      callback(null, result);
    });

    getRole(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM roles WHERE id = $1",
      ["1"],
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(rows[0]);
  });

  it("should send back a 404 status with a message when the role is not found", () => {
    const result = { rows: [] };
    pool.query.mockImplementationOnce((text, values, callback) => {
      callback(null, result);
    });

    getRole(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM roles WHERE id = $1",
      ["1"],
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Role not found");
  });

  it("should send back a 500 status with a message when there is an error", () => {
    const error = new Error("Database error");
    pool.query.mockImplementationOnce((text, values, callback) => {
      callback(error, null);
    });

    getRole(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM roles WHERE id = $1",
      ["1"],
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Error getting role");
  });
});

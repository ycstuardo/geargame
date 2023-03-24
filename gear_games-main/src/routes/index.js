const notesRoutes = require("./notes");
const addressesRoutes = require("./addresses");
const brandsRoutes = require("./brands");
const categoriesRoutes = require("./categories");
const communesRoutes = require("./communes");
const rolesRoutes = require("./roles");
const usersRoutes = require("./users");
const productsRoutes = require("./products");

const middlewares = (app) => {
  app.use("/api", notesRoutes);
  app.use("/api", addressesRoutes);
  app.use("/api", brandsRoutes);
  app.use("/api", categoriesRoutes);
  app.use("/api", communesRoutes);
  app.use("/api", rolesRoutes);
  app.use("/api", usersRoutes);
  app.use("/api", productsRoutes);
};

module.exports = middlewares;

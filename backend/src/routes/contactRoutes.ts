import express from "express";

import * as ContactController from "../controllers/ContactController";
import * as ImportPhoneContactsController
  from "../controllers/ImportPhoneContactsController";
import isAuth from "../middleware/isAuth";

const contactRoutes = express.Router();

contactRoutes.post(
  "/contacts/import",
  isAuth,
  ImportPhoneContactsController.store
);

contactRoutes.get("/contacts", isAuth, ContactController.index);

contactRoutes.get("/contacts/list", isAuth, ContactController.list);

contactRoutes.get("/contacts/:contactId", isAuth, ContactController.show);

contactRoutes.post("/contacts/findOrCreate", isAuth, ContactController.findOrCreate);

contactRoutes.post("/contacts", isAuth, ContactController.store);

contactRoutes.put("/contacts/:contactId", isAuth, ContactController.update);

contactRoutes.delete("/contacts/:contactId", isAuth, ContactController.remove);

contactRoutes.delete("/contacts", isAuth, ContactController.removeAll);

export default contactRoutes;

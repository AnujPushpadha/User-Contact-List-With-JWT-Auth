const express = require("express");

const router = express.Router();

const {
  getContact,
  getContactBYid,
  AddContact,
  EditContact,
  DeleteContact,
  sort,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContact).post(AddContact);
router.route("/sort").get(sort);
router.route("/:id").get(getContactBYid).put(EditContact).delete(DeleteContact);

module.exports = router;

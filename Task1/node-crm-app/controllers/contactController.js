const crmService = require("../services/crmService");
const dbService = require("../services/dbService");

const contactController = {
  async createContact(req, res) {
    const { first_name, last_name, email, mobile_number, data_store } =
      req.body;

    try {
      let contact;
      if (data_store === "CRM") {
        contact = await crmService.createContact({
          first_name,
          last_name,
          email,
          mobile_number,
        });
      } else {
        contact = await dbService.createContact({
          first_name,
          last_name,
          email,
          mobile_number,
        });
      }
      res.status(201).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getContact(req, res) {
    const { contact_id, data_store } = req.body;

    try {
      let contact;
      if (data_store === "CRM") {
        contact = await crmService.getContact(contact_id);
      } else {
        contact = await dbService.getContact(contact_id);
      }
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateContact(req, res) {
    const { contact_id, new_email, new_mobile_number, data_store } = req.body;

    try {
      let result;
      if (data_store === "CRM") {
        result = await crmService.updateContact(contact_id, {
          email: new_email,
          mobile_number: new_mobile_number,
        });
      } else {
        result = await dbService.updateContact(contact_id, {
          email: new_email,
          mobile_number: new_mobile_number,
        });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteContact(req, res) {
    const { contact_id, data_store } = req.body;

    try {
      let result;
      if (data_store === "CRM") {
        result = await crmService.deleteContact(contact_id);
      } else {
        result = await dbService.deleteContact(contact_id);
      }
      res.status(200).json({ message: "Contact deleted successfully", result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = contactController;

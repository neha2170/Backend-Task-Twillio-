const Contact = require("../models/contactModel");

const dbService = {
  async createContact(contact) {
    return await Contact.create(contact);
  },

  async getContact(contactId) {
    return await Contact.findByPk(contactId);
  },

  async updateContact(contactId, updates) {
    return await Contact.update(updates, { where: { id: contactId } });
  },

  async deleteContact(contactId) {
    return await Contact.destroy({ where: { id: contactId } });
  },
};

module.exports = dbService;

const axios = require("axios");
const { apiUrl, apiKey } = require("../config/freshsalesConfig");

const crmService = {
  async createContact(contact) {
    const response = await axios.post(apiUrl, contact, {
      headers: { Authorization: `Token token=${apiKey}` },
    });
    return response.data;
  },

  async getContact(contactId) {
    const response = await axios.get(`${apiUrl}/${contactId}`, {
      headers: { Authorization: `Token token=${apiKey}` },
    });
    return response.data;
  },

  async updateContact(contactId, updates) {
    const response = await axios.put(`${apiUrl}/${contactId}`, updates, {
      headers: { Authorization: `Token token=${apiKey}` },
    });
    return response.data;
  },

  async deleteContact(contactId) {
    const response = await axios.delete(`${apiUrl}/${contactId}`, {
      headers: { Authorization: `Token token=${apiKey}` },
    });
    return response.data;
  },
};

module.exports = crmService;

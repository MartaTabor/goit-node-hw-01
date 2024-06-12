const fs = require("fs");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const nanoid = require("nanoid");

function listContacts() {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
      if (err) {
        return reject(err);
      }
      try {
        const contacts = JSON.parse(data);
        resolve(contacts);
      } catch (error) {
        reject(error);
      }
    });
  });
}

function getContactById(contactId) {
  return listContacts()
    .then((contacts) => contacts.find((contact) => contact.id === contactId))
    .catch((error) => console.error(error));
}

function removeContact(contactId) {
  return listContacts()
    .then((contacts) => {
      const updatedContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      return new Promise((resolve, reject) => {
        fs.writeFile(
          contactsPath,
          JSON.stringify(updatedContacts, null, 2),
          (err) => {
            if (err) {
              return reject(err);
            }
            resolve(updatedContacts);
          }
        );
      });
    })
    .catch((error) => console.error(error));
}

function addContact(name, email, phone) {
  return listContacts()
    .then((contacts) => {
      const newContact = { id: nanoid(), name, email, phone };
      contacts.push(newContact);
      return new Promise((resolve, reject) => {
        fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
          if (err) {
            return reject(err);
          }
          resolve(newContact);
        });
      });
    })
    .catch((error) => console.error(error));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

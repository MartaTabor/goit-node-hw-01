const { Command } = require("commander");
require("color");
const contacts = require("./db/contacts.json");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const allContacts = await contacts.listContacts();
        console.table(allContacts.green);
      } catch (error) {
        console.error("Error listing contacts: ", error);
      }
      break;

    case "get":
      try {
        const contact = await contacts.getContactById(id);
        if (contact) {
          console.log(contact.blue);
        } else {
          console.log(`Contact with id ${id} not found`);
        }
      } catch (error) {
        console.error("Error getting contact by id: ", error);
      }
      break;

    case "add":
      try {
        const newContact = await contacts.addContact(name, email, phone);
        console.log(newContact.yellow);
      } catch (error) {
        console.error("Error adding contact: ", error);
      }
      break;

    case "remove":
      try {
        const updatedContacts = await contacts.removeContact(id);
        console.log(updatedContacts.orange);
      } catch (error) {
        console.error("Error removing contact: ", error);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

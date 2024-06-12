const { Command } = require("commander");
const contacts = require("./contacts");
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
        console.table(allContacts);
      } catch (error) {
        console.error("Error listing contacts: ", error);
      }
      break;

    case "get":
      try {
        const contact = await contacts.getContactById(id);
        if (contact) {
          console.log(contact);
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
        console.log(newContact);
      } catch (error) {
        console.error("Error adding contact: ", error);
      }
      break;

    case "remove":
      try {
        const updatedContacts = await contacts.removeContact(id);
        console.table(updatedContacts);
      } catch (error) {
        console.error("Error removing contact: ", error);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

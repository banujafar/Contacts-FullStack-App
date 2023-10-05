import fs from "fs/promises";

const CONTACTS_FILE_PATH = "server/db/contacts.json";
const JSON_CONTENT_TYPE = "text/plain";

// Handling errors
function handleError(res, statusCode, message) {
  res.statusCode = statusCode;
  res.end(message);
}

// Read contacts from the file
async function getContactsFromDB() {
  try {
    const data = await fs.readFile(CONTACTS_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error:", err);
  }
}

// Write contacts to the file
async function writeContactsToDB(contacts) {
  try {
    await fs.writeFile(CONTACTS_FILE_PATH, JSON.stringify(contacts));
  } catch (err) {
    console.error("Error:", err);
  }
}

// Handle GET requests
const getContacts = async (req, res, selectedId) => {
  try {
    const contacts = await getContactsFromDB();
    res.statusCode = 200;
    res.setHeader("Content-Type", JSON_CONTENT_TYPE);
    if (selectedId) {
      const contact = contacts.find((contact) => contact.id == selectedId);
      if (contact) {
        return res.end(JSON.stringify(contact));
      }
      return handleError(res, 404, "Contact not found");
    }

    return res.end(JSON.stringify(contacts));
  } catch (error) {
    handleError(res, 500, "Internal Server Error");
  }
};

// Handle POST requests
const postContact = async (req, res) => {
  console.log(res);
  try {
    const contacts = await getContactsFromDB();
    if (
      req.headers["content-type"] === JSON_CONTENT_TYPE &&
      req.url === "/contacts"
    ) {
      let newContact = "";
      req.on("data", (chunk) => {
        newContact = JSON.parse(chunk.toString());
        console.log(newContact);
      });

      req.on("end", async () => {
        contacts.push(newContact);
        await writeContactsToDB(contacts);
        res.statusCode = 200;
        res.end("Contact has been added successfully");
      });
    } else {
      handleError(res, 400, "Invalid request");
    }
  } catch (error) {
    handleError(res, 500, "Internal Server Error");
  }
};

// Handle PUT requests
const updateContact = async (req, res, selectedId) => {
  try {
    let contacts = await getContactsFromDB();

    if (req.headers["content-type"] === JSON_CONTENT_TYPE && selectedId) {
      let editedContact = "";

      req.on("data", (chunk) => {
        editedContact = JSON.parse(chunk.toString());
      });

      req.on("end", async () => {
        contacts = contacts.map((contact) => {
          if (contact.id == selectedId) {
            return editedContact;
          }
          return contact;
        });

        await writeContactsToDB(contacts);
        res.statusCode = 200;
        res.end("Contact has been edited successfully");
      });
    } else {
      handleError(res, 400, "Invalid request");
    }
  } catch (error) {
    handleError(res, 500, "Internal Server Error");
  }
};

// Handle DELETE requests
const deleteContact = async (req, res, selectedId) => {
  try {
    let contacts = await getContactsFromDB();
    if (selectedId) {
      contacts = contacts.filter((contact) => contact.id != selectedId);
      await writeContactsToDB(contacts);
      res.statusCode = 204;
      res.end("Contact has been deleted successfully");
    } else {
      handleError(res, 400, "Invalid ID format");
    }
  } catch (error) {
    handleError(res, 500, "Internal Server Error");
  }
};

//PATCH
// contacts = contacts.map((contact) => {
//   if (contact.id == selectedId) {
//     Object.keys(editedContact).map(keyContact=>{
//       contact[keyContact]=editedContact[keyContact]

//       return contact
//     })
//   }
//   return contact;
// });
export { getContacts, postContact, updateContact, deleteContact };

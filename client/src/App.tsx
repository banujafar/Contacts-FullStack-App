import { useEffect, useState } from "react";
import ContactList from "./components/ContactList";
import { AddContact } from "./components/AddContat";
import axios from "axios"; // Import Axios

interface ICONTACTS {
  id: string;
  fullname: string;
  job: string;
  email: string;
  phone: string;
  img: string;
}

function App() {
  const [contacts, setContacts] = useState<ICONTACTS[]>([]);
  const [editedContact, setEditedContact] = useState<ICONTACTS>();

  const fetchData = async () => {
    try {
      const response = await axios.get("https://contacts-app-service.onrender.com/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendData = async (values: ICONTACTS) => {
    try {
      const url = editedContact
        ? `https://contacts-app-service.onrender.com/contacts/${editedContact.id}`
        : "https://contacts-app-service.onrender.com/contacts";

      const method = editedContact ? "PUT" : "POST";

      const response = await axios({
        method: method,
        url: url,
        data: values,
        headers: {
          "Content-Type": "text/plain",
        },
      });

      if (editedContact) {
        console.log(editedContact)
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === editedContact.id ? values : contact
          )
        );
      } else {
        setContacts((prevContacts) => [...prevContacts, values]);
      }
      setEditedContact(undefined);
      console.log("Axios response:", response);
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  const handleEdit = (contactID?: string) => {
    console.log(contactID)
    const edited = contacts.find((contact) => contact.id == contactID);
    setEditedContact(edited);
  };

  const handleDelete = async (contactID: string) => {
    try {
      await axios.delete(`https://contacts-app-service.onrender.com/contacts/${contactID}`);
      const filteredContacts = contacts.filter((contact) => contact.id !== contactID);
      setContacts(filteredContacts);
      setEditedContact(undefined);
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  return (
    <div className="bg-main-bg w-full p-4">
      <div className="bg-black flex flex-col m-auto w-2/3">
        <div className="flex w-full h-height">
          <ContactList contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
          <AddContact editedContact={editedContact} onSend={sendData} />
        </div>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import ContactList from "./components/ContactList";
import { AddContact } from "./components/AddContat";

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
      const response = await fetch('http://localhost:3000/contacts');
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendData = async (values: ICONTACTS) => {
    try {
      const options = {
        method: editedContact ? 'PUT' : 'POST',
        body: JSON.stringify(values),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      const url = editedContact
        ? `http://localhost:3000/contacts/${editedContact.id}`
        : 'http://localhost:3000/contacts';

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      if (editedContact) {
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === editedContact.id ? values : contact
          )
        );
      } else {
        setContacts((prevContacts) => [...prevContacts, values]);
      }
      setEditedContact(undefined);
      console.log('Response data:', response);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleEdit = (contactID?: string) => {
    const edited = contacts.find((contact) => contact.id == contactID);
    setEditedContact(edited);
  };

  const handleDelete = async (contactID: string) => {
    try {
      await fetch(`http://localhost:3000/contacts/${contactID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          const filteredContacts = contacts.filter((contact) => contact.id != contactID)
          setContacts(filteredContacts)
          setEditedContact(undefined);
        })

    } catch (error) {
      console.log(error)
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

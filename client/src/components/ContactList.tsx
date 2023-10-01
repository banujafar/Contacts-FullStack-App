import ContactItem from "./ContactItem"
interface ICONTACTS {
  id: string,
  fullname: string,
  job: string,
  email: string,
  phone: string,
  img: string,
}

interface IContactListProps {
  contacts: ICONTACTS[],
  onEdit: (contactID?: string) => void,
  onDelete: (contactID: string) => void,
}

const ContactList = ({ contacts, onEdit, onDelete }: IContactListProps) => {
  const handleAdd = () => {
    onEdit()
  }

  console.log(contacts)
  return (
    <div className="flex flex-col w-1/3 bg-black p-4 overflow-y-scroll h-height">
      <div className="flex justify-between  items-center text-blue-500 mb-3 text-l">
        <h1 >All Contacts</h1>
        <button onClick={handleAdd}>Add Contact</button>
      </div>
      <p className="text-xl text-white font-bold">Contacts</p>
      {contacts.map((contact) => (
        <ContactItem contact={contact} key={contact.id} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
export default ContactList;
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
interface ICONTACT {
  id: string,
  fullname: string,
  job: string,
  email: string,
  phone: string,
  img: string,
}

interface IContactItemProps {
  contact: ICONTACT,
  onEdit: (contactID?: string) => void,
  onDelete: (contactID: string) => void,
}

const ContactItem = ({ contact, onEdit, onDelete }: IContactItemProps) => {
const fullNameImg=contact.fullname?.split(' ')
  console.log(contact)
  return (
    <div className="bg-like-black text-white flex p-2 rounded-xl gap-4 w-full my-4 relative">
      <div className="w-12 rounded-full h-12">
        {contact.img ? <img src={contact.img} className="w-full h-full rounded-full" /> : <span className="flex justify-center items-center w-full h-full rounded-full bg-gray-400 text-xl">{fullNameImg?.map(item=>item[0])}</span>}
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-l">{contact.fullname}</p>
        <span className="text-xs opacity-60">{contact.job}</span>
      </div>
      <div className=' absolute top-6 right-2 flex gap-2'>
        <button onClick={() => onEdit(contact.id.toString())}>
          <FiEdit />
        </button>
        <button onClick={() => onDelete(contact.id.toString())}>
          <AiOutlineDelete />
        </button>

      </div>


    </div>
  )
}
export default ContactItem;
import styles from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredContacts, selectContacts } from '../redux/selectors';
import { deleteContacts } from '../redux/operations';
import Avatar from 'react-avatar';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filtredContacts = useSelector(getFilteredContacts);

  const filtered = Array.isArray(contacts) ? filtredContacts : [];

  if (!Array.isArray(contacts)) {
    console.error('Contacts is not an array:', contacts);
    return null;
  }

  return (
    <div className={styles.containerContacts}>
      <h3 className={styles.titleContact}>Contact List:</h3>
      <ul className={styles.itemsContact}>
        {filtered.map(contact => (
          <li key={contact.id} className={styles.itemContact}>
            <div className={styles.wrapperContact}>
              <Avatar
                name={contact.name}
                size="25"
                round={true}
                color="#e7ae56"
                textSizeRatio={2.3}
                style={{ marginRight: '5px' }}
              />
              <span className={styles.contactName}>{`${contact.name}`}</span> :{' '}
              {contact.number}
            </div>
            <div className={styles.containerBtnDel}>
              <button
                className={styles.btnDelete}
                onClick={() => dispatch(deleteContacts(contact.id))}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ContactList;

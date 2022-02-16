import PropTypes from "prop-types";

import {
  ButtonDelete,
  ContactListLi,
  ContactListBox,
} from "./ContactList.styled";

const ContactListItem = ({ id, name, number, onRemove }) => {
  return (
    <ContactListLi>
      {name}: {number}
      <ButtonDelete onClick={() => onRemove(id)}>Delete</ButtonDelete>
    </ContactListLi>
  );
};

//компонент разметки самого списка
const ContactList = ({ contacts, onRemove }) => {
  //если список контактов равен нулю то разметка не рендериться
  if (contacts.length === 0) return null;
  //если больше нуля то возвращаем список
  return (
    <ContactListBox>
      {/* перебираем наши контакты методом map будет приходить на каждой итерации контакт и будем рендерить ContactListItem */}
      {contacts.map((contact, id) => (
        <ContactListItem {...contact} key={id} onRemove={onRemove} />
      ))}
    </ContactListBox>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
};
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  onRemove: PropTypes.func,
};

export default ContactList;

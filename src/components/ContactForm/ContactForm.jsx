import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, FormLabel, Input } from "./ContactForm.styled";
import { nanoid } from "nanoid";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const ContactForm = ({ onAdd, onCheckUnique }) => {
  // const [name, setName] = useState("");
  // const [number, setNumber] = useState("");
  const [form, setForm] = useState({
    name: "",
    number: "",
  });

  // обоработчик для инпута в onChange
  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    //первый вариант на switch
    // switch (name) {
    //   case "name":
    //     setName(value);
    //     break;
    //   case "number":
    //     setNumber(value);
    //     break;
    //   default:
    //     break;
    // }
    //второй вариант более предпочтителен на формах так как форма - одна сущность
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // обоработчик для submit формы
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // берем из useState формы (имя и телефон)
    const isValidateForm = validateForm();
    // проверяем если форма не валидна делаем возврат
    if (!isValidateForm) return;
    // если все ок вызываем метод onAdd и кладем в него на контакт name, number
    onAdd({ id: nanoid(10), ...form });
    resetForm();
  };
  // валидатор формы
  const validateForm = () => {
    //проверяем если у нас поля они не пустые
    if (!name || !number) {
      Notify.failure("Some field is empty");
      return false;
    }
    // функция проверяет есть ли такой контакт в списке контактов
    return onCheckUnique(name);
  };
  //метод для очистки формы после отправки данных
  // const resetForm = () => [setName(""), setNumber("")];
  const resetForm = () => setForm({ name: "", number: "" });

  // берем из state имя и телефон
  const { name, number } = form;
  return (
    <Form onSubmit={handleFormSubmit}>
      <FormLabel>
        Name
        <Input
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={handleChangeForm}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </FormLabel>
      <FormLabel>
        Number
        <Input
          type="tel"
          name="number"
          placeholder="Enter phone number"
          value={number}
          onChange={handleChangeForm}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </FormLabel>
      <button type="submit">Add contact</button>
    </Form>
  );
};

ContactForm.propType = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ContactForm;

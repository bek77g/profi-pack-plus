import { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import ReactInputMask from 'react-input-mask';

const Feedback = () => {
  const [submitBtn, setSubmitBtn] = useState(false);
  const [partnerData, setPartnerData] = useState({
    Name: '',
    Surname: '',
    Phone: '',
    Email: '',
    Comment: '',
  });

  const { Name, Surname, Phone, Email, Comment } = partnerData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartnerData({ ...partnerData, [name]: value });
  };

  const partnerPostHandler = () => {
    let data = { data: partnerData };
    axios
      .post('api/partner-requests', data)
      .then((res) => {
        if (res.status === 200) toast.success('Успешно отправленно');
        setSubmitBtn(true);
        document.getElementById('partner-form').reset();
      })
      .catch((err) => {
        toast.error('Проверьте все поля');
        console.log(err);
        console.log(data);
      });
  };

  const createUserHandler = (event) => {
    let invalidStyle = 'border: 1px solid #dc3545';
    let validStyle = 'border: 1px solid #198754;';
    event.preventDefault();
    if (
      Name.trim().length === 0 ||
      Surname.trim().length === 0 ||
      Phone.trim().length === 0 ||
      Email.trim().length === 0 ||
      Comment.trim().length === 0
    ) {
      if (Name.trim().length === 0) {
        toast.error('Вы не заполнили поле Имя!');
        event.target.Name.style.cssText = invalidStyle;
      } else event.target.Name.style.cssText = validStyle;
      if (Surname.trim().length === 0) {
        toast.error("Вы не заполнили поле Фамилия '!");
        event.target.Surname.style.cssText = invalidStyle;
      } else event.target.Surname.style.cssText = validStyle;
      if (Phone.trim().length === 0) {
        toast.error('Вы не заполнили поле Телефон!');
        event.target.Phone.style.cssText = invalidStyle;
      } else event.target.Phone.style.cssText = validStyle;
      if (Email.trim().length === 0) {
        toast.error('Вы не заполнили поле Email Адрес!');
        event.target.Email.style.cssText = invalidStyle;
      } else event.target.Email.style.cssText = validStyle;
      if (Comment.trim().length === 0) {
        toast.error('Вы не заполнили поле Сообщения!');
        event.target.Comment.style.cssText = invalidStyle;
      } else event.target.Comment.style.cssText = validStyle;
    } else {
      partnerPostHandler();
    }
  };

  return (
    <div>
      <form id='partner-form' action='' onSubmit={createUserHandler}>
        <div className='contacts__content__left'>
          <div className='contacts__content__left__name mb-3'>
            <label
              htmlFor='exampleFormControlInput1'
              className='form-label mb-2'>
              Имя
            </label>
            <input
              type='text'
              className='form-control'
              id='exampleFormControlInput1'
              placeholder='Имя'
              name='Name'
              value={Name}
              onChange={handleChange}
            />
          </div>
          <div className='contacts__content__left__surname mb-3'>
            <label
              htmlFor='exampleFormControlInput1'
              className='form-label mb-2'>
              Фамилия
            </label>
            <input
              type='text'
              className='form-control'
              id='exampleFormControlInput1'
              placeholder='Фамилия'
              name='Surname'
              value={Surname}
              onChange={handleChange}
            />
          </div>
          <div className='contacts__content__left__tel mb-3'>
            <label
              htmlFor='exampleFormControlInput1'
              className='form-label mb-2'>
              Номер телефона
            </label>
            <ReactInputMask
              mask='+\9\96 999 999 999'
              type='tel'
              className='form-control'
              id='exampleFormControlInput1'
              placeholder='Номер
                        телефона'
              name='Phone'
              value={Phone}
              onChange={handleChange}
            />
          </div>
          <div className='contacts__content__left__email mb-3'>
            <label
              htmlFor='exampleFormControlInput1'
              className='form-label mb-2'>
              Email адрес
            </label>
            <input
              type='email'
              className='form-control'
              id='exampleFormControlInput1'
              placeholder='Email@example.com'
              name='Email'
              value={Email}
              onChange={handleChange}
            />
          </div>
          <div className='contacts__content__left__message'>
            <label
              htmlFor='exampleFormControlTextarea1'
              className='form-label mb-2'>
              Ваше сообщение
            </label>
            <textarea
              className='form-control'
              id='exampleFormControlTextarea1'
              rows='3'
              name='Comment'
              value={Comment}
              onChange={handleChange}
            />
          </div>
          <div className='contacts__content__left__btn mt-3'>
            <button
              disabled={submitBtn}
              type='submit'
              className='btn btn-primary'>
              Отправить
            </button>
          </div>
        </div>
      </form>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default Feedback;

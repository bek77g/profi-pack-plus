import { useState } from 'react';
import cart from '../../components/constants/cart';
import { HandySvg } from 'handy-svg';
import remove from '../../assets/icons/remove.svg';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const CheckoutPage = () => {
  const newCart = cart.map((elem) => {
    return (
      <>
        <tr>
          <td>
            <div className='product-item'>
              <div className='product-info d-flex justify-content-around align-items-center'>
                <img src={elem.img} alt='Product' />
                <h4 className='product-title'>{elem.name}</h4>
              </div>
            </div>
          </td>
          <td className='text-center'>
            <div className='count-input'>
              <span>1</span>
            </div>
          </td>
          <td className='text-center text-lg text-medium'>2800</td>
          <td className='text-center text-lg text-medium'>2800</td>
        </tr>
      </>
    );
  });

  const [inputName, setInputName] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputTel, setInputTel] = useState('');
  const [inputMail, setInputMail] = useState('');
  const [inputInfo, setInputInfo] = useState('');

  const createUserHandler = (event) => {
    event.preventDefault();
    if (
      inputName.trim().length === 0 ||
      inputAddress.trim().length === 0 ||
      inputTel.trim().length === 0 ||
      inputMail.trim().length === 0 ||
      inputInfo.trim().length === 0
    ) {
      toast.error('Заполните все поля!');
    } else {
      toast.success('Заказ успешно отправлен');
    }

    // } else if (inputName.trim().length === 0) {
    //     toast.error("Вы не заполнили поле Имя!");
    //     event.target.classList('validationInput');
    // } else if (inputSurName.trim().length === 0) {
    //     toast.error("Вы не заполнили поле Фамилие '!");
    // } else if (inputTel.trim().length === 0) {
    //     toast.error("Вы не заполнили поле Телефон!");
    // } else if (inputMail.trim().length === 0) {
    //     toast.error("Вы не заполнили поле Email адресс!");
    // } else if (inputInfo.trim().length === 0) {
    //     toast.error("Вы не заполнили поле Сообщения!");
    // }
  };

  const checkInputName = (event) => {
    setInputName(event.target.value);
  };
  const checkInputAddress = (event) => {
    setInputAddress(event.target.value);
  };
  const checkInputTel = (event) => {
    setInputTel(event.target.value);
  };
  const checkInputMail = (event) => {
    setInputMail(event.target.value);
  };
  const checkInputInfo = (event) => {
    setInputInfo(event.target.value);
  };

  return (
    <div className='checkoutPage'>
      <section className='h-100 h-custom cartPage'>
        <div className='container py-5 h-100'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col-12'>
              <div
                className='card card-registration card-registration-2'
                style={{ borderRadius: '15px' }}>
                <div className='card-body p-0'>
                  <div className='row g-0'>
                    <div className='col-lg-8'>
                      <div className='p-5'>
                        <div className='d-flex justify-content-between align-items-center mb-5'>
                          <h2 className='fw-bold mb-0 text-black'>
                            Shopping Cart
                          </h2>
                        </div>
                        <hr className='my-4' />

                        <div className='row mb-4 d-flex justify-content-between align-items-center'>
                          <div className='col-md-2 col-lg-2 col-xl-2'>
                            <img
                              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp'
                              className='img-fluid rounded-3'
                              alt='Cotton T-shirt'
                            />
                          </div>
                          <div className='col-md-3 col-lg-3 col-xl-3 cartPageText'>
                            <h6 className='text-muted'>Shirt</h6>
                            <h6 className='text-black mb-0'>Cotton T-shirt</h6>
                          </div>
                          <div className='col-md-3 col-lg-3 col-xl-2 d-flex'>
                            <div className='catalogPagePopular__catalogs__cards__card__quantity pt-4'>
                              <button type='button' className='btn btn-info'>
                                -
                              </button>
                              <input
                                type='text'
                                className='form-control form-control-color'
                                defaultValue={1}
                              />
                              <button type='button' className='btn btn-info'>
                                +
                              </button>
                            </div>
                          </div>

                          <div className='col-md-3 col-lg-2 col-xl-2 offset-lg-1 cartPageText'>
                            <h6 className='mb-0'>€ 44.00</h6>
                          </div>

                          <div className='col-md-1 col-lg-1 col-xl-1 text-end cartPageText'>
                            <span>
                              <HandySvg src={remove} width='13' height='15' />
                            </span>
                          </div>
                        </div>
                        <div className='row mb-4 d-flex justify-content-between align-items-center'>
                          <div className='col-md-2 col-lg-2 col-xl-2'>
                            <img
                              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp'
                              className='img-fluid rounded-3'
                              alt='Cotton T-shirt'
                            />
                          </div>
                          <div className='col-md-3 col-lg-3 col-xl-3 cartPageText'>
                            <h6 className='text-muted'>Shirt</h6>
                            <h6 className='text-black mb-0'>Cotton T-shirt</h6>
                          </div>
                          <div className='col-md-3 col-lg-3 col-xl-2 d-flex'>
                            <div className='catalogPagePopular__catalogs__cards__card__quantity pt-4'>
                              <button type='button' className='btn btn-info'>
                                -
                              </button>
                              <input
                                type='text'
                                className='form-control form-control-color'
                                defaultValue={1}
                              />
                              <button type='button' className='btn btn-info'>
                                +
                              </button>
                            </div>
                          </div>

                          <div className='col-md-3 col-lg-2 col-xl-2 offset-lg-1 cartPageText'>
                            <h6 className='mb-0'>€ 44.00</h6>
                          </div>

                          <div className='col-md-1 col-lg-1 col-xl-1 text-end cartPageText'>
                            <span>
                              <HandySvg src={remove} width='13' height='15' />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='col-lg-4 bg-grey d-flex align-items-center'>
                      <div className='p-5'>
                        <h3 className='fw-bold mb-5 mt-2 pt-1'>Заказ</h3>
                        <hr className='my-4' />

                        <div className='d-flex justify-content-between mb-4'>
                          <h5 className=''>Количество :</h5>
                          <h5>3</h5>
                        </div>

                        <hr className='my-4' />

                        <div className='d-flex justify-content-between mb-5'>
                          <h5 className=''>Итого:</h5>
                          <h5>137.00</h5>
                        </div>
                        <div className='d-flex justify-content-center'></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='checkoutPage__feedback'>
        <div className='checkoutPage__feedback__title mb-5'>
          <h2>Данные покупателя</h2>
        </div>
        <div className='checkoutPage__feedback__form'>
          <form action='' onSubmit={createUserHandler}>
            <div className='contacts__content__left'>
              <div className='contacts__content__left__name mb-3'>
                <label
                  htmlFor='exampleFormControlInput1'
                  className='form-label mb-2'>
                  Ф.И.О.
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Ф.И.О.'
                  value={inputName}
                  onChange={checkInputName}
                />
              </div>
              <div className='contacts__content__left__tel mb-3'>
                <label
                  htmlFor='exampleFormControlInput1'
                  className='form-label mb-2'>
                  Номер телефона
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Номер
                        телефона'
                  value={inputTel}
                  onChange={checkInputTel}
                />
              </div>
              <div className='contacts__content__left__email mb-3'>
                <label
                  htmlFor='exampleFormControlInput1'
                  className='form-label mb-2'>
                  Email адрес
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Email@example.com'
                  value={inputMail}
                  onChange={checkInputMail}
                />
              </div>
              <div className='contacts__content__left__address mb-3'>
                <label htmlFor='inputAddress' className='form-label'>
                  Адресс
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Проспект чуй 52'
                  value={inputAddress}
                  onChange={checkInputAddress}
                />
              </div>
              <div className='contacts__content__left__order mb-3'>
                <label htmlFor='validationCustom04' className='form-label'>
                  Способ доставки
                </label>
                <select
                  className='form-select'
                  value={inputInfo}
                  onChange={checkInputInfo}>
                  <option></option>
                  <option>Доставка курьером(200 сом)</option>
                  <option>Самовывоз</option>
                </select>
              </div>
              <div className='contacts__content__left__payment mb-3'>
                <label htmlFor='validationCustom04' className='form-label'>
                  Способ оплаты
                </label>
                <select
                  className='form-select'
                  value={inputInfo}
                  onChange={checkInputInfo}>
                  <option></option>
                  <option>Наличные курьеру</option>
                  <option>Безналичная оплата</option>
                </select>
              </div>
              <div className='contacts__content__left__message'>
                <label
                  htmlFor='exampleFormControlTextarea1'
                  className='form-label mb-2'>
                  Комментарии к заказу:
                </label>
                <textarea
                  className='form-control'
                  id='exampleFormControlTextarea1'
                  rows='3'
                  value={inputInfo}
                  onChange={checkInputInfo}></textarea>
              </div>
            </div>
            <div className='shopping-cart-footer mt-5'>
              <div className='column'></div>
              <div className='column'>
                <button type='submit' className=' btn btn-outline-secondary'>
                  Отправить заказ
                </button>
              </div>
            </div>
          </form>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

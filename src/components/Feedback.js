import React from 'react';

const Feedback = () => {
    return (
        <div>
            <div className="contacts__content__left">
                <div className="contacts__content__left__name mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label mb-2">Имя</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1"
                           placeholder="Имя"/>
                </div>
                <div className="contacts__content__left__surname mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label mb-2">Фамилие</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1"
                           placeholder="Фамилие"/>
                </div>
                <div className="contacts__content__left__tel mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label mb-2">Номер
                        телефона</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1"
                           placeholder="Номер
                        телефона"/>
                </div>
                <div className="contacts__content__left__email mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label mb-2">Email адрес</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1"
                           placeholder="Email@example.com"/>
                </div>
                <div className="contacts__content__left__message">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label mb-2">Ваше
                        сообщение</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1"
                              rows="3"></textarea>
                </div>
            </div>
        </div>
    );
};

export default Feedback;

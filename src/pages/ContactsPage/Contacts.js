import React from 'react';

const Contacts = () => {
    return (
        <div className="contacts">
            <div className="contacts__content">
                <div className="contacts__content__left">
                    <div className="contacts__content__left__name">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Имя</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1"
                               placeholder="name@example.com"/>
                    </div>
                    <div className="contacts__content__left__surname">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Фамилие</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1"
                               placeholder="name@example.com"/>
                    </div>
                    <div className="contacts__content__left__tel">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Номер телефона</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1"
                               placeholder="name@example.com"/>
                    </div>
                    <div className="contacts__content__left__email">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email адрес</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1"
                               placeholder="name@example.com"/>
                    </div>
                    <div className="contacts__content__left__message">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Ваше сообщение</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                </div>
                <div className="contacts__content__right">
                    <div className="contacts__content__right__map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5848.16529649286!2d74.62744932490476!3d42.871099679656744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7aefd001863%3A0x2cb6c66ca4d4e24!2z0LzQuNC60YDQvtGA0LDQudC-0L0g0JLQvtGB0YLQvtC6LTUsINCR0LjRiNC60LXQug!5e0!3m2!1sru!2skg!4v1663847719636!5m2!1sru!2skg"
                            allowFullScreen="" loading="
                                lazy"
                            referrerPolicy="" no-referrer-when-downgrade/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;

import React from 'react';
import location from "../../assets/icons/location.svg";
import tel from "../../assets/icons/tel.svg";
import work from "../../assets/icons/work.svg";
import email from "../../assets/icons/email.svg";
import {HandySvg} from "handy-svg";
import arr from "../../assets/icons/arr.svg";

const Contacts = () => {
    return (
        <div className="contacts">
            <div className="contacts__content">
                <div className="container">
                    <div className="contacts__top">
                        <span>Главная</span>
                        <span>
                            <HandySvg src={arr} width="6" height="9"/>
                        </span>
                        <span>Контакты</span>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="contacts__content__left">
                                <div className="contacts__content__left__title">
                                    <span>Интернет-магазин «ProfiPuckPlus»</span>
                                </div>
                                <div className="contacts__content__left__call">
                                    <span>Позвоните нам</span>
                                </div>
                                <div className="contacts__content__left__info">
                                    <div className="contacts__content__left__phone mb-4">
                                        <svg width="23" height="25" viewBox="0 0 15 15" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M4.71922 0.5H2.5C1.39543 0.5 0.5 1.39543 0.5 2.5V4.5C0.5 10.0228 4.97715 14.5 10.5 14.5H12.5C13.6046 14.5 14.5 13.6046 14.5 12.5V11.118C14.5 10.7393 14.286 10.393 13.9472 10.2236L11.5313 9.01564C10.987 8.74349 10.3278 9.01652 10.1354 9.59384L9.83762 10.4871C9.64474 11.0658 9.05118 11.4102 8.45309 11.2906C6.05929 10.8119 4.18814 8.94071 3.70938 6.54691C3.58976 5.94882 3.93422 5.35526 4.51286 5.16238L5.62149 4.79284C6.11721 4.6276 6.40214 4.10855 6.2754 3.60162L5.68937 1.25746C5.57807 0.812297 5.17809 0.5 4.71922 0.5Z"
                                                stroke="#1C62CD"/>
                                        </svg>
                                        <span>8 800 900 70 90</span>
                                    </div>
                                    <div className="contacts__content__left__address mb-4">
                                        <svg width="23" height="25" viewBox="0 0 13 15" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                  d="M6.5 8.49478C7.604 8.49478 8.5 7.59934 8.5 6.49606C8.5 5.39278 7.604 4.49738 6.5 4.49738C5.396 4.49738 4.5 5.39278 4.5 6.49606C4.5 7.59934 5.396 8.49478 6.5 8.49478Z"
                                                  stroke="#1C62CD" stroke-linecap="square"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                  d="M12.5 6.49606C12.5 11.4928 7.5 14.4909 6.5 14.4909C5.5 14.4909 0.5 11.4928 0.5 6.49606C0.5 3.18522 3.187 0.5 6.5 0.5C9.813 0.5 12.5 3.18522 12.5 6.49606Z"
                                                  stroke="#1C62CD" stroke-linecap="square"/>
                                        </svg>
                                        <span>г. Орск Проспект Ленина 71 / А</span>
                                    </div>
                                    <div className="contacts__content__left__mail mb-4">
                                        <HandySvg src={work} width="23" height="25"/>
                                        <span>Пн-вс: 10:00 - 21:00 без выходных</span>
                                    </div>
                                    <div className="contacts__content__left__work mb-4">
                                        <HandySvg src={email} width="23" height="25"/>
                                        <span>info@ProfiPuckPlus.kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
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
                </div>
            </div>
        </div>
    );
};

export default Contacts;

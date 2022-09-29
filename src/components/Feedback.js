import React, {useState} from 'react';
import {toast, Toaster} from "react-hot-toast";

const Feedback = () => {

    const [inputName, setInputName] = useState("");
    const [inputSurName, setInputSurName] = useState("");
    const [inputTel, setInputTel] = useState("");
    const [inputMail, setInputMail] = useState("");
    const [inputInfo, setInputInfo] = useState("");

    const createUserHandler = (event) => {
        event.preventDefault();
        if (inputName.trim().length === 0 || inputSurName.trim().length === 0 || inputTel.trim().length === 0 || inputMail.trim().length === 0 || inputInfo.trim().length === 0) {
            toast.error("Заполните все поля!");
        } else {
            toast.success("Успешно отправленно");
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
    }

    const checkInputName = (event) => {
        setInputName(event.target.value);
    };
    const checkInputSurName = (event) => {
        setInputSurName(event.target.value);
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

    // useEffect(createUserHandler, [inputName]);

    return (
        <div>
            <form action="" onSubmit={createUserHandler}>
                <div className="contacts__content__left">
                    <div className="contacts__content__left__name mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label mb-2">Имя</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Имя" value={inputName} onChange={checkInputName}/>
                    </div>
                    <div className="contacts__content__left__surname mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label mb-2">Фамилие</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Фамилие" value={inputSurName} onChange={checkInputSurName}/>
                    </div>
                    <div className="contacts__content__left__tel mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label mb-2">Номер
                            телефона</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Номер
                        телефона" value={inputTel} onChange={checkInputTel}/>
                    </div>
                    <div className="contacts__content__left__email mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label mb-2">Email адрес</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Email@example.com" value={inputMail} onChange={checkInputMail}/>
                    </div>
                    <div className="contacts__content__left__message">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label mb-2">Ваше
                            сообщение</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1"
                                  rows="3" value={inputInfo} onChange={checkInputInfo}/>
                    </div>
                    <div className="contacts__content__left__btn mt-3">
                        <button type="submit" className="btn btn-primary">Отправить</button>
                    </div>
                </div>
            </form>
            <Toaster/>
        </div>
    );
};

export default Feedback;

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CustomContext } from '../../hoc/mainContentContext';
import './AuthModal.scss';

const AuthModal = ({ isOpen, onClose }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [step, setStep] = useState('phone'); // 'phone' or 'code'
    const [error, setError] = useState('');
    const { setUser } = useContext(CustomContext);

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/sms/send-code', { phoneNumber });
            setStep('code');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error sending code');
        }
    };

    const handleCodeVerification = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/sms/verify', {
                phoneNumber,
                code: verificationCode
            });
            
            localStorage.setItem('jwt', data.jwt);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`;
            setUser(data.user);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid code');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="auth-modal">
            <div className="auth-modal__content">
                <button className="auth-modal__close" onClick={onClose}>×</button>
                <h2>Авторизация</h2>
                {error && <div className="auth-modal__error">{error}</div>}
                
                {step === 'phone' ? (
                    <form onSubmit={handlePhoneSubmit}>
                        <div className="auth-modal__input-group">
                            <label>Номер телефона</label>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="+77771234567"
                                required
                            />
                        </div>
                        <button type="submit" className="auth-modal__submit">
                            Получить код
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleCodeVerification}>
                        <div className="auth-modal__input-group">
                            <label>Код из SMS</label>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                placeholder="123456"
                                maxLength="6"
                                required
                            />
                        </div>
                        <button type="submit" className="auth-modal__submit">
                            Войти
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthModal;

# SMS-авторизация в ProfiPackPlus CMS

## Настройка

1. Добавьте следующие переменные в ваш `.env` файл:
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone
```

2. Убедитесь, что все необходимые пакеты установлены:
```bash
yarn add twilio
```

## API Endpoints

### 1. Отправка кода верификации

**Endpoint:** `POST /api/sms/send-code`

**Request Body:**
```json
{
  "phoneNumber": "+77771234567"
}
```

**Response:**
```json
{
  "message": "Verification code sent successfully"
}
```

**Возможные ошибки:**
- 400: "Phone number is required"
- 400: "Error sending verification code"

### 2. Проверка кода и авторизация

**Endpoint:** `POST /api/sms/verify`

**Request Body:**
```json
{
  "phoneNumber": "+77771234567",
  "code": "123456"
}
```

**Success Response:**
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "phoneNumber": "+77771234567",
    "username": "+77771234567"
  }
}
```

**Возможные ошибки:**
- 400: "Phone number and code are required"
- 400: "Invalid or expired verification code"

## Процесс авторизации

1. Пользователь вводит номер телефона
2. Фронтенд отправляет запрос на `/api/sms/send-code`
3. Бэкенд генерирует 6-значный код и отправляет его через SMS
4. Пользователь получает SMS и вводит код
5. Фронтенд отправляет запрос на `/api/sms/verify`
6. При успешной верификации возвращается JWT токен

## Важные заметки

- Код верификации действителен в течение 15 минут
- Номер телефона должен быть в международном формате (например, +77771234567)
- JWT токен нужно сохранять и использовать для всех последующих запросов в заголовке:
  ```
  Authorization: Bearer <jwt_token>
  ```

## Пример использования (Frontend)

```javascript
// Отправка кода
async function sendVerificationCode(phoneNumber) {
  const response = await fetch('/api/sms/send-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phoneNumber }),
  });
  return response.json();
}

// Проверка кода
async function verifyCode(phoneNumber, code) {
  const response = await fetch('/api/sms/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phoneNumber, code }),
  });
  const data = await response.json();
  
  if (data.jwt) {
    // Сохраняем JWT токен
    localStorage.setItem('jwt', data.jwt);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  
  return data;
}
```

## Безопасность

- Все коды верификации хранятся в зашифрованном виде
- Срок действия кода ограничен 15 минутами
- После успешной верификации код удаляется
- Номер телефона проверяется на уникальность

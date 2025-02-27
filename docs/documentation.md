# Profile API Documentation

## Endpoints

### Get Profile
```http
GET /api/profile
Authorization: Bearer YOUR_JWT_TOKEN
```
Возвращает полный профиль пользователя, включая личную информацию, данные организации и адреса.

**Response Example:**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+77771234567",
  "isAdult": true,
  "gender": "male",
  "organization": {
    "id": 1,
    "name": "Company Ltd",
    "inn": "1234567890",
    "position": "Manager",
    "comments": "Some notes"
  },
  "addresses": [
    {
      "id": 1,
      "type": "home",
      "title": "Дом",
      "street": "ул. Примерная",
      "building": "123",
      "apartment": "45",
      "floor": 4,
      "entrance": "2",
      "isDefault": true
    }
  ]
}
```

### Update Personal Information
```http
PATCH /api/profile/personal
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+77771234567",
  "isAdult": true,
  "gender": "male"
}
```
Обновляет личную информацию пользователя. Можно отправлять только те поля, которые нужно обновить.

### Update Organization
```http
PATCH /api/profile/organization
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "Company Ltd",
  "inn": "1234567890",
  "position": "Manager",
  "comments": "Some notes"
}
```
Обновляет или создает информацию об организации. Можно отправлять только те поля, которые нужно обновить.

### Create Address
```http
POST /api/profile/addresses
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "type": "home",
  "title": "Дом",
  "street": "ул. Примерная",
  "building": "123",
  "apartment": "45",
  "floor": 4,
  "entrance": "2",
  "isDefault": true
}
```
Создает новый адрес. Обязательные поля: type, title, street, building.
Если isDefault=true или это первый адрес, он станет адресом по умолчанию.

### Update Address
```http
PATCH /api/profile/addresses/:id
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Новый заголовок",
  "street": "ул. Новая",
  "isDefault": true
}
```
Обновляет существующий адрес. Можно отправлять только те поля, которые нужно обновить.
Если установить isDefault=true, этот адрес станет адресом по умолчанию.

### Delete Address
```http
DELETE /api/profile/addresses/:id
Authorization: Bearer YOUR_JWT_TOKEN
```
Удаляет указанный адрес. Если удаляется адрес по умолчанию, первый оставшийся адрес становится адресом по умолчанию.

## Типы данных

### Личная информация
- `firstName` (string, required) - Имя
- `lastName` (string, required) - Фамилия
- `phoneNumber` (string, required) - Номер телефона
- `isAdult` (boolean, required) - Подтверждение возраста 18+
- `gender` (enum: "male" | "female", required) - Пол

### Организация
- `name` (string, required) - Название организации
- `inn` (string, required) - ИНН
- `position` (string) - Должность
- `comments` (text) - Комментарии

### Адрес
- `type` (enum: "home" | "work" | "delivery", required) - Тип адреса
- `title` (string, required) - Название адреса
- `street` (string, required) - Улица
- `building` (string, required) - Номер дома
- `apartment` (string) - Квартира/офис
- `floor` (integer) - Этаж
- `entrance` (string) - Подъезд
- `isDefault` (boolean) - Адрес по умолчанию

## Примечания
1. Все запросы требуют JWT токен для аутентификации
2. При обновлении данных можно отправлять только те поля, которые нужно изменить
3. У пользователя может быть только один адрес по умолчанию
4. При создании первого адреса он автоматически становится адресом по умолчанию

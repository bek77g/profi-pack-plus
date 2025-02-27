# Система уведомлений

## Общее описание

Система уведомлений позволяет пользователям получать email-уведомления о:
- Новых товарах
- Товарах со скидками

## API Endpoints

### 1. Получить текущую подписку
**GET** `/api/notifications/subscription`

**Response:**
```json
{
  "email": "user@example.com",
  "subscribeToDiscounts": true,
  "subscribeToNewProducts": false,
  "lastNotified": "2025-02-25T13:00:00.000Z"
}
```

### 2. Подписаться на уведомления
**POST** `/api/notifications/subscribe`

**Request Body:**
```json
{
  "subscribeToDiscounts": true,
  "subscribeToNewProducts": true
}
```

### 3. Отписаться от уведомлений
**DELETE** `/api/notifications/unsubscribe`

## Пример использования (Frontend)

```javascript
// Функции для работы с уведомлениями
const notificationApi = {
  // Получить текущую подписку
  async getSubscription() {
    const response = await fetch('/api/notifications/subscription', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    return response.json();
  },

  // Подписаться на уведомления
  async subscribe(preferences) {
    const response = await fetch('/api/notifications/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify(preferences)
    });
    return response.json();
  },

  // Отписаться от уведомлений
  async unsubscribe() {
    const response = await fetch('/api/notifications/unsubscribe', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    return response.json();
  }
};

// Пример использования
async function updateNotificationPreferences() {
  try {
    await notificationApi.subscribe({
      subscribeToDiscounts: true,
      subscribeToNewProducts: false
    });
    console.log('Successfully updated notification preferences');
  } catch (error) {
    console.error('Error updating preferences:', error);
  }
}
```

## Примеры email уведомлений

### Новый товар
```html
<h2>Новый товар в магазине!</h2>
<div>
  <h3>Название товара</h3>
  <p>Описание товара</p>
  <p>Цена: 1000</p>
  <img src="..." alt="Название товара" style="max-width: 300px;">
  <p><a href="...">Посмотреть товар</a></p>
</div>
```

### Товар со скидкой
```html
<h2>Новый товар со скидкой!</h2>
<div>
  <h3>Название товара</h3>
  <p>Описание товара</p>
  <p>Цена: 1000</p>
  <p>Цена со скидкой: 800</p>
  <img src="..." alt="Название товара" style="max-width: 300px;">
  <p><a href="...">Посмотреть товар</a></p>
</div>
```

## Важные заметки

1. Все запросы требуют авторизации (JWT токен)
2. Email для уведомлений берется из профиля пользователя
3. По умолчанию новые пользователи подписаны на уведомления о скидках
4. Уведомления отправляются автоматически при:
   - Создании нового товара
   - Добавлении скидки на существующий товар
5. Используется SendGrid для отправки email

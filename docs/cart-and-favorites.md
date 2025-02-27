# API Корзины и Избранного

## Корзина (Cart)

### 1. Получить корзину пользователя
**GET** `/api/cart`

**Response:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 100,
      "name": "Product Name",
      "image": "image_url"
    }
  ],
  "total": 200,
  "itemCount": 2
}
```

### 2. Добавить товар в корзину
**POST** `/api/cart/add`

**Request Body:**
```json
{
  "id": 1,
  "quantity": 2
}
```

### 3. Удалить товар из корзины
**DELETE** `/api/cart/items/:id`

### 4. Обновить количество товара
**PUT** `/api/cart/items/:id`

**Request Body:**
```json
{
  "quantity": 3
}
```

### 5. Очистить корзину
**DELETE** `/api/cart/clear`

## Избранное (Favorites)

### 1. Получить список избранного
**GET** `/api/favorites`

**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "price": 100,
      "description": "Product Description",
      "image": "image_url"
    }
  ]
}
```

### 2. Добавить товар в избранное
**POST** `/api/favorites/add`

**Request Body:**
```json
{
  "id": 1
}
```

### 3. Удалить товар из избранного
**DELETE** `/api/favorites/:id`

### 4. Очистить список избранного
**DELETE** `/api/favorites/clear`

## Примеры использования (Frontend)

```javascript
// Функции для работы с корзиной
const cartApi = {
  // Получить корзину
  async getCart() {
    const response = await fetch('/api/cart', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    return response.json();
  },

  // Добавить товар в корзину
  async addToCart(productId, quantity = 1) {
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ id: productId, quantity })
    });
    return response.json();
  },

  // Обновить количество
  async updateQuantity(productId, quantity) {
    const response = await fetch(`/api/cart/items/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ quantity })
    });
    return response.json();
  },

  // Удалить товар
  async removeItem(productId) {
    const response = await fetch(`/api/cart/items/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    return response.json();
  }
};

// Функции для работы с избранным
const favoritesApi = {
  // Получить избранное
  async getFavorites() {
    const response = await fetch('/api/favorites', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    return response.json();
  },

  // Добавить в избранное
  async addToFavorites(productId) {
    const response = await fetch('/api/favorites/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ id: productId })
    });
    return response.json();
  },

  // Удалить из избранного
  async removeFromFavorites(productId) {
    const response = await fetch(`/api/favorites/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    return response.json();
  }
};
```

## Важные заметки

1. Все запросы требуют авторизации (JWT токен в заголовке)
2. Корзина автоматически создается при первом добавлении товара
3. При добавлении товара в корзину, если товар уже существует, количество увеличивается
4. При установке количества товара в 0, товар удаляется из корзины
5. В избранном нельзя добавить один и тот же товар дважды

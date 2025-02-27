# API Заказов

## Модель заказа

### Запрос на создание заказа
```typescript
interface CreateOrderRequest {
  items: Array<{
    id: number;      // ID товара
    quantity: number; // Количество
  }>;
  totalPrice: number;
  shippingPrice: number;
  shippingType: string;
  comment?: string;
  address?: number;  // ID адреса
  organization?: number;  // ID организации
}
```

### Модель заказа в базе данных
```typescript
interface Order {
  id: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: Array<{
    id: number;
    Title: string;
    Price: number;
    quantity: number;
    CountType: string;
    Article: string;
    Description?: string;
    Gallery?: Array<{
      id: number;
      url: string;
      formats?: {
        thumbnail?: {
          url: string;
        };
        small?: {
          url: string;
        };
      };
    }>;
  }>;
  totalPrice: number;
  shippingPrice: number;
  shippingType: string;
  comment?: string;
  address?: {
    id: number;
    type: string;
    title: string;
    street: string;
    building: string;
    apartment?: string;
    floor?: number;
    entrance?: string;
  };
  organization?: {
    id: number;
    name: string;
    inn: string;
    position?: string;
    comments?: string;
  };
  user: {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  createdAt: string;
  updatedAt: string;
  receivedAt?: string;
}
```

## Endpoints

### Создание заказа
```http
POST /api/orders
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "items": [
    {
      "id": 37,
      "quantity": 2
    }
  ],
  "totalPrice": 54,
  "shippingPrice": 500,
  "shippingType": "delivery",
  "comment": "Позвонить перед доставкой",
  "address": 1,
  "organization": 1
}
```

**Response 200:**
```json
{
  "id": 1,
  "status": "pending",
  "items": [
    {
      "id": 37,
      "Title": "Перчатки одноразовые ПЭ размер L",
      "Price": "27",
      "quantity": 2,
      "CountType": "уп",
      "Article": "402-779",
      "Gallery": [
        {
          "id": 88,
          "url": "/uploads/perchatki_odnorazovye_b84ebfc5a3.jpg",
          "formats": {
            "thumbnail": {
              "url": "/uploads/thumbnail_perchatki_odnorazovye_b84ebfc5a3.jpg"
            },
            "small": {
              "url": "/uploads/small_perchatki_odnorazovye_b84ebfc5a3.jpg"
            }
          }
        }
      ]
    }
  ],
  "totalPrice": 54,
  "shippingPrice": 500,
  "shippingType": "delivery",
  "comment": "Позвонить перед доставкой",
  "address": {
    "id": 1,
    "type": "home",
    "title": "Дом",
    "street": "ул. Примерная",
    "building": "123",
    "apartment": "45"
  },
  "createdAt": "2025-02-27T01:43:28.000Z"
}
```

### История заказов
```http
GET /api/orders/history
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response 200:**
```json
[
  {
    "id": 2,
    "status": "completed",
    "items": [
      {
        "id": 37,
        "Title": "Перчатки одноразовые ПЭ размер L",
        "Price": "27",
        "quantity": 2,
        "CountType": "уп",
        "Article": "402-779",
        "Gallery": [
          {
            "id": 88,
            "url": "/uploads/perchatki_odnorazovye_b84ebfc5a3.jpg",
            "formats": {
              "thumbnail": {
                "url": "/uploads/thumbnail_perchatki_odnorazovye_b84ebfc5a3.jpg"
              },
              "small": {
                "url": "/uploads/small_perchatki_odnorazovye_b84ebfc5a3.jpg"
              }
            }
          }
        ]
      }
    ],
    "totalPrice": 54,
    "shippingPrice": 500,
    "shippingType": "delivery",
    "address": {
      "id": 1,
      "type": "home",
      "title": "Дом",
      "street": "ул. Примерная",
      "building": "123"
    },
    "createdAt": "2025-02-27T01:43:28.000Z",
    "receivedAt": "2025-02-27T02:15:00.000Z"
  }
]
```

### Повторить заказ
```http
POST /api/orders/:id/repeat
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response 200:**
```json
{
  "id": 3,
  "status": "pending",
  "items": [
    {
      "id": 37,
      "Title": "Перчатки одноразовые ПЭ размер L",
      "Price": "27",
      "quantity": 2,
      "CountType": "уп",
      "Article": "402-779",
      "Gallery": [
        {
          "id": 88,
          "url": "/uploads/perchatki_odnorazovye_b84ebfc5a3.jpg",
          "formats": {
            "thumbnail": {
              "url": "/uploads/thumbnail_perchatki_odnorazovye_b84ebfc5a3.jpg"
            },
            "small": {
              "url": "/uploads/small_perchatki_odnorazovye_b84ebfc5a3.jpg"
            }
          }
        }
      ]
    }
  ],
  "totalPrice": 54,
  "shippingPrice": 500,
  "shippingType": "delivery",
  "address": {
    "id": 1,
    "type": "home",
    "title": "Дом",
    "street": "ул. Примерная",
    "building": "123"
  },
  "createdAt": "2025-02-27T01:43:28.000Z"
}
```

### Отметить заказ как полученный
```http
POST /api/orders/:id/received
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response 200:**
```json
{
  "id": 1,
  "status": "completed",
  "items": [
    {
      "id": 37,
      "Title": "Перчатки одноразовые ПЭ размер L",
      "Price": "27",
      "quantity": 2,
      "CountType": "уп",
      "Article": "402-779",
      "Gallery": [
        {
          "id": 88,
          "url": "/uploads/perchatki_odnorazovye_b84ebfc5a3.jpg",
          "formats": {
            "thumbnail": {
              "url": "/uploads/thumbnail_perchatki_odnorazovye_b84ebfc5a3.jpg"
            },
            "small": {
              "url": "/uploads/small_perchatki_odnorazovye_b84ebfc5a3.jpg"
            }
          }
        }
      ]
    }
  ],
  "totalPrice": 54,
  "shippingPrice": 500,
  "shippingType": "delivery",
  "address": {
    "id": 1,
    "type": "home",
    "title": "Дом",
    "street": "ул. Примерная",
    "building": "123"
  },
  "receivedAt": "2025-02-27T01:45:25.000Z",
  "createdAt": "2025-02-27T01:43:28.000Z"
}
```

## Примеры использования SDK

```javascript
class OrdersAPI {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  // Создание заказа
  async createOrder({
    items,
    totalPrice,
    shippingPrice,
    shippingType,
    address,
    organization,
    comment
  }) {
    const response = await fetch(`${this.baseUrl}/api/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items,
        totalPrice,
        shippingPrice,
        shippingType,
        address,
        organization,
        comment
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return response.json();
  }

  // Получение истории заказов
  async getOrderHistory() {
    const response = await fetch(`${this.baseUrl}/api/orders/history`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order history');
    }

    return response.json();
  }

  // Повторение заказа
  async repeatOrder(orderId) {
    const response = await fetch(`${this.baseUrl}/api/orders/${orderId}/repeat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to repeat order');
    }

    return response.json();
  }

  // Отметить заказ как полученный
  async markAsReceived(orderId) {
    const response = await fetch(`${this.baseUrl}/api/orders/${orderId}/received`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to mark order as received');
    }

    return response.json();
  }
}
```

### Примеры использования API

```javascript
// Создание заказа
const newOrder = await ordersAPI.createOrder({
  items: [{
    id: 37,
    quantity: 2
  }],
  totalPrice: 54,
  shippingPrice: 500,
  shippingType: "delivery",
  address: 1
});

// Получаем ID последнего заказа из истории и повторяем его
const repeatedOrder = await ordersAPI.repeatOrder(1);

// Отмечаем заказ как полученный
const receivedOrder = await ordersAPI.markAsReceived(1);
```

### Создание заказа с помощью curl:
```bash
curl -X POST "http://localhost:1337/api/orders" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "id": 37,
        "quantity": 2
      }
    ],
    "totalPrice": 54,
    "shippingPrice": 500,
    "shippingType": "delivery",
    "address": 1
  }'
```

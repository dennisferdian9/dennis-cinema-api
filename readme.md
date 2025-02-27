# 🎬 Cinema API 

## 📦 Installation

1. **Clone the repository**
```sh
git clone https://github.com/your-username/cinema-api.git
cd cinema-api
```

2. **Install Dependencies**
```sh
npm install
```

3. **Create .env files**
```sh
MYSQL_DATABASE=databasename
MYSQL_USER=username
MYSQL_PASSWORD=password
MYSQL_PORT=3306
MYSQL_HOST=localhost
```

4. **Run Migration**
```sh
npx sequelize-cli db:migrate
```
  
5. **Run Apps**
```sh
npm start
```

## API Lists

### Films API Table
| Method | Endpoint         | Description                |
|--------|-----------------|----------------------------|
| **POST**   | `/film`      | Create a new film         |
| **GET**    | `/film`      | Get all films (paginated) |
| **GET**    | `/film/:id`  | Get film by ID            |
| **PATCH**  | `/film/:id`  | Update a film (partial)   |
| **DELETE** | `/film/:id`  | Delete a film             |

Request Body (POST|PATCH /film)
```
{
  "title": string,
  "genre": string,
  "release_date": date,
  "studio_id": studio_id
}
```
Query Parameters (GET /film)
  - limit (integer, optional): Number of results per page.
  - cursor (integer, optional): ID to start pagination from.

### Showtimes API Table
| Method   | Endpoint            | Description                  |
|----------|----------------------|------------------------------|
| **POST**   | `/showtime`     | Create a new showtime       |
| **GET**    | `/showtime`     | Get all showtimes (paginated) |
| **GET**    | `/showtime/:id` | Get showtime by ID          |
| **PATCH**  | `/showtime/:id` | Update a showtime (partial) |
| **DELETE** | `/showtime/:id` | Delete a showtime           |

Request Body (POST|PATCH /showtime)
```
{
  "film_id": film_id,
  "start_time": date,
  "end_time": date
}
```

Query Parameters (GET /showtime)
  - limit (integer, optional): Number of results per page.
  - cursor (integer, optional): ID to start pagination from.

### Studios API Table
| Method   | Endpoint        | Description                |
|----------|----------------|----------------------------|
| **POST**   | `/studio`  | Create a new studio       |
| **GET**    | `/studio`  | Get all studios (paginated) |
| **GET**    | `/studio/:id`  | Get studio by ID            |
| **PATCH**  | `/studio/:id`  | Update a studio (partial)   |
| **DELETE** | `/studio/:id`  | Delete a studio             |

Request Body (POST|PATCH /ticket)
```
{
  "name": string,
  "location": string
}
```

Query Parameters (GET /studio)
  - limit (integer, optional): Number of results per page.
  - cursor (integer, optional): ID to start pagination from.

## Ticket API Table
| Method   | Endpoint        | Description               |
|----------|----------------|---------------------------|
| **POST**   | `/ticket`  | Create a new ticket      |
| **GET**    | `/ticket`  | Get all tickets (paginated) |
| **GET**    | `/ticket/:id`  | Get ticket by ID            |
| **PATCH**  | `/ticket/:id`  | Update a ticket (partial)   |
| **DELETE** | `/ticket/:id`  | Delete a ticket             |

Request Body (POST|PATCH /showtime)
```
{
  "showtime_id": showtime_id,
  "seat_number": string,
  "price": number
}
```

Query Parameters (GET /ticket)
  - limit (integer, optional): Number of results per page.
  - cursor (integer, optional): ID to start pagination from.

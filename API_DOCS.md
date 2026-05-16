# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### 1. Register a User
- **URL:** `/auth/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "admin" // or "sales"
  }
  ```
- **Response (201):**
  ```json
  {
    "success": true,
    "message": "Registered successfully",
    "data": { "user": { ... }, "token": "jwt_token_string" }
  }
  ```

### 2. Login a User
- **URL:** `/auth/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": { "user": { ... }, "token": "jwt_token_string" }
  }
  ```

### 3. Get Current User Profile
- **URL:** `/auth/me`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200):**
  ```json
  {
    "success": true,
    "data": { "_id": "...", "name": "John Doe", "role": "admin" }
  }
  ```

---

## Leads Management

**Note:** All lead endpoints require the `Authorization: Bearer <token>` header.

### 4. Get All Leads (Paginated, Searchable, Filterable)
- **URL:** `/leads`
- **Method:** `GET`
- **Query Params:**
  - `page` (optional, default: 1)
  - `limit` (optional, default: 10)
  - `search` (optional)
  - `status` (optional, values: New, Contacted, Qualified, Lost)
  - `source` (optional, values: Website, Instagram, Referral)
  - `sort` (optional, values: latest, oldest)
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Leads fetched successfully",
    "data": [
      {
        "_id": "60d0fe4f5311236168a109ca",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "status": "Qualified",
        "source": "Website",
        "createdBy": "...",
        "createdAt": "2024-05-16T10:00:00.000Z"
      }
    ],
    "meta": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "totalPages": 5
    }
  }
  ```

### 5. Get Single Lead
- **URL:** `/leads/:id`
- **Method:** `GET`
- **Response (200):**
  ```json
  {
    "success": true,
    "data": { ...leadObject }
  }
  ```

### 6. Create a Lead
- **URL:** `/leads`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "Alex Smith",
    "email": "alex@example.com",
    "status": "New",
    "source": "Instagram"
  }
  ```
- **Response (201):**
  ```json
  {
    "success": true,
    "message": "Lead created successfully",
    "data": { ...leadObject }
  }
  ```

### 7. Update a Lead
- **URL:** `/leads/:id`
- **Method:** `PUT`
- **Body:** (Any fields to update)
  ```json
  {
    "status": "Contacted"
  }
  ```
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Lead updated successfully",
    "data": { ...leadObject }
  }
  ```

### 8. Delete a Lead (Admin Only)
- **URL:** `/leads/:id`
- **Method:** `DELETE`
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Lead deleted successfully"
  }
  ```

### 9. Export Leads to CSV (Admin Only)
- **URL:** `/leads/export/csv`
- **Method:** `GET`
- **Response:** Sends a file download with Content-Type `text/csv`.

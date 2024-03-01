# Users

## **DELETE api/users/:id**

Deletes the specified user.

- **URL Params**  
  _Required:_ `id: int`
  _Required:_ `full: bool`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
  - **Code:** 204
- **Error Response:**
  - **Code:** 404  
    **Content:** `{ error : "User doesn't exist" }`

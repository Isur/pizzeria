# API
**Add ingredient**
----
  Returns json data about new Ingredient.

* **URL**

  /ingredients/add

* **Method:**

  `POST`

*  **URL Params**

   None

* **Data Params**

  **Required:**

   `name=[String]`

   `quantity=[Number]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
```json
    {
     "success": true,
     "data": {
        "_id": "5c26a8c05cf5ec10b237e49f",
        "name": "Name",
        "quantity": 1,
        "__v": 0
     }
    }
```

* **Error Response:**

  * **Code:** 500 <br />
    **Content:**
```json
    {
        "success" : false,
        "message": "Item already exists!"
    }
```


* **Sample Call:**

// TODO: Examle axios call.

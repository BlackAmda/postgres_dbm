# **Postgres-DbM** - A Postgres SQL DB Manager

This project is based on Javascript.

_Coded by: [Black Amda](https://github.com/BlackAmda)_

_If you need to use this package you need to get an access key from the developer. [WhatsApp Me](https://wa.me/94757405652)_

## Installation
```
npm i postgres_dbm
```

## Usage
```js
const { dbM } = require('postgres_dbm')

const db_pool = new dbM({
    db: 'DATABASE_URL', // Example: postgresql://..........
    key: 'YOUR_KEY' // If you need to use this package you need to get an access key from the developer. https://wa.me/94757405652
})
```

## Methods

### db_pool.insert()
Code:
```js
await db_pool.insert('DATA_TYPE', 'DATA');
```

### db_pool.get()

Result:
Code:
```js
const data = await db_pool.get('DATA_TYPE')
console.log(data);
```

```
DATA
```

## License
This project is protected by the `GNU General Public License v3.0.`
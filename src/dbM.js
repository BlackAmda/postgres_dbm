const { Pool } = require('pg');

class NotPostgresDB extends Error {
    constructor() { super('Need a Postgres database connection!'); }
}

class NeedDataType extends Error {
    constructor() { super('No data type given!'); }
}

class NeedData extends Error {
    constructor() { super('Please give data to insert!'); }
}

class DBPool {
    constructor(db) {
        this.database = db;
    }

    dbConfig() {
        const isValidDB = this.database && (this.database.includes('postgres://') || this.database.includes('postgresql://'));
        if (!isValidDB) {
            throw new NotPostgresDB();
        }
        const proConfig = {
            connectionString: this.database,
            ssl: { rejectUnauthorized: false },
        };
        return { DB_CONN: proConfig };
    }
}

class DBM extends DBPool {
    constructor({ db }) {
        super(db);
    }

    async createTable() {
        const text = 'CREATE TABLE IF NOT EXISTS data_table(type text, data text, PRIMARY KEY (type))';
        await this.query(text);
    }

    async insert(type, data) {
        if (!type) {
            throw new NeedDataType();
        }
        if (!data) {
            throw new NeedData();
        }
        await this.createTable();
        const queryText = 'INSERT INTO data_table (type, data) VALUES ($1, $2) ON CONFLICT (type) DO UPDATE SET data = EXCLUDED.data';
        const values = [type, data];
        return await this.query(queryText, values);
    }

    async get(type) {
        if (!type) {
            throw new NeedDataType();
        }
        await this.createTable();
        const queryText = 'SELECT data FROM data_table WHERE type = $1';
        const values = [type];
        const result = await this.query(queryText, values);
        if (result.rowCount) {
            return result.rows[0].data;
        }
        return [];
    }

    async query(text, params) {
        const pool = new Pool(this.dbConfig().DB_CONN);
        const result = await pool.query(text, params);
        await pool.end();
        return result;
    }
}

module.exports = { DBM };
class Connect {
    static getInstance() {
        if (!Connect.instance) {
            Connect.instance = new Connect();
        }
        return Connect.instance;
    }

    constructor() {
        this.mysql = require('mysql');
        this.connection = this.mysql.createConnection({
            user: 'csc648',
            password: 'csc648',
            port: '3306',
            database: 'csc648'
        });
        this.connection.connect();
    }

    select(sql) {
        return this._operation(sql);
    }

    _operation(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (error, result, fields) => {
                if (error) {
                    console.log(error.message);
                    reject(error.message);
                } else {
                    resolve(result);
                }
            });
        })
    }
}

module.exports = Connect.getInstance();
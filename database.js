const mysql = require('mysql');

const connection = mysql.createConnection({
  host:     'localhost',
  user:     'root',
  password: '',
  database: 'sekolah',
})

connection.connect(function(error){
    if (!!error) {
        console.log(error);
    } else {
        console.log('Koneksi Berhasil');
    }
})

module.exports = connection;

// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    //     if (err) throw err
      
    //     console.log('The solution is: ', rows[0].solution)
    //   })
      
    //   connection.end()
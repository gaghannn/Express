const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
var connection = require('./database');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (req, res) => {
    connection.query('SELECT * FROM siswa', function(err, rows){
        if(err){
            req.render('index', {
                data:''
            });
        }
        else{
            res.render('index',{
                data: rows
            });
        }
    })
})

app.get('/insert', (req, res) => {
    res.render('form',{
        nis: '',
        nama: '',
        kelas: '',

        form: 'simpan',
        tombol: 'Simpan',
    });
})

app.post('/simpan', function (req, res, next){
    const nis = req.body.nis;
    const nama = req.body.nama;
    const kelas = req.body.kelas;
  
    const data= {
      nis: nis,
      nama: nama,
      kelas: kelas,
  
    }
    connection.query('INSERT into siswa SET ?',
    data, function(err, result) {
      if (err) {
        res.render('/insert', {
          nis: nis,
          nama: nama,
          kelas: kelas,
        })
      }else {
        res.redirect('/')
      }
    })
  })

app.get('/edit/:nis', (req, res) => {
  const nis = req.params.nis;
  connection.query(`SELECT * FROM siswa WHERE nis = ?`, [nis], function (err, data) {
      if (err) {
          res.render('/'); 
      } else {
          if (data.length > 0) {
              const student = data[0];
              res.render('form', {
                  nis: student.nis,
                  nama: student.nama,
                  kelas: student.kelas,
                  form: '/ubah',
                  tombol: 'ubah'
              });
          } else {
              res.render('/'); 
          }
      }
  });
});

app.post('/ubah', (req, res) => {
  const { nis, nama, kelas } = req.body;
  connection.query(
      `UPDATE siswa SET nama = ?, kelas = ? WHERE nis = ?`,
      [nama, kelas, nis],
      function (err, data) {
          if (err) {
              res.render('form', {
                  nis: nis,
                  nama: nama,
                  kelas: kelas,
                  form: '/ubah',
                  tombol: 'ubah',
                  error: 'Error updating data' 
              });
          } else {
              res.redirect('/');
          }
      }
  );
});

app.get('/delete/:nis', (req, res) => {
    const nis = req.params.nis;
    connection.query(`DELETE FROM siswa WHERE nis = '${nis}'`, function (err, data) {
        if (err) {
            res.render('/');
        } else {
            res.redirect('/');
        }
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
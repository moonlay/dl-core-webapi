require("should");
const host = `${process.env.IP}:${process.env.PORT}`;
var Request = require("supertest");
var ObjectId = require("mongodb").ObjectId;

var request = Request(host);
var jwt;

it(`#01. should error when upload invalid file`, function (done) {
    request
        .post('/v1/master/upload-products')
        .field('Kode Barang', 'Nama Barang','Satuan','Mata Uang','Harga','Keterangan')
        .attach('fileUpload', "test/files/Master Barang - Invalid.csv")
        .end(function (err, response) {
            if (err)
                done(err);
            else {
                var result= response.header;
                result.should.have.property("content-type");
                result.should.have.property("date"); 
                done();
            }
        });
});

it(`#02. should succes when upload valid file`, function (done) {
    request
        .post('/v1/master/upload-products')
        .field('Kode Barang', 'Nama Barang','Satuan','Mata Uang','Harga','Keterangan')
        .attach('fileUpload', "test/files/Master Barang - Valid.csv")
        .end(function (err, response) {
            if (err)
                done(err);
            else { 
                done();
            }
        });
});
var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../db");
var UnitReceiptNoteManager = require("dl-module").managers.purchasing.UnitReceiptNoteManager;
var resultFormatter = require("../../../result-formatter");
const apiVersion = '1.0.0';
var passport = require('../../../passports/jwt-passport');


router.get('/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new UnitReceiptNoteManager(db, request.user);

        var id = request.params.id;
        manager.pdf(id)
            .then(docBinary => {
                var base64 = 'data:application/pdf;base64,' + docBinary.toString('base64')
                response.writeHead(200, {
                    'Content-Type': 'application/pdf',
                    // 'Content-Disposition': 'attachment; filename=some_file.pdf',
                    'Content-Length': docBinary.length
                });
                response.end(docBinary);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })
    })
});

module.exports = router
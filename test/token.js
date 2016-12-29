require("should");
var Account = require("dl-module").test.data.auth.account;

function getToken(request) {
    return Account.getTestData()
        .then((account) => {
            return new Promise((resolve, reject) => { 
                request
                    .post("/authenticate")
                    .send({
                        username: account.username,
                        password: "Standar123"
                    })
                    .expect(200)
                    .end(function (err, response) {
                        if (err)
                            reject(err);
                        else {
                            var result = response.body; 
                            resolve(result.data);
                        }
                    });
            })
        });
}


module.exports = getToken;

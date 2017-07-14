 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/contacts",
     model: require("dl-models").master.Contact,
     validate: require("dl-models").validator.master.contact,
     util: require("dl-module").test.data.master.contact,
     keyword: "code"
 });
 
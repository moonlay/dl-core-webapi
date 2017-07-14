 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/companies",
     model: require("dl-models").master.Company,
     validate: require("dl-models").validator.master.company,
     util: require("dl-module").test.data.master.company,
     keyword: "code"
 });
 
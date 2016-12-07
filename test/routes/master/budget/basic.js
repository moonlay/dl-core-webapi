 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/budgets",
     model: require("dl-models").master.Budget,
     validate: require("dl-models").validator.master.budget,
     util: require("dl-module").test.data.master.budget,
     keyword: "code"
 });
 
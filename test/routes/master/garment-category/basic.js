 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/garment-categories",
     model: require("dl-models").master.Category,
     validate: require("dl-models").validator.master.category,
     util: require("dl-module").test.data.master.category,
     keyword: "code"
 });
 
 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/lamp-standards",
     model: require("dl-models").master.LampStandard,
     validate: require("dl-models").validator.master.lampStandard,
     util: require("dl-module").test.data.master.lampStandard,
     keyword: null
 });
 
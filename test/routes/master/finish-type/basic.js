 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/finish-types",
     model: require("dl-models").master.FinishType,
     validate: require("dl-models").validator.master.finishType,
     util: require("dl-module").test.data.master.finishType,
     keyword: "code"
 });
 
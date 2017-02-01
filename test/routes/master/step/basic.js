 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/steps",
     model: require("dl-models").master.Step,
     validate: require("dl-models").validator.master.step,
     util: require("dl-module").test.data.master.step,
     keyword: "process"
 });
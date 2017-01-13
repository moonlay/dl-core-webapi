 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/process-types",
     model: require("dl-models").master.ProcessType,
     validate: require("dl-models").validator.master.processType,
     util: require("dl-module").test.data.master.processType,
     keyword: "code"
 });
 
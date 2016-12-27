 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/machines",
     model: require("dl-models").master.Machine,
     validate: require("dl-models").validator.master.machine,
     util: require("dl-module").test.data.master.machine,
     keyword: "code"
 });
 
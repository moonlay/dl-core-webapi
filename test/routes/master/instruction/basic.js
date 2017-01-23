 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/instructions",
     model: require("dl-models").master.Instruction,
     validate: require("dl-models").validator.master.instruction,
     util: require("dl-module").test.data.master.instruction,
     keyword: "process"
 });
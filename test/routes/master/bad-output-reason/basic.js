 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/bad-output-reasons",
     model: require("dl-models").master.BadOutputReason,
     validate: require("dl-models").validator.master.badOutputReason,
     util: require("dl-module").test.data.master.badOutputReason,
     keyword: "code"
 });
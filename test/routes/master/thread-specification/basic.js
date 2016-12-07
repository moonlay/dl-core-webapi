 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/thread-specifications",
     model: require("dl-models").master.ThreadSpecification,
     validate: require("dl-models").validator.master.threadSpecification,
     util: require("dl-module").test.data.master.threadSpecification,
     keyword: null
 });
 
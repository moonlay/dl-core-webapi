 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/spinning-yarns",
     model: require("dl-models").master.SpinningYarn,
     validate: require("dl-models").validator.master.spinningYarn,
     util: require("dl-module").test.data.master.SpinningYarn,
     keyword: null
 });
 
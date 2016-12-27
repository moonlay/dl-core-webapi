 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/lots",
     model: require("dl-models").master.LotMachine,
     validate: require("dl-models").validator.master.lotMachine,
     util: require("dl-module").test.data.master.lotMachine,
     keyword: null
 });
 
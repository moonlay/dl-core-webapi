 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/production-lots",
     model: require("dl-models").master.SpinningProductionLot,
     validate: require("dl-models").validator.master.spinningProductionLot,
     util: require("dl-module").test.data.master.spinningProductionLot,
     keyword: null
 });
 
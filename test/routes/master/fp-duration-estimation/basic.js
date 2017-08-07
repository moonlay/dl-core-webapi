 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/fp-duration-estimations",
     model: require("dl-models").master.FinishingPrintingDurationEstimation,
     validate: require("dl-models").validator.master.finishingPrintingDurationEstimation,
     util: require("dl-module").test.data.master.fpDurationEstimation,
     keyword: null
 });
 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/deal-tracking-reasons",
     model: require("dl-models").master.DealTrackingReason,
     validate: require("dl-models").validator.master.dealTrackingReason,
     util: require("dl-module").test.data.master.dealTrackingReason,
     keyword: "code"
 });
 
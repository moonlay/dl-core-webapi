 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/uoms",
     model: require("dl-models").master.Uom,
     validate: require("dl-models").validator.master.uom,
     util: require("dl-module").test.data.master.uom,
     keyword: "unit"
 });
 
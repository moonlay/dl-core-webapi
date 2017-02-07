 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/color-types",
     model: require("dl-models").master.ColorType,
     validate: require("dl-models").validator.master.colorType,
     util: require("dl-module").test.data.master.colorType,
     keyword: "code"
 });
 
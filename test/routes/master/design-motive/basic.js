 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/design-motivess",
     model: require("dl-models").master.DesignMotive,
     validate: require("dl-models").validator.master.designMotive,
     util: require("dl-module").test.data.master.designMotive,
     keyword: "code"
 });
 
 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/yarn-materials",
     model: require("dl-models").master.YarnMaterial,
     validate: require("dl-models").validator.master.yarnMaterial,
     util: require("dl-module").test.data.master.yarnMaterial,
     keyword: "code"
 });
 
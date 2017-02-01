 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/material-constructions",
     model: require("dl-models").master.MaterialConstruction,
     validate: require("dl-models").validator.master.materialConstruction,
     util: require("dl-module").test.data.master.materialConstruction,
     keyword: "code"
 });
 
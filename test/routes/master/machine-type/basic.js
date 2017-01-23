 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/machine-types",
     model: require("dl-models").master.MachineType,
     validate: require("dl-models").validator.master.machineType,
     util: require("dl-module").test.data.master.machineType,
     
     keyword: "code"
 });
 
 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/monitoring-event-types",
     model: require("dl-models").master.MonitoringEventType,
     validate: require("dl-models").validator.master.monitoringEventType,
     util: require("dl-module").test.data.master.monitoringEventType,
     keyword: "code"
 });
 
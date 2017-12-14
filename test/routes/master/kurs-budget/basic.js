var basicTest = require("../../basic-test-factory");
basicTest({
    uri: "/master/kurs-budgets",
    model: require("dl-models").master.KursBudget,
    validate: require("dl-models").validator.master.kursBudget,
    util: require("dl-module").test.data.master.kursBudget,
    keyword: "code"
});

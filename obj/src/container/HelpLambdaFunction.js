"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const HelpServiceFactory_1 = require("../build/HelpServiceFactory");
class HelpLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("help", "Context help function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-help', 'controller', 'default', '*', '*'));
        this._factories.add(new HelpServiceFactory_1.HelpServiceFactory());
    }
}
exports.HelpLambdaFunction = HelpLambdaFunction;
exports.handler = new HelpLambdaFunction().getHandler();
//# sourceMappingURL=HelpLambdaFunction.js.map
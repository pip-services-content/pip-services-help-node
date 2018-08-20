"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const HelpServiceFactory_1 = require("../build/HelpServiceFactory");
class HelpProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("help", "Context help microservice");
        this._factories.add(new HelpServiceFactory_1.HelpServiceFactory);
    }
}
exports.HelpProcess = HelpProcess;
//# sourceMappingURL=HelpProcess.js.map
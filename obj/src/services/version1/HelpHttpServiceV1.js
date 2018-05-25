"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class HelpHttpServiceV1 extends pip_services_net_node_1.CommandableHttpService {
    constructor() {
        super('v1/help');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-help', 'controller', 'default', '*', '1.0'));
    }
}
exports.HelpHttpServiceV1 = HelpHttpServiceV1;
//# sourceMappingURL=HelpHttpServiceV1.js.map
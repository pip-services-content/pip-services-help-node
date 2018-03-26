"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class ChecklistItemV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('text', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('checked', pip_services_commons_node_2.TypeCode.Boolean);
    }
}
exports.ChecklistItemV1Schema = ChecklistItemV1Schema;
//# sourceMappingURL=ChecklistItemV1Schema.js.map
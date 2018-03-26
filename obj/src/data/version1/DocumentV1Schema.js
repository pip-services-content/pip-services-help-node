"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class DocumentV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('file_id', pip_services_commons_node_2.TypeCode.String);
        this.withRequiredProperty('file_name', pip_services_commons_node_2.TypeCode.String);
    }
}
exports.DocumentV1Schema = DocumentV1Schema;
//# sourceMappingURL=DocumentV1Schema.js.map
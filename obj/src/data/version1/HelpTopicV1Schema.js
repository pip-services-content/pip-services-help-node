"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class HelpTopicV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('parent_id', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('app', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('index', pip_services3_commons_node_2.TypeCode.Integer);
        this.withRequiredProperty('title', pip_services3_commons_node_2.TypeCode.Map);
        this.withOptionalProperty('popular', pip_services3_commons_node_2.TypeCode.Boolean);
        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}
exports.HelpTopicV1Schema = HelpTopicV1Schema;
//# sourceMappingURL=HelpTopicV1Schema.js.map
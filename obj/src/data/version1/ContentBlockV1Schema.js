"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const ChecklistItemV1Schema_1 = require("./ChecklistItemV1Schema");
const DocumentV1Schema_1 = require("./DocumentV1Schema");
class ContentBlockV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('type', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('text', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('checklist', new pip_services_commons_node_1.ArraySchema(new ChecklistItemV1Schema_1.ChecklistItemV1Schema()));
        this.withOptionalProperty('loc_name', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('lock_pos', null);
        this.withOptionalProperty('start', null); // TypeCode.DateTime);
        this.withOptionalProperty('end', null); // TypeCode.DateTime);
        this.withOptionalProperty('all_day', pip_services_commons_node_2.TypeCode.Boolean);
        this.withOptionalProperty('pic_ids', new pip_services_commons_node_1.ArraySchema(pip_services_commons_node_2.TypeCode.String));
        this.withOptionalProperty('docs', new pip_services_commons_node_1.ArraySchema(new DocumentV1Schema_1.DocumentV1Schema()));
        this.withOptionalProperty('custom', null);
    }
}
exports.ContentBlockV1Schema = ContentBlockV1Schema;
//# sourceMappingURL=ContentBlockV1Schema.js.map
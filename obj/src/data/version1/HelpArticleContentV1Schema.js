"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const ContentBlockV1Schema_1 = require("./ContentBlockV1Schema");
class HelpArticleContentV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('language', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('title', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('content', new pip_services3_commons_node_3.ArraySchema(new ContentBlockV1Schema_1.ContentBlockV1Schema()));
    }
}
exports.HelpArticleContentV1Schema = HelpArticleContentV1Schema;
//# sourceMappingURL=HelpArticleContentV1Schema.js.map
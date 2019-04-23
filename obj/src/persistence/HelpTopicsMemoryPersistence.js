"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_data_node_1 = require("pip-services3-data-node");
class HelpTopicsMemoryPersistence extends pip_services3_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let id = filter.getAsNullableString('id');
        let parentId = filter.getAsNullableString('parent_id');
        let app = filter.getAsNullableString('app');
        let popular = filter.getAsNullableBoolean('popular');
        return (item) => {
            if (id != null && id != item.id)
                return false;
            if (parentId != null && parentId != item.parent_id)
                return false;
            if (app != null && app != item.app)
                return false;
            if (popular != null && popular != item.popular)
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.HelpTopicsMemoryPersistence = HelpTopicsMemoryPersistence;
//# sourceMappingURL=HelpTopicsMemoryPersistence.js.map
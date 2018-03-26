"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class HelpArticlesMemoryPersistence extends pip_services_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
        let id = filter.getAsNullableString('id');
        let topicId = filter.getAsNullableString('topic_id');
        let app = filter.getAsNullableString('app');
        let version = filter.getAsNullableInteger('version');
        let status = filter.getAsNullableString('status');
        let tagsString = filter.get('tags');
        let tags = tagsString != null ? pip_services_commons_node_2.TagsProcessor.compressTags(tagsString) : null;
        return (item) => {
            if (id != null && id != item.id)
                return false;
            if (topicId != null && topicId != item.topic_id)
                return false;
            if (app != null && app != item.app)
                return false;
            if (version != null && (version < item.min_ver || version > item.max_ver))
                return false;
            if (status != null && status != item.status)
                return false;
            if (tags != null && !this.contains(item.all_tags, tags))
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    getOneRandom(correlationId, filter, callback) {
        super.getOneRandom(correlationId, this.composeFilter(filter), callback);
    }
}
exports.HelpArticlesMemoryPersistence = HelpArticlesMemoryPersistence;
//# sourceMappingURL=HelpArticlesMemoryPersistence.js.map
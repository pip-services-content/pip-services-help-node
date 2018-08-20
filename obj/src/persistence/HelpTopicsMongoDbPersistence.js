"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_mongodb_node_1 = require("pip-services-mongodb-node");
const HelpTopicMongoDbSchema_1 = require("./HelpTopicMongoDbSchema");
class HelpTopicsMongoDbPersistence extends pip_services_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('help_topics', HelpTopicMongoDbSchema_1.HelpTopicMongoDbSchema());
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
        let criteria = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let parentId = filter.getAsNullableString('parent_id');
        if (parentId != null)
            criteria.push({ parent_id: parentId });
        let app = filter.getAsNullableString('app');
        if (app != null)
            criteria.push({ app: app });
        let popular = filter.getAsNullableBoolean('popular');
        if (popular != null)
            criteria.push({ popular: popular });
        return criteria.length > 0 ? { $and: criteria } : {};
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, 'id', null, callback);
    }
}
exports.HelpTopicsMongoDbPersistence = HelpTopicsMongoDbPersistence;
//# sourceMappingURL=HelpTopicsMongoDbPersistence.js.map
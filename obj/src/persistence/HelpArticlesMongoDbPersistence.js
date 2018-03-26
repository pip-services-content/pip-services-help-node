"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const HelpArticleMongoDbSchema_1 = require("./HelpArticleMongoDbSchema");
class HelpArticlesMongoDbPersistence extends pip_services_oss_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('help_articles', HelpArticleMongoDbSchema_1.HelpArticleMongoDbSchema());
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
        let criteria = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let topicId = filter.getAsNullableString('topic_id');
        if (topicId != null)
            criteria.push({ topic_id: topicId });
        let app = filter.getAsNullableString('app');
        if (app != null)
            criteria.push({ app: app });
        let version = filter.getAsNullableInteger('version');
        if (version != null) {
            criteria.push({ min_ver: { $lte: version } });
            criteria.push({ max_ver: { $gte: version } });
        }
        let status = filter.getAsNullableString('status');
        if (status != null)
            criteria.push({ status: status });
        // Search by tags
        let tags = filter.getAsObject('tags');
        if (tags) {
            let searchTags = pip_services_commons_node_2.TagsProcessor.compressTags(tags);
            criteria.push({ all_tags: { $in: searchTags } });
        }
        return criteria.length > 0 ? { $and: criteria } : {};
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, 'topic_id, id', null, callback);
    }
    getOneRandom(correlationId, filter, callback) {
        super.getOneRandom(correlationId, this.composeFilter(filter), callback);
    }
}
exports.HelpArticlesMongoDbPersistence = HelpArticlesMongoDbPersistence;
//# sourceMappingURL=HelpArticlesMongoDbPersistence.js.map
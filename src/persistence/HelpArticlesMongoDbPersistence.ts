let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { TagsProcessor } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { HelpArticleV1 } from '../data/version1/HelpArticleV1';
import { IHelpArticlesPersistence } from './IHelpArticlesPersistence';
import { HelpArticleMongoDbSchema } from './HelpArticleMongoDbSchema';

export class HelpArticlesMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<HelpArticleV1, string> 
    implements IHelpArticlesPersistence {

    constructor() {
        super('help_articles', HelpArticleMongoDbSchema());
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

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
            let searchTags = TagsProcessor.compressTags([tags]);
            criteria.push({ all_tags: { $in: searchTags } });
        }

        return criteria.length > 0 ? { $and: criteria } : {};
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, 'topic_id, id', null, callback);
    }

    public getOneRandom(correlationId: string, filter: FilterParams,
        callback: (err: any, item: HelpArticleV1) => void): void {
        super.getOneRandom(correlationId, this.composeFilter(filter), callback);
    }

}

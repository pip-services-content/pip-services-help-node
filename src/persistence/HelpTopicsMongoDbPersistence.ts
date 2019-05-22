let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoosePersistence } from 'pip-services3-mongoose-node';

import { HelpTopicV1 } from '../data/version1/HelpTopicV1';
import { IHelpTopicsPersistence } from './IHelpTopicsPersistence';
import { HelpTopicMongooseSchema } from './HelpTopicMongooseSchema';

export class HelpTopicsMongoDbPersistence 
    extends IdentifiableMongoosePersistence<HelpTopicV1, string> 
    implements IHelpTopicsPersistence {

    constructor() {
        super('help_topics', HelpTopicMongooseSchema());
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

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

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, 'id', null, callback);
    }

}

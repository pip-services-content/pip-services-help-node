let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { MultiString } from 'pip-services3-commons-node';

import { HelpTopicV1 } from '../data/version1/HelpTopicV1';
import { IHelpTopicsPersistence } from './IHelpTopicsPersistence';

export class HelpTopicsMemoryPersistence 
    extends IdentifiableMemoryPersistence<HelpTopicV1, string> 
    implements IHelpTopicsPersistence {

    constructor() {
        super();
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        let id = filter.getAsNullableString('id');
        let parentId = filter.getAsNullableString('parent_id');
        let app = filter.getAsNullableString('app');
        let popular = filter.getAsNullableBoolean('popular');

        return (item: HelpTopicV1) => {
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

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<HelpTopicV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}

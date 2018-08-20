let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { AnyValueMap } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { MultiString } from 'pip-services-commons-node';
import { TagsProcessor } from 'pip-services-commons-node';

import { HelpArticleV1 } from '../data/version1/HelpArticleV1';
import { IHelpArticlesPersistence } from './IHelpArticlesPersistence';

export class HelpArticlesMemoryPersistence 
    extends IdentifiableMemoryPersistence<HelpArticleV1, string> 
    implements IHelpArticlesPersistence {

    constructor() {
        super();
    }

    private contains(array1: string[], array2: string[]): boolean {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        let id = filter.getAsNullableString('id');
        let topicId = filter.getAsNullableString('topic_id');
        let app = filter.getAsNullableString('app');
        let version = filter.getAsNullableInteger('version');
        let status = filter.getAsNullableString('status');
        let tagsString = filter.get('tags');
        let tags = tagsString != null ? TagsProcessor.compressTags([tagsString]) : null;

        return (item: HelpArticleV1) => {
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

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<HelpArticleV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public getOneRandom(correlationId: string, filter: FilterParams,
        callback: (err: any, item: HelpArticleV1) => void): void {
        super.getOneRandom(correlationId, this.composeFilter(filter), callback);
    }

}

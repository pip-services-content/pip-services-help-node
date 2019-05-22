import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { HelpTopicV1 } from '../data/version1/HelpTopicV1';
import { IHelpTopicsPersistence } from './IHelpTopicsPersistence';
export declare class HelpTopicsMemoryPersistence extends IdentifiableMemoryPersistence<HelpTopicV1, string> implements IHelpTopicsPersistence {
    constructor();
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<HelpTopicV1>) => void): void;
}

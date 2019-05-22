import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { IdentifiableMongoosePersistence } from 'pip-services3-mongoose-node';
import { HelpTopicV1 } from '../data/version1/HelpTopicV1';
import { IHelpTopicsPersistence } from './IHelpTopicsPersistence';
export declare class HelpTopicsMongoDbPersistence extends IdentifiableMongoosePersistence<HelpTopicV1, string> implements IHelpTopicsPersistence {
    constructor();
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
}

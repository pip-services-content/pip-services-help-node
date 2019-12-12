import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { HelpArticleV1 } from '../data/version1/HelpArticleV1';
import { IHelpArticlesPersistence } from './IHelpArticlesPersistence';
export declare class HelpArticlesMongoDbPersistence extends IdentifiableMongoDbPersistence<HelpArticleV1, string> implements IHelpArticlesPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
    getOneRandom(correlationId: string, filter: FilterParams, callback: (err: any, item: HelpArticleV1) => void): void;
}

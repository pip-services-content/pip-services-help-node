import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { HelpArticleV1 } from '../data/version1/HelpArticleV1';
import { IHelpArticlesPersistence } from './IHelpArticlesPersistence';
export declare class HelpArticlesMemoryPersistence extends IdentifiableMemoryPersistence<HelpArticleV1, string> implements IHelpArticlesPersistence {
    constructor();
    private contains(array1, array2);
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<HelpArticleV1>) => void): void;
    getOneRandom(correlationId: string, filter: FilterParams, callback: (err: any, item: HelpArticleV1) => void): void;
}

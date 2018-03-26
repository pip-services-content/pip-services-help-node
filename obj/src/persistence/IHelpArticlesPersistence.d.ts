import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IGetter } from 'pip-services-data-node';
import { IWriter } from 'pip-services-data-node';
import { HelpArticleV1 } from '../data/version1/HelpArticleV1';
export interface IHelpArticlesPersistence extends IGetter<HelpArticleV1, string>, IWriter<HelpArticleV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<HelpArticleV1>) => void): void;
    getOneRandom(correlationId: string, filter: FilterParams, callback: (err: any, item: HelpArticleV1) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: HelpArticleV1) => void): void;
    create(correlationId: string, item: HelpArticleV1, callback: (err: any, item: HelpArticleV1) => void): void;
    update(correlationId: string, item: HelpArticleV1, callback: (err: any, item: HelpArticleV1) => void): void;
    deleteById(correlationId: string, id: string, callback: (err: any, item: HelpArticleV1) => void): void;
}

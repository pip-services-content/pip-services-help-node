import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IGetter } from 'pip-services-data-node';
import { IWriter } from 'pip-services-data-node';

import { HelpTopicV1 } from '../data/version1/HelpTopicV1';

export interface IHelpTopicsPersistence
    extends IGetter<HelpTopicV1, string>, IWriter<HelpTopicV1, string>  {
    
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<HelpTopicV1>) => void): void;

    getOneById(correlationId: string, id: string,
        callback: (err: any, item: HelpTopicV1) => void): void;

    create(correlationId: string, item: HelpTopicV1,
        callback: (err: any, item: HelpTopicV1) => void): void;

    update(correlationId: string, item: HelpTopicV1,
        callback: (err: any, item: HelpTopicV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: HelpTopicV1) => void): void;
}


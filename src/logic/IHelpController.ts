import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';

import { HelpTopicV1 } from '../data/version1/HelpTopicV1';
import { HelpArticleV1 } from '../data/version1/HelpArticleV1';

export interface IHelpController {
    getTopics(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<HelpTopicV1>) => void): void;

    getTopicById(correlationId: string, topicId: string,
        callback: (err: any, topic: HelpTopicV1) => void): void;

    createTopic(correlationId: string, topic: HelpTopicV1,
        callback: (err: any, topic: HelpTopicV1) => void): void;

    updateTopic(correlationId: string, topic: HelpTopicV1,
        callback: (err: any, topic: HelpTopicV1) => void): void;

    deleteTopicById(correlationId: string, topicId: string,
        callback: (err: any, topic: HelpTopicV1) => void): void;

    getArticles(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<HelpArticleV1>) => void): void;

    getRandomArticle(correlationId: string, filter: FilterParams,
        callback: (err: any, article: HelpArticleV1) => void): void;

    getArticleById(correlationId: string, articleId: string,
        callback: (err: any, article: HelpArticleV1) => void): void;

    createArticle(correlationId: string, article: HelpArticleV1,
        callback: (err: any, article: HelpArticleV1) => void): void;

    updateArticle(correlationId: string, article: HelpArticleV1,
        callback: (err: any, article: HelpArticleV1) => void): void;

    deleteArticleById(correlationId: string, articleId: string,
        callback: (err: any, article: HelpArticleV1) => void): void;
}

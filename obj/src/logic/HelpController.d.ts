import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { HelpTopicV1 } from '../data/version1/HelpTopicV1';
import { HelpArticleV1 } from '../data/version1/HelpArticleV1';
import { IHelpController } from './IHelpController';
export declare class HelpController implements IConfigurable, IReferenceable, ICommandable, IHelpController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistenceTopics;
    private _persistenceArticles;
    private _attachmentsClient;
    private _attachmentsConnector;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getTopics(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<HelpTopicV1>) => void): void;
    getTopicById(correlationId: string, helpId: string, callback: (err: any, item: HelpTopicV1) => void): void;
    createTopic(correlationId: string, topic: HelpTopicV1, callback: (err: any, topic: HelpTopicV1) => void): void;
    updateTopic(correlationId: string, topic: HelpTopicV1, callback: (err: any, topic: HelpTopicV1) => void): void;
    deleteTopicById(correlationId: string, topicId: string, callback: (err: any, topic: HelpTopicV1) => void): void;
    getArticles(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<HelpArticleV1>) => void): void;
    getRandomArticle(correlationId: string, filter: FilterParams, callback: (err: any, article: HelpArticleV1) => void): void;
    getArticleById(correlationId: string, articleId: string, callback: (err: any, article: HelpArticleV1) => void): void;
    createArticle(correlationId: string, article: HelpArticleV1, callback: (err: any, article: HelpArticleV1) => void): void;
    updateArticle(correlationId: string, article: HelpArticleV1, callback: (err: any, article: HelpArticleV1) => void): void;
    deleteArticleById(correlationId: string, articleId: string, callback: (err: any, article: HelpArticleV1) => void): void;
}

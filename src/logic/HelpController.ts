let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { TagsProcessor } from 'pip-services-commons-node';
import { NotFoundException } from 'pip-services-commons-node';
import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';

import { HelpTopicV1 } from '../data/version1/HelpTopicV1';
import { HelpArticleV1 } from '../data/version1/HelpArticleV1';
import { IHelpTopicsPersistence } from '../persistence/IHelpTopicsPersistence';
import { IHelpArticlesPersistence } from '../persistence/IHelpArticlesPersistence';
import { IHelpController } from './IHelpController';
import { HelpCommandSet } from './HelpCommandSet';
import { AttachmentsConnector } from './AttachmentsConnector';

export class HelpController implements IConfigurable, IReferenceable, ICommandable, IHelpController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence-topics', 'pip-services-help:persistence-topics:*:*:1.0',
        'dependencies.persistence-articles', 'pip-services-help:persistence-articles:*:*:1.0',
        'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(HelpController._defaultConfig);
    private _persistenceTopics: IHelpTopicsPersistence;
    private _persistenceArticles: IHelpArticlesPersistence;
    private _attachmentsClient: IAttachmentsClientV1;
    private _attachmentsConnector: AttachmentsConnector;
    private _commandSet: HelpCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistenceTopics = this._dependencyResolver.getOneRequired<IHelpTopicsPersistence>('persistence-topics');
        this._persistenceArticles = this._dependencyResolver.getOneRequired<IHelpArticlesPersistence>('persistence-articles');

        this._attachmentsClient = this._dependencyResolver.getOneOptional<IAttachmentsClientV1>('attachments');
        this._attachmentsConnector = new AttachmentsConnector(this._attachmentsClient);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new HelpCommandSet(this);
        return this._commandSet;
    }

    public getTopics(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<HelpTopicV1>) => void): void {
        this._persistenceTopics.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getTopicById(correlationId: string, helpId: string,
        callback: (err: any, item: HelpTopicV1) => void): void {
        this._persistenceTopics.getOneById(correlationId, helpId, callback);
    }

    public createTopic(correlationId: string, topic: HelpTopicV1,
        callback: (err: any, topic: HelpTopicV1) => void): void {
        this._persistenceTopics.create(correlationId, topic, callback);
    }

    public updateTopic(correlationId: string, topic: HelpTopicV1,
        callback: (err: any, topic: HelpTopicV1) => void): void {
        this._persistenceTopics.update(correlationId, topic, callback);
    }

    public deleteTopicById(correlationId: string, topicId: string,
        callback: (err: any, topic: HelpTopicV1) => void): void {
        this._persistenceTopics.deleteById(correlationId, topicId, callback);
    }

    public getArticles(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<HelpArticleV1>) => void): void {
        this._persistenceArticles.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getRandomArticle(correlationId: string, filter: FilterParams, 
        callback: (err: any, article: HelpArticleV1) => void): void {
        this._persistenceArticles.getOneRandom(correlationId, filter, callback);
    }

    public getArticleById(correlationId: string, articleId: string,
        callback: (err: any, article: HelpArticleV1) => void): void {
        this._persistenceArticles.getOneById(correlationId, articleId, callback);
    }

    public createArticle(correlationId: string, article: HelpArticleV1,
        callback: (err: any, article: HelpArticleV1) => void): void {
        let newArticle: HelpArticleV1 = null;

        article.create_time = new Date();
        article.all_tags = TagsProcessor.extractHashTags(
            article, 
            'content'
        );

        async.series([
            (callback) => {
                this._persistenceArticles.create(correlationId, article, (err, data) => {
                    newArticle = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.addAttachments(correlationId, newArticle, callback);
            }
        ], (err) => {
            callback(err, newArticle);
        });
    }

    public updateArticle(correlationId: string, article: HelpArticleV1,
        callback: (err: any, article: HelpArticleV1) => void): void {
        let oldArticle: HelpArticleV1 = null;
        let newArticle: HelpArticleV1 = null;
        
        article.all_tags = TagsProcessor.extractHashTags(
            article, 
            'content'
        );

        async.series([
            (callback) => {
                this._persistenceArticles.getOneById(correlationId, article.id, (err, data) => {
                    oldArticle = data;
                    if (err == null && data == null) {
                        err = new NotFoundException(
                            correlationId,
                            'ARTICLE_NOT_FOUND',
                            'Help article ' + article.id + ' was not found'
                        ).withDetails('article_id', article.id);
                    }
                    callback(err);
                });
            },
            (callback) => {
                this._persistenceArticles.update(correlationId, article, (err, data) => {
                    newArticle = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.updateAttachments(
                    correlationId, oldArticle, newArticle, callback);
            }
        ], (err) => {
            callback(err, newArticle);
        });
    }

    public deleteArticleById(correlationId: string, articleId: string,
        callback: (err: any, article: HelpArticleV1) => void): void {
        let oldArticle: HelpArticleV1 = null;

        async.series([
            (callback) => {
                this._persistenceArticles.deleteById(correlationId, articleId, (err, data) => {
                    oldArticle = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.removeAttachments(correlationId, oldArticle, callback);
            }
        ], (err) => {
            callback(err, oldArticle);
        });
    }

}

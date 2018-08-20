"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const HelpCommandSet_1 = require("./HelpCommandSet");
const AttachmentsConnector_1 = require("./AttachmentsConnector");
class HelpController {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver(HelpController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistenceTopics = this._dependencyResolver.getOneRequired('persistence-topics');
        this._persistenceArticles = this._dependencyResolver.getOneRequired('persistence-articles');
        this._attachmentsClient = this._dependencyResolver.getOneOptional('attachments');
        this._attachmentsConnector = new AttachmentsConnector_1.AttachmentsConnector(this._attachmentsClient);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new HelpCommandSet_1.HelpCommandSet(this);
        return this._commandSet;
    }
    getTopics(correlationId, filter, paging, callback) {
        this._persistenceTopics.getPageByFilter(correlationId, filter, paging, callback);
    }
    getTopicById(correlationId, helpId, callback) {
        this._persistenceTopics.getOneById(correlationId, helpId, callback);
    }
    createTopic(correlationId, topic, callback) {
        this._persistenceTopics.create(correlationId, topic, callback);
    }
    updateTopic(correlationId, topic, callback) {
        this._persistenceTopics.update(correlationId, topic, callback);
    }
    deleteTopicById(correlationId, topicId, callback) {
        this._persistenceTopics.deleteById(correlationId, topicId, callback);
    }
    getArticles(correlationId, filter, paging, callback) {
        this._persistenceArticles.getPageByFilter(correlationId, filter, paging, callback);
    }
    getRandomArticle(correlationId, filter, callback) {
        this._persistenceArticles.getOneRandom(correlationId, filter, callback);
    }
    getArticleById(correlationId, articleId, callback) {
        this._persistenceArticles.getOneById(correlationId, articleId, callback);
    }
    createArticle(correlationId, article, callback) {
        let newArticle = null;
        article.create_time = new Date();
        article.all_tags = pip_services_commons_node_3.TagsProcessor.extractHashTags('#content');
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
    updateArticle(correlationId, article, callback) {
        let oldArticle = null;
        let newArticle = null;
        article.all_tags = pip_services_commons_node_3.TagsProcessor.extractHashTags('#content');
        async.series([
            (callback) => {
                this._persistenceArticles.getOneById(correlationId, article.id, (err, data) => {
                    oldArticle = data;
                    if (err == null && data == null) {
                        err = new pip_services_commons_node_4.NotFoundException(correlationId, 'ARTICLE_NOT_FOUND', 'Help article ' + article.id + ' was not found').withDetails('article_id', article.id);
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
                this._attachmentsConnector.updateAttachments(correlationId, oldArticle, newArticle, callback);
            }
        ], (err) => {
            callback(err, newArticle);
        });
    }
    deleteArticleById(correlationId, articleId, callback) {
        let oldArticle = null;
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
HelpController._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('dependencies.persistence-topics', 'pip-services-help:persistence-topics:*:*:1.0', 'dependencies.persistence-articles', 'pip-services-help:persistence-articles:*:*:1.0', 'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0');
exports.HelpController = HelpController;
//# sourceMappingURL=HelpController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_commons_node_6 = require("pip-services-commons-node");
const pip_services_commons_node_7 = require("pip-services-commons-node");
const pip_services_commons_node_8 = require("pip-services-commons-node");
const HelpTopicV1Schema_1 = require("../data/version1/HelpTopicV1Schema");
const HelpArticleV1Schema_1 = require("../data/version1/HelpArticleV1Schema");
class HelpCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetTopicsCommand());
        this.addCommand(this.makeGetTopicByIdCommand());
        this.addCommand(this.makeCreateTopicCommand());
        this.addCommand(this.makeUpdateTopicCommand());
        this.addCommand(this.makeDeleteTopicByIdCommand());
        this.addCommand(this.makeGetArticlesCommand());
        this.addCommand(this.makeGetRandomArticleCommand());
        this.addCommand(this.makeGetArticleByIdCommand());
        this.addCommand(this.makeCreateArticleCommand());
        this.addCommand(this.makeUpdateArticleCommand());
        this.addCommand(this.makeDeleteArticleByIdCommand());
    }
    makeGetTopicsCommand() {
        return new pip_services_commons_node_2.Command("get_topics", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getTopics(correlationId, filter, paging, callback);
        });
    }
    makeGetTopicByIdCommand() {
        return new pip_services_commons_node_2.Command("get_topic_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('topic_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let topicId = args.getAsNullableString("topic_id");
            this._logic.getTopicById(correlationId, topicId, callback);
        });
    }
    makeCreateTopicCommand() {
        return new pip_services_commons_node_2.Command("create_topic", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('topic', new HelpTopicV1Schema_1.HelpTopicV1Schema()), (correlationId, args, callback) => {
            let topic = args.get("topic");
            this._logic.createTopic(correlationId, topic, callback);
        });
    }
    makeUpdateTopicCommand() {
        return new pip_services_commons_node_2.Command("update_topic", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('topic', new HelpTopicV1Schema_1.HelpTopicV1Schema()), (correlationId, args, callback) => {
            let topic = args.get("topic");
            this._logic.updateTopic(correlationId, topic, callback);
        });
    }
    makeDeleteTopicByIdCommand() {
        return new pip_services_commons_node_2.Command("delete_topic_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('topic_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let topicId = args.getAsNullableString("topic_id");
            this._logic.deleteTopicById(correlationId, topicId, callback);
        });
    }
    makeGetArticlesCommand() {
        return new pip_services_commons_node_2.Command("get_articles", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getArticles(correlationId, filter, paging, callback);
        });
    }
    makeGetRandomArticleCommand() {
        return new pip_services_commons_node_2.Command("get_random_article", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            this._logic.getRandomArticle(correlationId, filter, callback);
        });
    }
    makeGetArticleByIdCommand() {
        return new pip_services_commons_node_2.Command("get_article_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('article_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let articleId = args.getAsNullableString("article_id");
            this._logic.getArticleById(correlationId, articleId, callback);
        });
    }
    makeCreateArticleCommand() {
        return new pip_services_commons_node_2.Command("create_article", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('article', new HelpArticleV1Schema_1.HelpArticleV1Schema()), (correlationId, args, callback) => {
            let article = args.get("article");
            this._logic.createArticle(correlationId, article, callback);
        });
    }
    makeUpdateArticleCommand() {
        return new pip_services_commons_node_2.Command("update_article", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('article', new HelpArticleV1Schema_1.HelpArticleV1Schema()), (correlationId, args, callback) => {
            let article = args.get("article");
            this._logic.updateArticle(correlationId, article, callback);
        });
    }
    makeDeleteArticleByIdCommand() {
        return new pip_services_commons_node_2.Command("delete_article_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('article_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let articleId = args.getAsNullableString("article_id");
            this._logic.deleteArticleById(correlationId, articleId, callback);
        });
    }
}
exports.HelpCommandSet = HelpCommandSet;
//# sourceMappingURL=HelpCommandSet.js.map
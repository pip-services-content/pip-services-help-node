import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';
import { FilterParamsSchema } from 'pip-services-commons-node';
import { PagingParamsSchema } from 'pip-services-commons-node';

import { HelpTopicV1 } from '../data/version1/HelpTopicV1';
import { HelpTopicV1Schema } from '../data/version1/HelpTopicV1Schema';
import { HelpArticleV1 } from '../data/version1/HelpArticleV1';
import { HelpArticleV1Schema } from '../data/version1/HelpArticleV1Schema';
import { IHelpController } from './IHelpController';

export class HelpCommandSet extends CommandSet {
    private _logic: IHelpController;

	constructor(logic: IHelpController) {
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

	private makeGetTopicsCommand(): ICommand {
		return new Command(
			"get_topics",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				this._logic.getTopics(correlationId, filter, paging, callback);
			}
		);
	}

	private makeGetTopicByIdCommand(): ICommand {
		return new Command(
			"get_topic_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('topic_id', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let topicId = args.getAsNullableString("topic_id");
				this._logic.getTopicById(correlationId, topicId, callback);
			}
		);
	}

	private makeCreateTopicCommand(): ICommand {
		return new Command(
			"create_topic",
			new ObjectSchema(true)
				.withRequiredProperty('topic', new HelpTopicV1Schema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let topic = args.get("topic");
				this._logic.createTopic(correlationId, topic, callback);
			}
		);
	}

	private makeUpdateTopicCommand(): ICommand {
		return new Command(
			"update_topic",
			new ObjectSchema(true)
				.withRequiredProperty('topic', new HelpTopicV1Schema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let topic = args.get("topic");
				this._logic.updateTopic(correlationId, topic, callback);
			}
		);
	}

	private makeDeleteTopicByIdCommand(): ICommand {
		return new Command(
			"delete_topic_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('topic_id', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let topicId = args.getAsNullableString("topic_id");
				this._logic.deleteTopicById(correlationId, topicId, callback);
			}
		);
	}

	private makeGetArticlesCommand(): ICommand {
		return new Command(
			"get_articles",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				this._logic.getArticles(correlationId, filter, paging, callback);
			}
		);
	}

	private makeGetRandomArticleCommand(): ICommand {
		return new Command(
			"get_random_article",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				this._logic.getRandomArticle(correlationId, filter, callback);
			}
		);
	}

	private makeGetArticleByIdCommand(): ICommand {
		return new Command(
			"get_article_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('article_id', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let articleId = args.getAsNullableString("article_id");
				this._logic.getArticleById(correlationId, articleId, callback);
			}
		);
	}

	private makeCreateArticleCommand(): ICommand {
		return new Command(
			"create_article",
			new ObjectSchema(true)
				.withRequiredProperty('article', new HelpArticleV1Schema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let article = args.get("article");
				this._logic.createArticle(correlationId, article, callback);
			}
		);
	}

	private makeUpdateArticleCommand(): ICommand {
		return new Command(
			"update_article",
			new ObjectSchema(true)
				.withRequiredProperty('article', new HelpArticleV1Schema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let article = args.get("article");
				this._logic.updateArticle(correlationId, article, callback);
			}
		);
	}

	private makeDeleteArticleByIdCommand(): ICommand {
		return new Command(
			"delete_article_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('article_id', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let articleId = args.getAsNullableString("article_id");
				this._logic.deleteArticleById(correlationId, articleId, callback);
			}
		);
	}	
}
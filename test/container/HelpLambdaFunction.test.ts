let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';

import { HelpTopicV1 } from '../../src/data/version1/HelpTopicV1';
import { HelpArticleV1 } from '../../src/data/version1/HelpArticleV1';
import { HelpTopicsMemoryPersistence } from '../../src/persistence/HelpTopicsMemoryPersistence';
import { HelpArticlesMemoryPersistence } from '../../src/persistence/HelpArticlesMemoryPersistence';
import { HelpController } from '../../src/logic/HelpController';
import { HelpLambdaFunction } from '../../src/container/HelpLambdaFunction';

let HELP_TOPIC1 = <HelpTopicV1>{
    id: '1',
    app: 'Test App 1',
    title: { en: 'Main topic' }
};
let HELP_TOPIC2 = <HelpTopicV1>{
    id: '2',
    parent_id: '1',
    app: 'Test App 1',
    title: { en: 'Subtopic 1' },
    popular: true
};

let HELP_ARTICLE1 = <HelpArticleV1>{
    id: '1',
    topic_id: '1',
    app: 'Test App 1',
    min_ver: 0,
    max_ver: 9999,
    status: 'new'
};
let HELP_ARTICLE2 = <HelpArticleV1>{
    id: '2',
    tags: ['TAG 1'],
    all_tags: ['tag1'],
    topic_id: '1',
    app: 'Test App 1',
    min_ver: 2,
    max_ver: 9999,
    status: 'new'
};

suite('HelpLambdaFunction', ()=> {
    let lambda: HelpLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services-commons:logger:console:default:1.0',
            'persistence-topics.descriptor', 'pip-services-help:persistence-topics:memory:default:1.0',
            'persistence-articles.descriptor', 'pip-services-help:persistence-articles:memory:default:1.0',
            'controller.descriptor', 'pip-services-help:controller:default:default:1.0'
        );

        lambda = new HelpLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('Topics CRUD Operations', (done) => {
        let topic1, topic2: HelpTopicV1;

        async.series([
        // Create one topic
            (callback) => {
                lambda.act(
                    {
                        role: 'help',
                        cmd: 'create_topic',
                        topic: HELP_TOPIC1
                    },
                    (err, topic) => {
                        assert.isNull(err);
                        
                        assert.isObject(topic);
                        assert.equal(topic.id, HELP_TOPIC1.id);
                        assert.equal(topic.app, HELP_TOPIC1.app);

                        topic1 = topic;

                        callback();
                    }
                );
            },
        // Create another topic
            (callback) => {
                lambda.act(
                    {
                        role: 'help',
                        cmd: 'create_topic',
                        topic: HELP_TOPIC2
                    },
                    (err, topic) => {
                        assert.isNull(err);
                        
                        assert.isObject(topic);
                        assert.equal(topic.id, HELP_TOPIC2.id);
                        assert.equal(topic.app, HELP_TOPIC2.app);

                        topic2 = topic;

                        callback();
                    }
                );
            },
        // Get all topics
            (callback) => {
                lambda.act(
                    {
                        role: 'help',
                        cmd: 'get_topics' 
                    },
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the topic
            (callback) => {
                topic1.app = 'New App 1';

                lambda.act(
                    {
                        role: 'help',
                        cmd: 'update_topic',
                        topic: topic1
                    },
                    (err, topic) => {
                        assert.isNull(err);
                        
                        assert.isObject(topic);
                        assert.equal(topic.app, 'New App 1');
                        assert.equal(topic.id, HELP_TOPIC1.id);

                        topic1 = topic;

                        callback();
                    }
                );
            },
        // Delete topic
            (callback) => {
                lambda.act(
                    {
                        role: 'help',
                        cmd: 'delete_topic_by_id',
                        topic_id: topic1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete topic
            (callback) => {
                lambda.act(
                    {
                        role: 'help',
                        cmd: 'get_topic_by_id',
                        topic_id: topic1.id
                    },
                    (err, topic) => {
                        assert.isNull(err);
                        
                        assert.isNull(topic || null);

                        callback();
                    }
                );
            }
        ], done);
    });

    test('Articles CRUD Operations', (done) => {
        let article1, article2: HelpArticleV1;

        async.series([
        // Create one article
            (callback) => {
                lambda.act(
                    {
                        role: 'help',
                        cmd: 'create_article',
                        article: HELP_ARTICLE1
                    },
                    (err, article) => {
                        assert.isNull(err);
                        
                        assert.isObject(article);
                        assert.equal(article.id, HELP_ARTICLE1.id);
                        assert.equal(article.app, HELP_ARTICLE1.app);

                        article1 = article;

                        callback();
                    }
                );
            },
        // Create another article
            (callback) => {
                lambda.act(
                    {
                        role: 'help',
                        cmd: 'create_article',
                        article: HELP_ARTICLE2
                    },
                    (err, article) => {
                        assert.isNull(err);
                        
                        assert.isObject(article);
                        assert.equal(article.id, HELP_ARTICLE2.id);
                        assert.equal(article.app, HELP_ARTICLE2.app);

                        article2 = article;

                        callback();
                    }
                );
            },
        // Get all articles
            (callback) => {
                lambda.act(
                    {
                        role: 'help',
                        cmd: 'get_articles' 
                    },
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the article
            (callback) => {
                article1.app = 'New App 1';

                lambda.act(
                    {
                        role: 'help',
                        cmd: 'update_article',
                        article: article1
                    },
                    (err, article) => {
                        assert.isNull(err);
                        
                        assert.isObject(article);
                        assert.equal(article.app, 'New App 1');
                        assert.equal(article.id, HELP_ARTICLE1.id);

                        article1 = article;

                        callback();
                    }
                );
            },
        // Delete article
            (callback) => {
                lambda.act(
                    {
                        role: 'help',
                        cmd: 'delete_article_by_id',
                        article_id: article1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete article
            (callback) => {
                lambda.act(
                    {
                        role: 'help',
                        cmd: 'get_article_by_id',
                        article_id: article1.id
                    },
                    (err, article) => {
                        assert.isNull(err);
                        
                        assert.isNull(article || null);

                        callback();
                    }
                );
            }
        ], done);
    });

});
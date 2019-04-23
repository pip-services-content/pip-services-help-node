let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { MultiString } from 'pip-services3-commons-node';

import { HelpTopicV1 } from '../../../src/data/version1/HelpTopicV1';
import { HelpArticleV1 } from '../../../src/data/version1/HelpArticleV1';
import { HelpTopicsMemoryPersistence } from '../../../src/persistence/HelpTopicsMemoryPersistence';
import { HelpArticlesMemoryPersistence } from '../../../src/persistence/HelpArticlesMemoryPersistence';
import { HelpController } from '../../../src/logic/HelpController';
import { HelpHttpServiceV1 } from '../../../src/services/version1/HelpHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let HELP_TOPIC1 = <HelpTopicV1>{
    id: '1',
    app: 'Test App 1',
    title: new MultiString({ en: 'Main topic' })
};
let HELP_TOPIC2 = <HelpTopicV1>{
    id: '2',
    parent_id: '1',
    app: 'Test App 1',
    title: new MultiString({ en: 'Subtopic 1' }),
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

suite('HelpHttpServiceV1', ()=> {
    let service: HelpHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let persistenceTopics = new HelpTopicsMemoryPersistence();
        let persistenceArticles = new HelpArticlesMemoryPersistence();
        let controller = new HelpController();

        service = new HelpHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-help', 'persistence-topics', 'memory', 'default', '1.0'), persistenceTopics,
            new Descriptor('pip-services-help', 'persistence-articles', 'memory', 'default', '1.0'), persistenceArticles,
            new Descriptor('pip-services-help', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-help', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('Topics CRUD Operations', (done) => {
        let topic1, topic2: HelpTopicV1;

        async.series([
        // Create one topic
            (callback) => {
                rest.post('/v1/help/create_topic',
                    {
                        topic: HELP_TOPIC1
                    },
                    (err, req, res, topic) => {
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
                rest.post('/v1/help/create_topic',
                    {
                        topic: HELP_TOPIC2
                    },
                    (err, req, res, topic) => {
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
                rest.post('/v1/help/get_topics',
                    {},
                    (err, req, res, page) => {
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

                rest.post('/v1/help/update_topic',
                    {
                        topic: topic1
                    },
                    (err, req, res, topic) => {
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
                rest.post('/v1/help/delete_topic_by_id',
                    {
                        topic_id: topic1.id
                    },
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete topic
            (callback) => {
                rest.post('/v1/help/get_topic_by_id',
                    {
                        topic_id: topic1.id
                    },
                    (err, req, res, topic) => {
                        assert.isNull(err);
                        
                        //assert.isNull(topic || null);

                        callback();
                    }
                );
            }
        ], done);
    });

    test('Articles CRUD Operations', (done) => {
        let article1, article2: HelpTopicV1;

        async.series([
        // Create one article
            (callback) => {
                rest.post('/v1/help/create_article',
                    {
                        article: HELP_ARTICLE1
                    },
                    (err, req, res, article) => {
                        assert.isNull(err);
                        
                        assert.isObject(article);
                        assert.equal(article.id, HELP_ARTICLE1.id);
                        assert.equal(article.app, HELP_TOPIC1.app);

                        article1 = article;

                        callback();
                    }
                );
            },
        // Create another article
            (callback) => {
                rest.post('/v1/help/create_article',
                    {
                        article: HELP_ARTICLE2
                    },
                    (err, req, res, article) => {
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
                rest.post('/v1/help/get_articles',
                    {},
                    (err, req, res, page) => {
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

                rest.post('/v1/help/update_article',
                    {
                        article: article1
                    },
                    (err, req, res, article) => {
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
                rest.post('/v1/help/delete_article_by_id',
                    {
                        article_id: article1.id
                    },
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete article
            (callback) => {
                rest.post('/v1/help/get_article_by_id',
                    {
                        article_id: article1.id
                    },
                    (err, req, res, article) => {
                        assert.isNull(err);
                        
                        //assert.isNull(article || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});
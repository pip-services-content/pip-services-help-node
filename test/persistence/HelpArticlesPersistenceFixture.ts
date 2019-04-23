let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { IHelpArticlesPersistence } from '../../src/persistence/IHelpArticlesPersistence';
import { HelpArticleV1 } from '../../src/data/version1/HelpArticleV1';
import { HelpArticleContentV1 } from '../../src/data/version1/HelpArticleContentV1';

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
let HELP_ARTICLE3 = <HelpArticleV1>{
    id: '3',
    tags: ['Tag 1', 'tag 2'],
    all_tags: ['tag1', 'tag2'],
    topic_id: '2',
    app: 'Test App 2',
    min_ver: 0,
    max_ver: 2,
    status: 'translating'
};

export class HelpArticlesPersistenceFixture {
    private _persistence: IHelpArticlesPersistence;
    
    constructor(persistence: IHelpArticlesPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public createArticles(done) {
        async.series([
        // Create one article
            (callback) => {
                this._persistence.create(
                    null,
                    HELP_ARTICLE1,
                    (err, article) => {
                        assert.isNull(err);
                        
                        assert.isObject(article);
                        assert.equal(article.id, HELP_ARTICLE1.id);
                        assert.equal(article.topic_id, HELP_ARTICLE1.topic_id);
                        assert.equal(article.status, HELP_ARTICLE1.status);

                        callback();
                    }
                );
            },
        // Create another article
            (callback) => {
                this._persistence.create(
                    null,
                    HELP_ARTICLE2,
                    (err, article) => {
                        assert.isNull(err);
                        
                        assert.isObject(article);
                        assert.equal(article.id, HELP_ARTICLE2.id);
                        assert.equal(article.topic_id, HELP_ARTICLE2.topic_id);
                        assert.equal(article.status, HELP_ARTICLE2.status);

                        callback();
                    }
                );
            },
        // Create yet another article
            (callback) => {
                this._persistence.create(
                    null,
                    HELP_ARTICLE3,
                    (err, article) => {
                        assert.isNull(err);
                        
                        assert.isObject(article);
                        assert.equal(article.id, HELP_ARTICLE3.id);
                        assert.equal(article.topic_id, HELP_ARTICLE3.topic_id);
                        assert.equal(article.status, HELP_ARTICLE3.status);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let article1: HelpArticleV1;

        async.series([
        // Create articles
            (callback) => {
                this.createArticles(callback);
            },
        // Get all articles
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        article1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the article
            (callback) => {
                article1.app = 'New App 1';

                this._persistence.update(
                    null,
                    article1,
                    (err, article) => {
                        assert.isNull(err);
                        
                        assert.isObject(article);
                        assert.equal(article.app, 'New App 1');
                        assert.equal(article.id, article1.id);

                        callback();
                    }
                );
            },
        // Delete article
            (callback) => {
                this._persistence.deleteById(
                    null,
                    article1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete article
            (callback) => {
                this._persistence.getOneById(
                    null,
                    article1.id,
                    (err, article) => {
                        assert.isNull(err);
                        
                        assert.isNull(article || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create articles
            (callback) => {
                this.createArticles(callback);
            },
        // Get articles filtered by tags
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        tags: ['tag1']
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Get articles filtered by application
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        app: HELP_ARTICLE3.app
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
            // Get articles filtered by topic id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        topic_id: HELP_ARTICLE1.topic_id
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
            // Get articles filtered by version
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        version: 1
                    }),
                    new PagingParams(),
                    (err, help) => {
                        assert.isNull(err);
                        
                        assert.isObject(help);
                        assert.lengthOf(help.data, 2);

                        callback();
                    }
                );
            },
        ], done);
    }

    public testGetRandom(done) {
        async.series([
        // Create articles
            (callback) => {
                this.createArticles(callback);
            },
        // Get random article filtered by tags
            (callback) => {
                this._persistence.getOneRandom(
                    null,
                    FilterParams.fromValue({
                        tags: ['tag1'],
                        status: 'new'
                    }),
                    (err, help) => {
                        assert.isNull(err);
                        
                        assert.isObject(help);
                        assert.equal(HELP_ARTICLE2.id, help.id);

                        callback();
                    }
                );
            }
        ], done);
    }
}

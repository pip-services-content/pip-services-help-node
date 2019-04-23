let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { MultiString } from 'pip-services3-commons-node';

import { IHelpTopicsPersistence } from '../../src/persistence/IHelpTopicsPersistence';
import { HelpTopicV1 } from '../../src/data/version1/HelpTopicV1';

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
let HELP_TOPIC3 = <HelpTopicV1>{
    id: '3',
    parent_id: '1',
    app: 'Test App 2',
    title: new MultiString({ en: 'Subtopic 2' }),
    popular: false
};

export class HelpTopicsPersistenceFixture {
    private _persistence: IHelpTopicsPersistence;
        
    constructor(persistence: IHelpTopicsPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public createTopics(done) {
        async.series([
        // Create one topic
            (callback) => {
                this._persistence.create(
                    null,
                    HELP_TOPIC1,
                    (err, topic) => {
                        assert.isNull(err);
                        
                        assert.isObject(topic);
                        assert.equal(topic.id, HELP_TOPIC1.id);
                        assert.equal(topic.app, HELP_TOPIC1.app);
                        assert.equal(topic.title.get('en'), HELP_TOPIC1.title.get('en'));

                        callback();
                    }
                );
            },
        // Create another topic
            (callback) => {
                this._persistence.create(
                    null,
                    HELP_TOPIC2,
                    (err, topic) => {
                        assert.isNull(err);
                        
                        assert.isObject(topic);
                        assert.equal(topic.id, HELP_TOPIC2.id);
                        assert.equal(topic.parent_id, HELP_TOPIC2.parent_id);
                        assert.equal(topic.app, HELP_TOPIC2.app);
                        assert.equal(topic.title.get('en'), HELP_TOPIC2.title.get('en'));

                        callback();
                    }
                );
            },
        // Create yet another topic
            (callback) => {
                this._persistence.create(
                    null,
                    HELP_TOPIC3,
                    (err, topic) => {
                        assert.isNull(err);
                        
                        assert.isObject(topic);
                        assert.equal(topic.id, HELP_TOPIC3.id);
                        assert.equal(topic.parent_id, HELP_TOPIC3.parent_id);
                        assert.equal(topic.app, HELP_TOPIC3.app);
                        assert.equal(topic.title.get('en'), HELP_TOPIC3.title.get('en'));

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let topic1: HelpTopicV1;

        async.series([
        // Create items
            (callback) => {
                this.createTopics(callback);
            },
        // Get all topics
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        topic1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the topic
            (callback) => {
                topic1.app = 'New App 1';

                this._persistence.update(
                    null,
                    topic1,
                    (err, topic) => {
                        assert.isNull(err);
                        
                        assert.isObject(topic);
                        assert.equal(topic.app, 'New App 1');
                        assert.equal(topic.id, topic1.id);

                        callback();
                    }
                );
            },
        // Delete topic
            (callback) => {
                this._persistence.deleteById(
                    null,
                    topic1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete topic
            (callback) => {
                this._persistence.getOneById(
                    null,
                    topic1.id,
                    (err, help) => {
                        assert.isNull(err);
                        
                        assert.isNull(help || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create topics
            (callback) => {
                this.createTopics(callback);
            },
        // Get topics filtered by app
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        app: 'Test App 1'
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
        // Get topics filtered by parent id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        parent_id: '1'
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
            // Get topics filtered by popular
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        popular: true
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
        ], done);
    }
}

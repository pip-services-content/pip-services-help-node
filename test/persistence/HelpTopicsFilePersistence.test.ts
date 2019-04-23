import { ConfigParams } from 'pip-services3-commons-node';

import { HelpTopicsFilePersistence } from '../../src/persistence/HelpTopicsFilePersistence';
import { HelpTopicsPersistenceFixture } from './HelpTopicsPersistenceFixture';

suite('HelpTopicsFilePersistence', ()=> {
    let persistence: HelpTopicsFilePersistence;
    let fixture: HelpTopicsPersistenceFixture;
    
    setup((done) => {
        persistence = new HelpTopicsFilePersistence('./data/help_topics.test.json');

        fixture = new HelpTopicsPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});
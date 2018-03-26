import { HelpTopicsMemoryPersistence } from '../../src/persistence/HelpTopicsMemoryPersistence';
import { HelpTopicsPersistenceFixture } from './HelpTopicsPersistenceFixture';

suite('HelpTopicsMemoryPersistence', ()=> {
    let persistence: HelpTopicsMemoryPersistence;
    let fixture: HelpTopicsPersistenceFixture;
    
    setup((done) => {
        persistence = new HelpTopicsMemoryPersistence();
        fixture = new HelpTopicsPersistenceFixture(persistence);
        
        persistence.open(null, done);
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
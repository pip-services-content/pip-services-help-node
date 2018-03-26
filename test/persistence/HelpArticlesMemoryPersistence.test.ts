import { HelpArticlesMemoryPersistence } from '../../src/persistence/HelpArticlesMemoryPersistence';
import { HelpArticlesPersistenceFixture } from './HelpArticlesPersistenceFixture';

suite('HelpArticleMemoryPersistence', ()=> {
    let persistence: HelpArticlesMemoryPersistence;
    let fixture: HelpArticlesPersistenceFixture;
    
    setup((done) => {
        persistence = new HelpArticlesMemoryPersistence();
        fixture = new HelpArticlesPersistenceFixture(persistence);
        
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

    test('Get Random', (done) => {
        fixture.testGetRandom(done);
    });

});
import { ConfigParams } from 'pip-services3-commons-node';

import { HelpArticlesFilePersistence } from '../../src/persistence/HelpArticlesFilePersistence';
import { HelpArticlesPersistenceFixture } from './HelpArticlesPersistenceFixture';

suite('HelpArticlesFilePersistence', ()=> {
    let persistence: HelpArticlesFilePersistence;
    let fixture: HelpArticlesPersistenceFixture;
    
    setup((done) => {
        persistence = new HelpArticlesFilePersistence('./data/help_articles.test.json');

        fixture = new HelpArticlesPersistenceFixture(persistence);
        
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

    test('Get Random', (done) => {
        fixture.testGetRandom(done);
    });

});
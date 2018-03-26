let process = require('process');

import { ConfigParams } from 'pip-services-commons-node';

import { HelpArticlesMongoDbPersistence } from '../../src/persistence/HelpArticlesMongoDbPersistence';
import { HelpArticlesPersistenceFixture } from './HelpArticlesPersistenceFixture';

suite('HelpArticlesMongoDbPersistence', ()=> {
    let persistence: HelpArticlesMongoDbPersistence;
    let fixture: HelpArticlesPersistenceFixture;

    let mongoUri = process.env['MONGO_URI'];
    let mongoHost = process.env['MONGO_HOST'] || 'localhost';
    let mongoPort = process.env['MONGO_PORT'] || 27017;
    let mongoDatabase = process.env['MONGO_DB'] || 'test';
    if (mongoUri == null && mongoHost == null)
        return;
    
    setup((done) => {
        let dbConfig = ConfigParams.fromTuples(
            'connection.uri', mongoUri,
            'connection.host', mongoHost,
            'connection.port', mongoPort,
            'connection.database', mongoDatabase
        );

        persistence = new HelpArticlesMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new HelpArticlesPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
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
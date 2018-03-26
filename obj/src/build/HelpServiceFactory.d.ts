import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
export declare class HelpServiceFactory extends Factory {
    static Descriptor: Descriptor;
    static TopicsMemoryPersistenceDescriptor: Descriptor;
    static TopicsFilePersistenceDescriptor: Descriptor;
    static TopicsMongoDbPersistenceDescriptor: Descriptor;
    static ArticlesMemoryPersistenceDescriptor: Descriptor;
    static ArticlesFilePersistenceDescriptor: Descriptor;
    static ArticlesMongoDbPersistenceDescriptor: Descriptor;
    static ControllerDescriptor: Descriptor;
    static HttpServiceDescriptor: Descriptor;
    constructor();
}

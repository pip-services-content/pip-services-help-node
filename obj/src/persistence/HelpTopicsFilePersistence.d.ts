import { ConfigParams } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';
import { HelpTopicsMemoryPersistence } from './HelpTopicsMemoryPersistence';
import { HelpTopicV1 } from '../data/version1/HelpTopicV1';
export declare class HelpTopicsFilePersistence extends HelpTopicsMemoryPersistence {
    protected _persister: JsonFilePersister<HelpTopicV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}

import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';

import { HelpTopicsMemoryPersistence } from './HelpTopicsMemoryPersistence';
import { HelpTopicV1 } from '../data/version1/HelpTopicV1';

export class HelpTopicsFilePersistence extends HelpTopicsMemoryPersistence {
	protected _persister: JsonFilePersister<HelpTopicV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<HelpTopicV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}
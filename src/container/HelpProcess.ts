import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { NetworkingFactory } from 'pip-services-net-node';
import { OssFactory } from 'pip-services-oss-node';

import { HelpServiceFactory } from '../build/HelpServiceFactory';

export class HelpProcess extends ProcessContainer {

    public constructor() {
        super("help", "Context help microservice");
        this._factories.add(new NetworkingFactory);
        this._factories.add(new OssFactory);
        this._factories.add(new HelpServiceFactory);
    }

}

import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultNetFactory } from 'pip-services-net-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { HelpServiceFactory } from '../build/HelpServiceFactory';

export class HelpProcess extends ProcessContainer {

    public constructor() {
        super("help", "Context help microservice");
        this._factories.add(new DefaultNetFactory);
        this._factories.add(new DefaultOssFactory);
        this._factories.add(new HelpServiceFactory);
    }

}

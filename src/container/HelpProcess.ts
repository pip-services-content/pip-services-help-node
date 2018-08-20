import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { HelpServiceFactory } from '../build/HelpServiceFactory';
import { DefaultRpcFactory } from 'pip-services-rpc-node';

export class HelpProcess extends ProcessContainer {

    public constructor() {
        super("help", "Context help microservice");
        this._factories.add(new HelpServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}

import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { HelpServiceFactory } from '../build/HelpServiceFactory';

export class HelpProcess extends ProcessContainer {

    public constructor() {
        super("help", "Context help microservice");
        this._factories.add(new HelpServiceFactory);
    }

}

import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { NetworkingFactory } from 'pip-services-net-node';
import { OssFactory } from 'pip-services-oss-node';

import { HelpServiceFactory } from '../build/HelpServiceFactory';

export class HelpLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("help", "Context help function");
        
        this._dependencyResolver.put('controller', new Descriptor('pip-services-help', 'controller', 'default', '*', '*'));
        
        this._factories.add(new NetworkingFactory);
        this._factories.add(new OssFactory);
        this._factories.add(new HelpServiceFactory());
    }
}

export const handler = new HelpLambdaFunction().getHandler();
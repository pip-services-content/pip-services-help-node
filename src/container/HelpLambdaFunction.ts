import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { DefaultNetFactory } from 'pip-services-net-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { HelpServiceFactory } from '../build/HelpServiceFactory';

export class HelpLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("help", "Context help function");
        
        this._dependencyResolver.put('controller', new Descriptor('pip-services-help', 'controller', 'default', '*', '*'));
        
        this._factories.add(new DefaultNetFactory);
        this._factories.add(new DefaultOssFactory);
        this._factories.add(new HelpServiceFactory());
    }
}

export const handler = new HelpLambdaFunction().getHandler();
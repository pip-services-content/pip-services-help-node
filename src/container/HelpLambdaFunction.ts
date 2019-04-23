import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';

import { HelpServiceFactory } from '../build/HelpServiceFactory';

export class HelpLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("help", "Context help function");
        
        this._dependencyResolver.put('controller', new Descriptor('pip-services-help', 'controller', 'default', '*', '*'));
        
        this._factories.add(new HelpServiceFactory());
    }
}

export const handler = new HelpLambdaFunction().getHandler();
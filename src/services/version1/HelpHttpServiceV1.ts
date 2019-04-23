import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class HelpHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/help');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-help', 'controller', 'default', '*', '1.0'));
    }
}
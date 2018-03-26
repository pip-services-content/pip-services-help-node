import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class HelpHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('help');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-help', 'controller', 'default', '*', '1.0'));
    }
}
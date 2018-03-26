import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

export class DocumentV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('file_id', TypeCode.String);
        this.withRequiredProperty('file_name', TypeCode.String);
    }
}

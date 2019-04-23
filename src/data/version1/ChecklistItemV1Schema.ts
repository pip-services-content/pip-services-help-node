import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class ChecklistItemV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('text', TypeCode.String);
        this.withOptionalProperty('checked', TypeCode.Boolean);
    }
}

import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';

import { ContentBlockV1Schema } from './ContentBlockV1Schema';

export class HelpArticleContentV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('language', TypeCode.String);
        this.withRequiredProperty('title', TypeCode.String);
        this.withOptionalProperty('content', new ArraySchema(new ContentBlockV1Schema()));
    }
}

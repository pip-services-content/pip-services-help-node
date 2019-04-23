import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';

import { HelpArticleContentV1Schema } from './HelpArticleContentV1Schema';

export class HelpArticleV1Schema extends ObjectSchema {
    public constructor() {
        super();

        /* Identification */
        this.withOptionalProperty('id', TypeCode.String);
        this.withOptionalProperty('topic_id', TypeCode.String);
        this.withRequiredProperty('app', TypeCode.String);
        this.withOptionalProperty('index', TypeCode.Integer);
        this.withOptionalProperty('min_ver', TypeCode.Integer);
        this.withOptionalProperty('max_ver', TypeCode.Integer);

        /* Auto-generated fields */
        this.withOptionalProperty('create_time', null); //TypeCode.DateTime);

        /* Search */
        this.withOptionalProperty('tags', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('all_tags', new ArraySchema(TypeCode.String));
        
        /* Content */
        this.withOptionalProperty('content', new ArraySchema(new HelpArticleContentV1Schema()));

        /* Status */
        this.withOptionalProperty('status', TypeCode.String);

        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}

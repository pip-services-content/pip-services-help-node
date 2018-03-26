import { IStringIdentifiable } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';

export class HelpTopicV1 implements IStringIdentifiable {
    public id: string;
    public parent_id?: string;
    public app: string;
    public title: MultiString;
    public popular?: boolean;

    /* Custom fields */
    public custom_hdr?: any;
    public custom_dat?: any;
}
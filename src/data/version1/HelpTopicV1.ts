import { IStringIdentifiable } from 'pip-services3-commons-node';
import { MultiString } from 'pip-services3-commons-node';

export class HelpTopicV1 implements IStringIdentifiable {
    public id: string;
    public parent_id?: string;
    public app: string;
    public index?: number;
    public title: MultiString;
    public popular?: boolean;

    /* Custom fields */
    public custom_hdr?: any;
    public custom_dat?: any;
}
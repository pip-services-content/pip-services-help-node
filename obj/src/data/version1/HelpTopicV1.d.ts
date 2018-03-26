import { IStringIdentifiable } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';
export declare class HelpTopicV1 implements IStringIdentifiable {
    id: string;
    parent_id?: string;
    app: string;
    title: MultiString;
    popular?: boolean;
    custom_hdr?: any;
    custom_dat?: any;
}

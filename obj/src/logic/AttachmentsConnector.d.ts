import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';
import { HelpArticleV1 } from '../data/version1/HelpArticleV1';
export declare class AttachmentsConnector {
    private _attachmentsClient;
    constructor(_attachmentsClient: IAttachmentsClientV1);
    private extractAttachmentIds(article);
    addAttachments(correlationId: string, article: HelpArticleV1, callback: (err: any) => void): void;
    updateAttachments(correlationId: string, oldArticle: HelpArticleV1, newArticle: HelpArticleV1, callback: (err: any) => void): void;
    removeAttachments(correlationId: string, article: HelpArticleV1, callback: (err: any) => void): void;
}

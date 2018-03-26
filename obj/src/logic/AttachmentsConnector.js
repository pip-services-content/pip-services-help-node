"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_clients_attachments_node_1 = require("pip-clients-attachments-node");
class AttachmentsConnector {
    constructor(_attachmentsClient) {
        this._attachmentsClient = _attachmentsClient;
    }
    extractAttachmentIds(article) {
        let ids = [];
        article.content = article.content || [];
        for (let content of article.content) {
            content.content = content.content || [];
            for (let block of content.content) {
                block.pic_ids = block.pic_ids || [];
                block.docs = block.docs || [];
                ids.push(...block.pic_ids);
                for (let doc of block.docs) {
                    ids.push(doc.file_id);
                }
            }
        }
        return ids;
    }
    addAttachments(correlationId, article, callback) {
        if (this._attachmentsClient == null || article == null) {
            callback(null);
            return;
        }
        let ids = this.extractAttachmentIds(article);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(article.id, 'help-article');
        this._attachmentsClient.addAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        });
    }
    updateAttachments(correlationId, oldArticle, newArticle, callback) {
        if (this._attachmentsClient == null || oldArticle == null || newArticle == null) {
            callback(null);
            return;
        }
        let oldIds = this.extractAttachmentIds(oldArticle);
        let newIds = this.extractAttachmentIds(newArticle);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(newArticle.id, 'help-article');
        this._attachmentsClient.updateAttachments(correlationId, reference, oldIds, newIds, (err) => {
            callback(err);
        });
    }
    removeAttachments(correlationId, article, callback) {
        if (this._attachmentsClient == null || article == null) {
            callback(null);
            return;
        }
        let ids = this.extractAttachmentIds(article);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(article.id, 'help-article');
        this._attachmentsClient.removeAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        });
    }
}
exports.AttachmentsConnector = AttachmentsConnector;
//# sourceMappingURL=AttachmentsConnector.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_data_node_1 = require("pip-services-data-node");
const HelpArticlesMemoryPersistence_1 = require("./HelpArticlesMemoryPersistence");
class HelpArticlesFilePersistence extends HelpArticlesMemoryPersistence_1.HelpArticlesMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services_data_node_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.HelpArticlesFilePersistence = HelpArticlesFilePersistence;
//# sourceMappingURL=HelpArticlesFilePersistence.js.map
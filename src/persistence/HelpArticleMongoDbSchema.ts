import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let HelpArticleMongoDbSchema = function (collection?: string) {
    collection = collection || 'help_articles';

    let documentSchema = new Schema(
        {
            file_id: { type: String, required: true },
            file_name: { type: String, required: true }
        });

    documentSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    let checklistSchema = new Schema(
        {
            text: { type: String, required: false },
            checked: { type: Boolean, required: false }
        });

    checklistSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    let contentBlockSchema = new Schema(
        {
            /* Content */
            type: { type: String, required: true },
            text: { type: String, required: false },
            checklist: { type: [checklistSchema], required: false },
            loc_name: { type: String, required: false },
            loc_pos: { type: Mixed, required: false },
            start: { type: Date, required: false },
            end: { type: Date, required: false },
            all_day: { type: Boolean, required: false },
            pic_ids: { type: [String], required: false },
            docs: { type: [documentSchema], required: false },
            embed_type: { type: String, required: false },
            embed_uri: { type: String, required: false },

            /* Custom fields */
            custom: { type: Mixed, required: false }
        });

    contentBlockSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    
    let articleContentSchema = new Schema(
        {
            language: { type: String, required: true },
            title: { type: String, required: true },
            content: { type: [contentBlockSchema], required: false }
        });

    articleContentSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    
    let schema = new Schema(
        {
            /* Identification */
            _id: { type: String, unique: true },
            topic_id: { type: String, required: false, index: true },
            app: { type: String, required: true, index: true },
            index: { type: Number, required: false },
            min_ver: { type: Number, required: true, default: 0 },
            max_ver: { type: Number, required: true, default: 9999 },

            /* Automatically managed fields */
            create_time: { type: Date, required: true, 'default': Date.now },

            /* Content */
            content: { type: [articleContentSchema], required: false },

            /* Status */
            status: { type: String, required: true, default: 'new' },

            /* Search  */
            tags: { type: [String], required: false },
            // All tags = tags + hashtags
            all_tags: { type: [String], required: false, index: true },

            /* Custom fields */
            custom_hdr: { type: Mixed, required: false },
            custom_dat: { type: Mixed, required: false }
        },
        {
            collection: collection,
            autoIndex: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema;
}
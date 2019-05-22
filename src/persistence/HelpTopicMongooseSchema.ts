import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let HelpTopicMongooseSchema = function (collection?: string) {
    collection = collection || 'help_topics';

    let schema = new Schema(
        {
            /* Identification */
            _id: { type: String, unique: true },
            parent_id: { type: String, required: false },
            app: { type: String, required: false },
            index: { type: Number, required: false },
            title: { type: Mixed, required: true },
            popular: { type: Boolean, required: false },

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
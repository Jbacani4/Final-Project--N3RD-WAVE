const postSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    creator: {type: Schema.Types.ObjectID, ref:"User"},
    
}, {timestaps: true})
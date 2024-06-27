// feedback-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'feedback';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    feedback_text: { type: String, required: true },
    receiver_id: { type: String, required: true },
    sender_id: { type: String, required: true },
    sender_name: { type: String, required: true },
    receiver_name: { type: String, required: true },
    feedback_mark : { type: String},
    course: { type: String},
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};

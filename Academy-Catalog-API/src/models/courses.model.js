// courses-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'courses';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: { type: String, required: true },
      stage: { type: String, required: true },
      tags: [
        {
          type: String,
        },
      ],
      description: { type: String, required: true },
      trainerID: { type: String, required: true },
      duration: { type: Number, required: true },
      enabled: { type: Boolean, required: true },
      startDate: { type: Date, required: true },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};

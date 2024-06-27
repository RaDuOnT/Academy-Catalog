// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "users";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      role: { type: String, required: true },
      emailAddress: { type: String, required: true },
      password: { type: String },
      phoneNumber: { type: Number, required: true },
      address: { type: String },
      gender: { type: String },
      dateOfBirth: { type: Date },
      enabled: { type: Boolean, required: true },
      profilePicture: { type: String },
      description: { type: String },
      mark: { type: Number },
      courses: [{ type: String }],
      isVerified: { type: Boolean },
      verifyToken: { type: String },
      verifyExpires: { type: Number },
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

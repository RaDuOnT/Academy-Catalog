// trainers-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'trainers';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  //defining right Schema for data that has to be part of CRUD operations
  const schema = new Schema({
    userId:{type:String, required:true},
    courses:[{type:String,required:true}],
    
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

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://arth_1234:qwerty7861234@cluster0.2owaofo.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log(err);
  });

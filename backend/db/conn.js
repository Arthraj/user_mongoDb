const mongoose = require("mongoose");
mongoose
  .connect(
    process.env.MONGO_URL,
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

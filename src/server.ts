import app from "./app";
import envConfig from "./config/envConfig";
const port = envConfig.PORT || 2100;

app.listen(port, () => {
  console.log(`App running on ${port}`);
});

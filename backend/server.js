import app from "./app.js";

app.listen(process.env.PORT, () => {
    console.log(`server Runnig On port ${process.env.PORT}`);

});

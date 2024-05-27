var app = require("./app");
var routerIndex = require("./routes/router");

app.use("/", routerIndex);

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}/`);
    console.log(`http://localhost:${process.env.PORT}/login`);
})


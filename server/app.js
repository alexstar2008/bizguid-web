const express = require('express');
const compression = require('compression');
const path = require('path');


const port = process.env.PORT || 8080;
const app = express();

app.use(compression());
app.use(express.static(`${__dirname}/../dist`));

app.get('/*',(req,res)=>{
  res.sendFile(path.join(`${__dirname}/../dist/index.html`));
});

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});


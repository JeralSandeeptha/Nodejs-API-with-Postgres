const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.listen(7005, () => {
    console.log('Server is running at port 7005');
});
const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;

app.use(express.static('public'));

app.get('/numbers', async(req, res)=>{
    try{
        const urls = req.query.url;
        console.log(urls.url);
        const response = await axios.get(urls);
        // const data = await response.json();
        // response.numbers.sort();
        const arr = [...new Set(response.data.numbers)].sort((a,b) => a-b);
        return res.send({
            "numbers": arr,
        })
    }
    catch(err){
        console.log(err);
    }
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
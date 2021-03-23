var csrf = require('csrf');
var tokens = new csrf();

//
export default async function (req, res){
  try{
    var data = req.body
console.log(data);
    var token =data._token
    var api_key = process.env.MY_API_KEY
    var content = data.content_name
//    res.json({})
    const response = await fetch(process.env.API_URL + '/api/post/create/' + content, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',  'apikey': api_key
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      res.json(data)
    } else {
      throw new Error(await response.text());
    }       
    /*
    */
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};
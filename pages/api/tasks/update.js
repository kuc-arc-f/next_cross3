var csrf = require('csrf');
var tokens = new csrf();

//
export default async function (req, res){
  try{
    var data = req.body
// console.log(data);
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }  
    var id = data.id
//    var api_key = data.apikey
    var api_key = process.env.MY_API_KEY
    var item = {
      id: id,
      title: data.title ,  
      content: data.content ,
    };
//console.log(item);
    var content = "tasks"
    const response = await fetch(process.env.API_URL + '/api/post/update/' + content, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',  'apikey': api_key
      },
      body: JSON.stringify(item),
    });
    if (response.status === 200) {
      res.json(data)
    } else {
      throw new Error(await response.text());
    }
//console.log(id);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};
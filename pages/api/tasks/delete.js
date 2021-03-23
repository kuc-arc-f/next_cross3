//
export default async function (req, res){
  try{
    var data = req.body
    var item = {
      id: data.id,
    };
//console.log(item );
    var api_key = process.env.MY_API_KEY
    var content = "tasks"
    const response = await fetch(process.env.API_URL + '/api/post/delete/' + content, {
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
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};
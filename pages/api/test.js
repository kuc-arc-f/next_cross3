//
export default async function (req, res){
  try {
    var data = req.body
    /*
    if(typeof req.cookies.cross_site_id){
      console.log(req.cookies.cross_site_id )
    }
    */
console.log(data)
    var api_key = data.apikey
    var content = "test_1"
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
    //res.json([])
  } catch (error) {
    res.status(500).send(); 
    console.error(error);
  }
};
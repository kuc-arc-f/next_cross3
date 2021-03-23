
export default {
  add_count: async function(items){
    try{
      var len = items.length
      for(var i=0; i < len; i++){
        var item = items[i]
//console.log(item)
        var data = {
          repo_id: item.id, name: item.name,
          count: item.count, uniques: item.uniques,
        }
        var api_key = process.env.MY_API_KEY
        var content = "counts"
        const response = await fetch(process.env.API_URL + '/api/post/create/' + content, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',  'apikey': api_key
          },
          body: JSON.stringify(data),
        });
        if (response.status !== 200) {
          throw new Error(await response.text());
        }  
      }
    } catch (err) {
      console.log(err);
      throw new Error('error, add_count');
    }
  },
  get_count_items: async function(items){
    try{
      var ret = []
      var len = items.length
      for(var i=0; i < len; i++){
//console.log(items[i].name );
        var item = items[i]
        var name = items[i].name
        var url = process.env.GIT_API_URL + `/repos/${process.env.GIT_OWNER}/${name}/`
        url += "traffic/clones?per=week"
//console.log(url)
        var response = await fetch(url, {
          method: 'GET', headers: { 'Authorization': 'token ' + process.env.GIT_TOKEN },
        });
        var status = await response.status
        if (status === 200) {
          var json =  await response.json()
          item.count = json.count
          item.uniques = json.uniques
//console.log(json );
          ret.push(item)
        }
      }
//console.log(ret );
      return ret
    } catch (err) {
      console.log(err);
      throw new Error('error, get_count_items');
    } 
  },
  delete_count_items: async function(items){
    try{
      var api_key = process.env.MY_API_KEY
      var content = "counts"
      var len = items.length
      for(var i=0; i < len; i++){
        var item = items[i]
//console.log(item.id)
        var delete_item = {
          id: item.id,
        }
        const response = await fetch(process.env.API_URL + '/api/post/delete/' + content, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',  'apikey': api_key
          },
          body: JSON.stringify(delete_item),
        });
        if (response.status !== 200) {
          throw new Error(await response.text());
        }        
      }
    } catch (err) {
      console.log(err);
      throw new Error('error, delete_count_items');
    }    
  },
}

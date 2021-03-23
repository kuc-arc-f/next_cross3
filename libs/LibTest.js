
//
export default {
  add_test :async function(num , apikey){
    try{
      var content_name ="test_1"
      var item = {
        title:"title-" + num,
        content: "content-" + num,
      }
      const res = await fetch(process.env.BASE_URL + '/api/post/create/'+ content_name, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',  'apikey': apikey          
        },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        const json = await res.json()
        console.log(json)
      } else {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.log(err);
      throw new Error("Error, add_test ");
    }
  },
  add_test2 :async function(num){
    try{
      var content_name ="test_1"
      var item = {
        title:"title-" + num,
        content: "content-" + num,
      }
      var api_key = process.env.MY_API_KEY
      const res = await fetch(process.env.API_URL + '/api/post/create/'+ content_name, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',  'apikey': api_key          
        },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        const json = await res.json()
      } else {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.log(err);
      throw new Error("Error, add_test ");
    }
  },
  add_test3 :async function(num){
    try{
      var content_name ="test_1"
      var item = {
        content_name: content_name,
        title:"title-" + num,
        content: "content-" + num,
      }
      var api_key = process.env.MY_API_KEY
      const res = await fetch(process.env.BASE_URL + '/api/common/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        const json = await res.json()
      } else {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.log(err);
      throw new Error("Error, add_test ");
    }
  },
  delete_test_items: async function(items){
    try{
      var api_key = process.env.MY_API_KEY
      var content = "test_1"
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
      throw new Error('error, delete_test_items');
    }    
  },  

}

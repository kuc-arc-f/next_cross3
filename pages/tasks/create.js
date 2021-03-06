import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import React, {Component} from 'react';
import cookies from 'next-cookies'

import Layout from '../../components/layout'
//
export default class extends Component {
  static async getInitialProps(ctx) {
    var site_id = cookies(ctx).cross_site_id ||''
    var url = process.env.API_URL + '/api/token_get'
    const res = await fetch(url)
    const json = await res.json()
    const resSite = await fetch(process.env.API_URL +'/api/sites/show?id=' + site_id)
    const jsonSite = await resSite.json()
//console.log(jsonSite.apikey )       
    return { 
      user_id :cookies(ctx).user_id,
      csrf: json.csrf,
      apikey: jsonSite.apikey.key
    }
  }  
  constructor(props){
    super(props)
    this.state = {title: '', content: '', _token : ''}
    this.handleClick = this.handleClick.bind(this);
    this.database = null
//console.log(props)
  }
  componentDidMount(){
    this.setState({ _token: this.props.csrf.token });
  }   
  handleChangeTitle(e){
    this.setState({title: e.target.value})
  }
  handleChangeContent(e){
    this.setState({content: e.target.value})
  }   
  handleClick(){
    this.add_item()
  } 
  async add_item(){
    try {
      var item = {
        title: this.state.title,
        content: this.state.content,
        apikey: this.props.apikey,
        _token: this.state._token
      }
//console.log(item)
      const res = await fetch(process.env.BASE_URL + '/api/tasks/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        Router.push('/tasks');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }    
  } 
  render() {
    return (
      <Layout>
        <div className="container">
          <Link href="/tasks">
            <a className="btn btn-outline-primary mt-2">Back</a></Link>
          <hr className="mt-2 mb-2" />
          <h1>Tasks - Create</h1>
          <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" className="form-control"
                    onChange={this.handleChangeTitle.bind(this)} />
                </div>
            </div>
          </div>
          <div className="row">
              <div className="col-md-6">
              <div className="form-group">
                  <label>Content:</label>
                  <input type="text" className="form-control"
                    onChange={this.handleChangeContent.bind(this)}/>
              </div>
              </div>
          </div><br />          
          <div className="form-group">
              <button className="btn btn-primary" onClick={this.handleClick}>Create
              </button>
          </div>                
          <hr />
        </div>
      </Layout>
    )    
  } 
}


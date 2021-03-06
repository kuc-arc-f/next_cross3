//import Head from 'next/head'
import Link from 'next/link';
import Router from 'next/router'
import React from 'react'
import flash from 'next-flash';
import cookies from 'next-cookies'

import Layout from '../../../components/layout'
//
export default class extends React.Component {
  static async getInitialProps(ctx) {
    var site_id = cookies(ctx).cross_site_id ||''    
    console.log("id=", ctx.query.id, site_id)
    var id = ctx.query.id
    var api_key = process.env.MY_API_KEY
    var content = "tasks"
    var url = process.env.API_URL+ `/api/get/findone?content=${content}&id=${id}`
    url += "&apikey=" + api_key    
    const res = await fetch(url)
    const json = await res.json()
    var url = process.env.API_URL + '/api/token_get'
    var tokenRes = await fetch(url)
    var tokenJson = await tokenRes.json() 
    const resSite = await fetch(process.env.API_URL +'/api/sites/show?id=' + site_id)
    const jsonSite = await resSite.json()
// console.log(jsonSite.apikey )           
      return {
          id: id,
          item: json,
          user_id :cookies(ctx).user_id,
          csrf: tokenJson.csrf,
          apikey: jsonSite.apikey.key
      };
  }
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.state = {
      title: this.props.item.title, 
      content: this.props.item.content,
      _token : this.props.csrf.token,
    }
console.log(this.props )
  }  
  componentDidMount(){
  }     
  handleChangeTitle(e){
    console.log("handleChangeTitle:")
    this.setState({title: e.target.value})
  }
  handleChangeContent(e){
    this.setState({content: e.target.value})
  }  
  async handleClickDelete(){
    console.log("#deete-id:" , this.props.id)
    try {
      var item = {
        id: this.props.id,
        apikey: this.props.apikey,
        _token: this.state._token
      }
console.log(item)
      const res = await fetch(process.env.BASE_URL +'/api/tasks/delete', {
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
      console.error(error);
    }     
  } 
  async handleClick(){
  console.log("#-handleClick")
//  console.log(this.state)
    await this.update_item()
  }     
  async update_item(){
    try {
      var item = {
        title: this.state.title,
        content: this.state.content,
        id: this.props.id,
        apikey: this.props.apikey,
        _token: this.state._token
      }
console.log(item)
      const res = await fetch(process.env.BASE_URL +'/api/tasks/update', {
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
            <h1>Tasks - Edit</h1>
            <div className="row">
              <div className="col-md-6">
                  <div className="form-group">
                      <label>Title:</label>
                      <input type="text" id="title" className="form-control"
                      value={this.state.title}
                      onChange={this.handleChangeTitle.bind(this)} />
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
              <div className="form-group">
                  <label>Content:</label>
                  <input type="text" className="form-control"
                    value={this.state.content}
                    onChange={this.handleChangeContent.bind(this)}/>
              </div>
              </div>
            </div><br />
            <div className="form-group">
              <button className="btn btn-primary" onClick={this.handleClick}>Save
              </button>
            </div>
            <hr />                  
            <div className="form-group">
              <button className="btn btn-danger" onClick={this.handleClickDelete}>Delete
              </button>
            </div>

            <hr />
            ID : {this.props.id}
          </div>
      </Layout>
    );
  };
}



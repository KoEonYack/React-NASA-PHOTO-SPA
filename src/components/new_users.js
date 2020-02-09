import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search'
import Pagination from './Pagination'
import Card from './Card'


class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            loading: false,
            error: null,
            text: "Seoul",
            recent_text: "",
            ////////////////
            posts: [],
            setPosts: [],
            setLoading: false,
            currentPage: 1,
            setCurrentPage: 1,
            postsPerPage: 2,
        }

        this.useEffect();
    }
    
    fetchUsers = async () => {
        try {
            this.setState({
                error: null, users: null, loading: true
            })
            const response = await axios.get(
                'https://images-api.nasa.gov/search?q='+this.state.text
            )
            console.log(response);
            this.setState({users: response.data, loading: false})
        } catch (e) {
            this.setState({error: e, loading: false})
        }
    }

    useEffect = () => {
        this.fetchUsers();
    }

    setText = (e) => {
        e.preventDefault();
        this.setState({text: e.target.value});
    }

    paginate = (pageNumber) => { 
        this.setState({pageNumber: pageNumber}); 
    }

    render() {
        if (this.state.loading) return <div class="loader"></div>;
        if (this.state.error) return <div>오류가 발생했습니다.</div>;
        if (!this.state.users) return null;
        

        this.state.postsPerPage = 2;
        this.indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        this.indexOfFirstPost = this.indexOfLastPost - this.state.postsPerPage;
        this.currentPosts = this.state.users.collection.items.slice(this.indexOfFirstPost, this.indexOfLastPost);


        return (
          <div>
        0. {this.indexOfFirstPost} | {this.indexOfLastPost} <br />
        1. {this.state.postsPerPage}  <br />
        2. {this.state.users.collection.metadata.total_hits}  <br />
        3. {this.paginate} <br />
        

            <main role="main">
            <div className="album py-5 bg-white">
                <div className="container">
                    {this.recent_text = this.state.text}
                    <Search s_value={this.state.text} s_change={this.setText} s_click={this.fetchUsers}/>
                    <div> <strong>최근 검색어:</strong> {this.recent_text = this.recent_text + " " }  </div>
                    <br /><br />
                    {this.state.users.collection.metadata.total_hits}

                <div className="row">
                        {this.state.users.collection.items.map(user => {
                        if (user.links && user.data[0].keywords){
                            return <Card
                                user={user}
                                img_src={user.links[0].href}
                                title={user.data[0].title}
                                keywords = {user.data[0].keywords}
                                description = {user.data[0].description}
                                date_created={user.data[0].date_created}
                                key={user.data[0].nasa_id}
                            />
                        }
                        else{
                            // return <p> no-image</p>  
                            return <Card
                                user={user}
                                img_src={"http://design-ec.com/d/e_others_50/m_e_others_501.png"}
                                title={user.data[0].title}
                                keywords = {["No keyword"]}
                                description = {user.data[0].description}
                                date_created={user.data[0].date_created}
                                key={user.data[0].nasa_id}
                            />
                        } 
                        })}
                            <Pagination 
                                postsPerpage={this.state.postsPerPage} 
                                totalPosts={this.state.users.collection.metadata.total_hits} 
                                paginate={this.paginate}
                            />
                        </div>
                    </div>
                </div>
            </main>
          </div>
        );
    }
}



export default Users;




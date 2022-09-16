import { useEffect, useState } from 'react'
import './homepage.css'

type User={
    id: number;
    name: string;
    email: string;
    image: string;
    posts: [{
        id: number;
        title: string;
        message: string;
        usersId: number;
        likes: [{
            users: [{
                id: number;
                name: string;
                email: string;
                image: string;
            }];
            comments: [{
                message: string;
                user: [{
                    id: number;
                    name: string;
                    email: string;
                    image: string;
                }];
            }]
        }]
    }]
}


export function HomePage(){
 const [users,setUsers]=useState<User[]>([])

 useEffect(()=>{
    fetch(`http://localhost:4456/users`)
    .then(resp=>resp.json())
    .then(usersFromServer=>setUsers(usersFromServer))
 },[])
    return (
      <div className="homepage">
         <div className='header'>
            <h1>Medium</h1>
            <ul className='header-nav'>
                <li>Our story</li>
                <li>Membership</li>
                <li>Write</li>
                <li> <button className='sign_in'>Sign In</button></li>
                <li> <button className='get_started'>Get started</button></li>
            </ul>
         </div>
         <main>
            <h1>Stay curious.</h1>
            <h2>Discover stories, thinking, and expertise from writers on any topic.</h2>
            <div><button className='get_started'>Start reading </button></div>
         </main>
         <div className='posts'>
            {users.map(user=> (user.posts.map((post:any)=> 
            <div className='post'>
                <div className='post_header'>
                    <img src={user.image} />
                    <h5>{user.name}</h5>
                </div>
                <div className='post_info'>
                    <h2>{post.title}</h2>
                    <p>{post.message}</p>
                </div>
            </div>))
           
            )}
         </div>
      </div>
    )
}
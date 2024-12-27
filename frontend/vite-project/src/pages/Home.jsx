import React from 'react'
import NewPost from '../components/NewPost'
import AllPosts from './AllPosts'

function Home() {
  return (
    <div>
      <NewPost/>
      <AllPosts/>
      
    </div>
  )
}

export default Home
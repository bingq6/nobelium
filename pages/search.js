import { useState } from "react";
import SearchLayout from '@/layouts/search'
import {doSearch} from "@/lib/news";

export default function search ({ tags,posts}) {
  // const[posts,setPosts]=useState([])
  return <SearchLayout tags={tags} posts={posts} />
}
export async function getStaticProps () {
  const tags ={} //getAllTagsFromPosts(posts)
  // const {data:{list:posts}}=await doSearch('西部国际口腔展 ')
  const posts=[]
  return {
    props: {
      tags,
      posts
    },
    revalidate: 30
  }
}

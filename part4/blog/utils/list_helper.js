// eslint-disable-next-line no-unused-vars
const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum,item) =>{
    return sum+item.likes
  }
  return blogs.reduce(reducer,0)
}

const favouriteBlog = blogs => {
  const reducer = (check,item)=>{
    if(item.likes>check){
      return item.likes
    }
  }
  const mostLikes = blogs.reduce(reducer,0)
  return blogs.find(blog=>blog.likes===mostLikes)
}

const mostBlogs = blogs =>{
  let arr = []
  blogs.forEach(item =>{
    if(arr.find(a=>a.author===item.author) === undefined){
      arr.push({author:item.author,blogs:1})
    }else{
      arr=arr.map(a=>a.author===item.author?{author:a.author,blogs:a.blogs+1}:a)
    }
  }
  )
  const reducer = (check,item)=>{
    if(item.blogs>check){
      return item.blogs
    }
  }
  const mostLikes = arr.reduce(reducer,0)
  return arr.find(blog=>blog.blogs===mostLikes)
}

const mostLikes = blogs => {
  let arr = []
  blogs.forEach(item =>{
    if(arr.find(a=>a.author===item.author) === undefined){
      arr.push({author:item.author,likes:item.likes})
    }else{
      arr=arr.map(a=>a.author===item.author?{author:a.author,likes:a.likes+item.likes}:a)
    }
  }
  )
  const reducer = (check,item)=>{
    if(item.likes>check){
      return item.likes
    }
  }
  const mostLikes = arr.reduce(reducer,0)
  return arr.find(blog=>blog.likes===mostLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}


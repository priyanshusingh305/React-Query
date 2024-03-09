/* eslint-disable react/jsx-key */
import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query"



function App() {
  const queryClient=useQueryClient();

  const {data,error, isLoading} =useQuery({queryKey:["posts"],queryFn:()=> fetch("https://jsonplaceholder.typicode.com/posts").then((res)=>
  res.json()
  ),
  staleTime:3000,

  // refetchInterval:4000,
  refetchOnWindowFocus:false,
  retry:5,//it will try 5 time on failuir

})
console.log(error)

// eslint-disable-next-line no-unused-vars
const {mutate,isError,isPending,isSuccess} =useMutation({mutationFn:(newPost)=>
  fetch("https://jsonplaceholder.typicode.com/posts",{
    method:"POST",
    body:JSON.stringify(newPost),
    headers:{"Content-type": "application/json; charset=UTF-8"},
  }).then((res)=>res.json()),
  onSuccess:(newPost)=>{
    // queryClient.invalidateQueries();
    queryClient.setQueryData(["posts"],(oldposts)=>[...oldposts,newPost]);
  }
})
if(error || isError) return <div>There was an error</div>
if(isLoading) return <div>DATA is LOADING...</div>
  return (

  <div className="App">
  {isPending && <p>DATA IS BEING ADDED....</p>}
  <button onClick={()=>mutate(
    {
      userID:5000,
      id:4000,
      title:"Hey this is the title ",
      body:"this is the body",
    }
  )}>POST</button>
  {" "}
  {
    data.map((posts)=>(
      
      <div>
        {" "}
        <h4>
        ID: {posts.id}
        </h4>
        <h4>
        title: {posts.title}
        </h4>
        <p>{posts.body}</p>
      </div>
    ))
  }
  </div>
  )
}

export default App

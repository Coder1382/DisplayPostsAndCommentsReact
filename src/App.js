import { useEffect, useState } from "react";
function App(){
	class User{
		constructor(username, posts){
			this.username=username;
			this.posts=posts;
		}
	}
	class Post{
		constructor(text, comments){
			this.text=text;
			this.comments=comments;
		}
	}
	class Comment{
		constructor(email, text){
			this.email=email;
			this.text=text;
		}
	}
	const [IDs, setIDs] = useState([]);
	const [Messages, setMessages] = useState([]);
	const [Comments, setComments] = useState([]);
	const url='https://jsonplaceholder.typicode.com/'
	useEffect(()=>{
		fetch(url+'users').then((res)=>res.json()).then((data)=>{
			setIDs(data);
		});
		fetch(url+'posts').then((res)=>res.json()).then((data)=>{
			setMessages(data);
		});
		fetch(url+'comments').then((res)=>res.json()).then((data)=>{
			setComments(data);
		});
	},[]);
	let output=[];
	for(let i=0; i<IDs.length; ++i){
		let user=null;
		for(let m=0, count=0; m<Messages.length; ++m){
			if(Messages[m].userId==IDs[i].id){
				if(count===0){
					user=new User('Posts from '+IDs[i].username, []);
				}
				let post=new Post(Messages[m].body,[]);
				user.posts.push(post);
				count++;
				for(let c=0; c<Comments.length; ++c){
					if(Comments[c].postId==Messages[m].id){
						post.comments.push(new Comment('Comment from '+Comments[c].email+':', Comments[c].body));
					}
				}
			}
		}
		if(user!=null) output.push(user);
	}
	return (
		<div className='App'>
			
			{output.map(e=><ul>{e.username}{e.posts.map(el=><li>{el.text}<ul>{el.comments.map(com=><li>{com.email}<br></br>{com.text}</li>)}</ul></li>)}</ul>)}
		</div>
	);
}
export default App;
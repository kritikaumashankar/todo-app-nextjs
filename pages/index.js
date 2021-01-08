import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; 
import fetch from 'isomorphic-unfetch';

const Index =({todos})=>{ 
  const [form, setForm] = useState({ id: undefined,title:'', isComplete: false});
  const [isEditted, setIsEditted] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    if(isEditted){
      editTodo();
      setForm({id:undefined,title:'',isComplete:false})
      setIsEditted(false);
    }
  },[isEditted])
  const handleChange = (e) =>{
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }
  

  const handleSubmit =(e) =>{ 
    e.preventDefault();
        createTodo();
        setForm({id:undefined,title:'',isComplete:false})
  }

  const handleComplete =(e)=>{
    setForm({
      id: parseInt(e.target.id),
      title:"",
      isComplete:true
    })
    setIsEditted(true);
  }



const createTodo = async() => {
  try{
    const res = await fetch('http://localhost:3000/api/todos',{
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body:  JSON.stringify(form)
    });
    router.push('/');
    
  }catch(error){
    console.log(error);
  }
}

const editTodo = async() =>{
  try {
    const res = await fetch(`http://localhost:3000/api/todos/`,{
      method : 'PUT',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body:  JSON.stringify(form)
    });
    router.push('/');
  } catch (error) {
    console.log(error);
  }
}

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
          <h4>New Todo</h4>
            <div className="form-group">
              <input 
              required
                type="text" className="form-control"  name="title" placeholder="Add todo" value={form.title} onChange={handleChange} />
              <button type="submit"> + </button>
            </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Complete?</th>
              <th scope="col">Todos</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(todos).map(todo => {
                return(
                  <tr className="table-light" key={todo[1].id}>
                    <td>
                      <input 
                        type="checkbox" className="form-check-input" id={todo[1].id} name="isComplete" value={todo[1].isComplete} onChange={handleComplete}/></td>
                    <td><span>{todo[1].title}</span>
                    </td>
                  </tr>
              )       
            })} 
          </tbody>
        </table>
      </form>
    </div>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/todos')
  const { data } = await res.json();
  return { todos: data };
}
export default Index;
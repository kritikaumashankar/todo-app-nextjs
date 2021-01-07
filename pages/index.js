import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; 
import fetch from 'isomorphic-unfetch';

const Index =({todos})=>{ 
  const [form, setForm] = useState({ id: undefined,title:'', isComplete: false});
  const router = useRouter();

  const handleChange = (e) =>{
    
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    
    }
  

  const handleSubmit =(e) =>{ 
    e.preventDefault();
      console.log("submitting yes create todo")
      console
      createTodo();
      setForm({id:0,title:'',isComplete:false})
  }

  const handleComplete =(e)=>{
    console.log("inside handleComplete,id:", e.target.id)
      setForm({
        id: e.target.id,
        title: "",
        isComplete:true
      })
    
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

const editTodo = async () =>{
  try {
    console.log("form inside editTodo", form)
    const res = await fetch(`http://localhost:3000/api/todos/`,{
      method : "PUT",
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
console.log(todos)
  return (
    <div className="conatiner">
      <form onSubmit={handleSubmit}>
        <div>
          <span>New Todo</span> <br/>
            <div className="form-group">
              <input 
              required
                type="text" className="form-control"  name="title" placeholder="Add todo" value={form.title} onChange={handleSubmit} />
              <button type="submit"> + </button>
            </div>
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
              if(todo[1] !== null) {

                return(
                  <tr className="table-light" key={todo[1].id}>
                  <td>
                      <input 
                        type="checkbox" className="custom-control-input" id={todo[1].id} name="isComplete"  onChange={handleComplete}/>
                      <span>{todo[1].title}</span>
                    </td>
                  </tr>
              )       
              }else{
                return(
                  <tr className="table-light">
                  </tr>
                )
              }
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
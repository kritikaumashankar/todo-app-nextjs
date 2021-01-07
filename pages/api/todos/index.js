const fs = require('fs');
const todos = require("../../../todos")

export default async(req,res) => {

  const { method } = req;
  let idCount = todos.length;

  console.log("inside api/todos/index",req.body.id)
  let todo ={
    id: req.body.id == undefined ? ++idCount : req.body.id,
    title: req.body.title,
    isComplete: req.body.isComplete
  }
  switch(method){
    case 'GET':
      try {

        fs.readFileSync('todos.json','utf-8',(err, data) =>{
          if(err){
            console.log("File read failed:", err)
            return
          }
          try{
            res = JSON.parse(todos);
            console.log(res)
          }catch(err){
            return res.status(400).json({success:true, err:err});;
          }
        })
        return res.status(200).json({success:true, data:todos});
        
      } catch (error) {
        console.log('GET error',error)
      }
      break;

    case 'POST':
      try {
        todos.push(todo);
        fs.writeFileSync('todos.json',JSON.stringify(todos), err => {
          if (err) {
            console.log('Error writing file', err)
          } else {
              console.log('Successfully wrote file')
          }
        })
        return res.status(200).json({success:true});
      } catch (error) {
        console.log('POST error',error)
      }
      break;

    case 'PUT':
      try {
        //delete todos[todo.id -1];
        todos.splice(todo.id -1 ,1);
        console.log(todos);
      fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
              if (err) console.log('Error writing file:', err)
          })
      
      return res.status(200).json({success:true});
      } catch (error) {
        res.status(400).json({ success: false, err: error});
      }
      break;
    

    default:
      res.status(400).json({ success: false});
      break;
  }

}
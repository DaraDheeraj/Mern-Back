const express=require("express")
const cors=require("cors")
const app=express()
const mongoose=require("mongoose")
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://dheeraj:Dheeraj@1431@cluster0.xcpnmyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("Mongo connected"))
.catch((err)=>console.log("mongofailed",err))

const todoSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})


const Todo=mongoose.model("Todo",todoSchema);

app.delete('/delete/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.send("Deleted");
})
app.patch('/update/:id', async (req, res) => {
    await Todo.findByIdAndUpdate(req.params.id,
         { completed: req.body.completed });
    res.send("Updated");
    await todo.save();
})

app.post('/create', async (req, res) => {
    const todo = await new Todo({
        text: req.body.text,
    })
    await todo.save();
    res.json(todo);
})


app.listen(7777, async () => {
    console.log("7777 port");
})

app.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})
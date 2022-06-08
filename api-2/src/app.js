import express from 'express'
import morgan from 'morgan'
import { config } from 'dotenv'
import cors from 'cors';
import axios from 'axios';

//Todo: Init Service
config();

const app = express()

app.set('port', 3002)

//Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended: false}))

//Routes
app.get('/users', async (req, res) => {
    try {
        const { data } = await axios.get(process.env.API_EXT + '/users')
        const resData = { data, total: data.length }
       
        res.json(resData)
    } catch (error) {
        console.log("error", error)
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        
        if (isNaN(id) )
            return res.status(304).json({ message: ".. It's not a number"})
        
        const { data } = await axios.get(process.env.API_EXT + '/users/'+ id)
        const resData = { data, total: data.length }
       
        res.json(resData)
    } catch (error) {
        console.log("error", error);
    }
});

app.get('/users/:id/todos', async (req, res) => {
    try {
        const { id } = req.params
        
        if (isNaN(id) )
            return res.status(304).json({ message: ".. It's not a number"})
        
        const { data } = await axios.get(`${process.env.API_EXT}/users/${id}/todos`)
        const resData = { data, total: data.length }
       
        res.json(resData)
    } catch (error) {
        console.log("error", error);
    }
});

app.listen( app.get('port'), () => {
    console.log('server on port:', app.get('port'))
})


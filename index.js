const express = require("express")

const PORT = 3000
const accountController = require("./accountsController")
const account = require("./accountsModel")
const app = express()

app.use(express.json())

app.post('/account', (req,res)=> {
    try {
        const {id,name,age} = req.body
        if(!id) throw new Error("Account id is required")
        if(!name) throw new Error("Account name is required")
        if(!age) throw new Error("Account age is required")
        
        let newAccount = new account(id,name,age)

        accountController.storeAccount(newAccount)
        res.status(200).json({Message: "account created successfully"})
    }catch(error) {
        res.status(401).json({
            Error: error.message
        })
    }
})

app.get('/account', (req,res) => {
    try {
        let result = accountController.getAllAccounts()
        if(!result) throw new Error("No accounts found.")
        res.status(200).json(result)
    }catch(error) {
        res.status(401).json({
            Error: error.message
        })
    }
})

app.get('/account/:id', (req,res) => {
    try {
        let id = req.params.id
        if(!id) throw new Error("Please provide id.")
        let result = accountController.getOneAccount(Number(id))
        if(!result) throw new Error("No account found.")
        res.status(200).json(result)
    }catch(error) {
        res.status(401).json({
            Error: error.message
        })
    }
})

app.patch('/account',(req,res)=> {
    try {
        const {id, balance} = req.body
        if(!id) throw new Error("Please provide id.")
        if(!balance) throw new Error("Please provide balance")
        let result = accountController.updateAccount(id,balance)
        if(!result) throw new Error("Account not found")
        res.status(200).json({Message: "Updated account balance"})
    }catch(error) {
        res.status(401).json({
            Error: error.message
        })
    }
})

app.delete('/account',(req,res)=> {
    try {
        const {id} = req.body
        if(!id) throw new Error("Please provide id.")
        let result = accountController.deleteAccount(id)
        if(!result) throw new Error("Account not found")
        res.status(200).json({Message: "Deleted account"})
    }catch(error) {
        res.status(401).json({
            Error: error.message
        })
    }
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
import { Router } from "express";
import userModel from '../models/user'
const user = Router()


user.get('/', async (req, res) => {
    const result = await userModel.drinkList()
    res.json(result)
})

user.post('/', async (req, res) => {
    const result = await userModel.addNewDrink(req.body)
    res.json(result)
})

user.get('/:id/comments',async (req, res) => {
    const result = await userModel.printingComments(req.params.id)
    res.json(result)
})

user.post('/:id/comments', async (req, res) => {
    const result = await userModel.addingComments(req.body)
    res.json(result)
})

user.delete('/:id/comments', async (req, res) => {
    const result = await userModel.deleteComment(req.params.id, req.body)
    res.json(result)
})

user.get('/:id', async (req, res) => {
    const result = await userModel.checkIfExist(req.params.id)
    res.json(result)
})

user.delete('/:id', async (req, res) => {
    const result = await userModel.deleteDrink(req.params.id)
    res.json(result)
})

user.put('/:id', async (req, res) => {
    const result = await userModel.editingDrinkForm(req.body)
    res.json(result)
})

user.get('/:id/elements', async (req, res) => {
    const result = await userModel.drinkDetailsElements(req.params.id)
    res.json(result)
})

user.get('/:id/ingredients', async (req, res) => {
    const result = await userModel.drinkDetailsIngredients(req.params.id)
    res.json(result)
})

user.get('/:id/instructions', async (req, res) => {
    const result = await userModel.drinkDetailsInstructions(req.params.id)
    res.json(result)
})

export default user

const neo4j = require('neo4j-driver');
require('dotenv').config()
const {
    url,
    db_username,
    db_password,
    database,
} = process.env
const driver = neo4j.driver(url, neo4j.auth.basic(db_username, db_password));


const drinkList = async () => {
    try {
        const newSession = driver.session({database});
        const transaction = newSession.beginTransaction()
        const result = await transaction.run('MATCH (n:Drink) RETURN n')
        await transaction.commit()
        await newSession.close()
        return result.records
    } catch (error) {
        console.log(error)
    }
}

const printingComments = async (id) => {
    try {
        const identification = Number(id.replace(/\D/g, ''))
        const newSession = driver.session({database});
        const transaction = newSession.beginTransaction()
        const result = await transaction.run(`MATCH (d:Drink)-[:COMMENT]->(c:Comment) WHERE id(d)=${identification} RETURN c ORDER BY id(c) DESC`)
        await transaction.commit()
        await newSession.close()
        return result.records
    } catch (error) {
        console.log(error)
    }
}


const addingComments = async (comment) => {
    try {
        const identification = Number(comment.id.replace(/\D/g, ''))
        const newSession = driver.session({database});
        const transaction = newSession.beginTransaction()
        await transaction.run(`MATCH (d:Drink) WHERE id(d)=${identification} CREATE (c:Comment {text: "${comment.text.toString().replace(/[^a-zA-Z0-9 ]/g, '')}", nickname: "${comment.nickname.toString().replace(/[^a-zA-Z0-9 ]/g, '')}"}) CREATE (d)-[:COMMENT]->(c)`)
        await transaction.commit()
        await newSession.close()
        return comment
    } catch (error) {
        console.log(error)
    }

}

const deleteComment = async (id, comment) => {
    const identification = Number(id.replace(/\D/g, ''))
    const commentIdentification = Number(comment._fields[0].elementId.replace(/\D/g, ''))
    try {
        const newSession = driver.session({database});
        const transaction = newSession.beginTransaction()
        await transaction.run(`MATCH (d:Drink)-[r:COMMENT]->(c:Comment)
WHERE id(d) = ${identification} AND id(c) = ${commentIdentification}
DELETE r, c`)
        await transaction.commit()
        await newSession.close()
        return comment
    } catch (error) {
        console.log(error)
    }
}

const deleteDrink = async (id) => {
    const identification = Number(id.replace(/\D/g, ''))
    try {
        const newSession = driver.session({database});
        const transaction = newSession.beginTransaction()
        const result = await transaction.run(`
MATCH (d:Drink) WHERE id(d) = ${identification}
OPTIONAL MATCH (d)-[r]-()
WITH d, r
DETACH DELETE d, r
WITH d
MATCH (i:Instruction) WHERE NOT (i)--()
DETACH DELETE i
WITH d
MATCH (c:Comment)
DETACH DELETE c
WITH d
MATCH (ig:Ingredient) WHERE NOT (ig)--()
DETACH DELETE ig
`)
        await transaction.commit()
        await newSession.close()
        return result
    } catch (error) {
        console.log(error)
    }
}


const drinkDetailsElements = async (id) => {
    try {
        const identification = Number(id.replace(/\D/g, ''))
        const newSession = driver.session({database});
        const transaction = newSession.beginTransaction()
        const result = await transaction.run(`MATCH (n:Drink) WHERE id(n)=${identification} RETURN n`)
        await transaction.commit()
        await newSession.close()
        return result.records
    } catch (error) {
        console.log(error)
    }
}

const drinkDetailsIngredients = async (id) => {
    const identification = Number(id.replace(/\D/g, ''))
    try {
        const newSession = driver.session({database});
        const transaction = newSession.beginTransaction()
        const result = await transaction.run(`MATCH (d:Drink)-[r:HAS_INGREDIENT]->(i:Ingredient) WHERE id(d)=${identification} RETURN i`)
        await transaction.commit()
        await newSession.close()
        return result.records;
    } catch (error) {
        console.log(error)
    }
}

const drinkDetailsInstructions = async (id) => {
    const identification = Number(id.replace(/\D/g, ''))
    try {
        const newSession = driver.session({database});
        const transaction = newSession.beginTransaction()
        const result = await transaction.run(`MATCH (d:Drink)-[:HAS_INSTRUCTION]->(i:Instruction) WHERE id(d) = ${identification} RETURN i`)
        await transaction.commit()
        await newSession.close()
        return result.records.sort((a, b) => a._fields[0].elementId - b._fields[0].elementId);
    } catch (error) {
        console.log(error)
    }
}


const addNewDrink = async (drink) => {

    try {
        const newSession = driver.session({database});
        const transaction = newSession.beginTransaction()
        const instructionsQueries = drink.instructions
            .split("\n")
            .map(instruction =>
                `MATCH (d:Drink {name: "${drink.name.replace(/[^a-zA-Z0-9 ]/g, '')}"}) CREATE (i:Instruction {instruction: "${instruction.replace(/[^a-zA-Z0-9 ]/g, '')}"}) CREATE (d)-[:HAS_INSTRUCTION]->(i)`
            );
        const ingredientsQueries = drink.ingredients
            .split("\n")
            .map(ingredient =>
                `MATCH (d:Drink {name: "${drink.name.replace(/[^a-zA-Z0-9 ]/g, '')}"}) CREATE (i:Ingredient {name: "${ingredient.replace(/[^a-zA-Z0-9 ]/g, '')}"}) CREATE (d)-[:HAS_INGREDIENT]->(i)`
            );
        await transaction.run(`CREATE (d:Drink {name: "${drink.name.replace(/[^a-zA-Z0-9 ]/g, '')}", type: "${drink.type.replace(/[^a-zA-Z0-9 ]/g, '')}", glass: "${drink.glass.replace(/[^a-zA-Z0-9 ]/g, '')}", img: "${drink.img}"}) RETURN d`)
        for (const query of instructionsQueries) {
            await transaction.run(query)
        }
        for (const query of ingredientsQueries) {
            await transaction.run(query)
        }

        await transaction.commit()
        await newSession.close()
        return drink
    } catch (error) {
        console.log(error)
    }
}


const editingDrinkForm = async (drink) => {
    const identification = Number(drink.id.replace(/\D/g, ''))
    try {
        const newSession = driver.session({database});
        const transaction = newSession.beginTransaction()
        const updateDrinkQuery = `
        MATCH (d:Drink) WHERE id(d) = ${identification}
        SET d.name = "${drink.name.replace(/[^a-zA-Z0-9 ]/g, '')}", d.type = "${drink.type.replace(/[^a-zA-Z0-9 ]/g, '')}", d.glass = "${drink.glass.replace(/[^a-zA-Z0-9 ]/g, '')}", d.img = "${drink.img}"`
        const deleteIngredientQuery = `
        MATCH (d:Drink)-[r:HAS_INGREDIENT]-(i) WHERE id(d) = ${identification}
        DELETE r, i`;
        const deleteInstructionQuery = `
        MATCH (d:Drink)-[r:HAS_INSTRUCTION]-(i) WHERE id(d) = ${identification}
        DELETE r, i`;
        const createIngredientQueries = drink.ingredients
            .split('\n')
            .map(ingredient => `MATCH (d:Drink) WHERE id(d) = ${identification} CREATE (i:Ingredient {name: "${ingredient.replace(/[^a-zA-Z0-9 ]/g, '')}"}) CREATE (d)-[:HAS_INGREDIENT]->(i)`);
        const createInstructionQueries = drink.instructions
            .split('\n')
            .map(instruction => `MATCH (d:Drink) WHERE id(d) = ${identification} CREATE (i:Instruction {instruction: "${instruction.replace(/[^a-zA-Z0-9 ]/g, '')}"}) CREATE (d)-[:HAS_INSTRUCTION]->(i)`);
        await transaction.run(updateDrinkQuery)
        await transaction.run(deleteIngredientQuery)
        await transaction.run(deleteInstructionQuery)
        for (const query of createIngredientQueries) {
            await transaction.run(query)
        }
        for (const query of createInstructionQueries) {
            await transaction.run(query)
        }
        await transaction.commit()
        await newSession.close()
        return drink
    } catch (error) {
        console.log(error)
    }
}

const checkIfExist = async (id) => {
    const identification = Number(id.replace(/\D/g, ''))
    try {
        const newSession = driver.session({database});
        const transaction = newSession.beginTransaction()
        const result = await transaction.run(`MATCH (n:Drink) WHERE id(n)=${identification} RETURN n`)
        await transaction.commit()
        await newSession.close()
        return typeof result.records !== 'undefined' && result.records.length > 0;
    } catch (error) {
        console.log(error)
    }
}


export default {
    drinkList,
    addingComments,
    printingComments,
    deleteComment,
    deleteDrink,
    drinkDetailsElements,
    drinkDetailsIngredients,
    drinkDetailsInstructions,
    addNewDrink,
    editingDrinkForm,
    checkIfExist
}


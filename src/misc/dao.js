import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'

const {readFile, writeFile} = fs.promises 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const databasePath = __dirname + '/database.json'

export const getAllData = async () => {
    const completeData = await readFile(databasePath, 'utf-8')
    return JSON.parse(completeData)
}

export const getObjectArray = async objName => {
    return (await getAllData())[objName]
}

export const overwriteAll = async data => {
    await writeFile(databasePath, JSON.stringify(data), 'utf-8')
    return data
}

export const overwriteObject = async (name, value) => {
    let completeData = await getAllData()
    completeData = {
        ...completeData,
        [name]: value
    }
    await overwriteAll(completeData)
    return completeData
}
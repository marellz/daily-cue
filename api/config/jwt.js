import fs from "fs"
import crypto from "crypto"

const secret = crypto.randomBytes(32).toString('hex')

const envFilePath = '.env'
const key = 'JWT_SECRET'
const entry = `${key}=${secret}\n`

fs.readFile(envFilePath, 'utf-8', (err, data) => {
    let updatedEnv

    if(err){
        if(err.code ==='ENOENT'){
            updatedEnv = entry
        } else {
            console.error('Error reading .env file', err)
            return
        }
    } else {
        const regex = new RegExp(`^${key}=.*`, 'm')
        updatedEnv = data.match(regex) ?
        data.replace(regex, entry.trim()) :
        data + `\n`+entry

        console.log(data)
    }

    fs.writeFile(envFilePath, updatedEnv, 'utf-8', (err) => {
        console.log(envFilePath);
        if(err){
            console.error('Error writing env file:' , err)
        } else {
            console.log(`${key} set successfully to .env file`)
        }
    })
})
import fs from "fs"

const source = process.argv[2]
console.log("Applying environment variables from:", source)
fs.copyFileSync(source, "./.env.local")
console.log("Done.")

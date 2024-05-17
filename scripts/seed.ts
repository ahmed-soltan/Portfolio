
const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient()

async function main(){
    try {
        await database.profile.create({
            data: {
                title:"Hello, My Name is Ahmed Sultan"
            }
                
        })

        console.log("success")
    } catch (error) {
        console.log("Error Seeding Profile" , error);
    }
}

main()


//node scripts/seed.ts
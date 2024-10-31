import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
let clickCount = 0;

export default async function Click(){ 
  
  const dbOutput = (await db.query(`SELECT * FROM clickdata`)).rows;
  clickCount = dbOutput[0].clickcount;

  async function onclickButton(){
    "use server"
    
    // Without using function
    // const fdbOutputF = (await db.query(`SELECT * FROM clickdata`)).rows;
    // clickCount = fdbOutputF[0].increment_clicks;
    // clickCount = clickCount + 1;
    // await db.query(`UPDATE clickdata SET clickcount = $1`,[clickCount]);
    // revalidatePath('/');

    // Using function
    const fdbOutput = (await db.query(`select increment_clicks()`)).rows;
    clickCount = fdbOutput[0].increment_clicks;
    revalidatePath('/');
  
  }

return(
        <>
          <h1 className="text-center text-5xl m-10">Hello All, this is simple click count example</h1>
          <button className="px-2 py-1 text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm m-20"
              onClick={onclickButton}>Click Count: {clickCount}</button>
        </>

);
}


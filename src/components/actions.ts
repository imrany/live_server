
export function openDialog(dialog_id:string){
    let dialog_bg=document.getElementById(dialog_id);
    dialog_bg?.classList.add("ease-in-out");
    dialog_bg?.classList.toggle("none");
    dialog_bg?.classList.add("duration-1000");
    dialog_bg?.classList.add("delay-2000"); 
}

export async function openFile(url:string,path:string){
    try {
        const response=await fetch(url,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                root:path
            })
        })
        const parseRes:any=await response.json()
        if(!response.ok){
            return parseRes
        }
    } catch (error:any) {
        return error
    }
}
import { invoke } from "@tauri-apps/api/tauri";
import { message } from "@tauri-apps/api/dialog";

export async function createWindow(filePath:string, label:string, title:string){
    try{
        let open=await invoke("open_window", { filePath, label, title })
        console.log(open)
    }catch(error:any){
        console.log(error)
        await message(error,{title:`Error`,type:"error"})
    }
}

export function browserSupportedFiles(extension:string){
    let $extension=extension.toUpperCase();
    let supportedFileExts:string[]=["MP4","PDF","JPG","JPEG","SVG","GIF","PNG","JSON","TXT","CSV","MP3","WEBP","HTML","CSS","JS","PHP","XML"]
    if(supportedFileExts.includes($extension)){
        return true
    }else{
        return false
    }
}

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

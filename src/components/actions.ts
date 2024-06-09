import { WebviewWindow } from '@tauri-apps/api/window'
import { message } from "@tauri-apps/api/dialog";

export function createWindow(url:string, label:string){
    const webview = new WebviewWindow(label, {
        url,
    })
    // since the webview window is created asynchronously,
    // Tauri emits the `tauri://created` and `tauri://error` to notify you of the creation response
    webview.once('tauri://created', function () {
        // webview window successfully created
        console.log("success open window")
    })
    webview.once('tauri://error', async function (e:any) {
        // an error occurred during webview window creation
        await message(`${e.payload}`,{title:`Error`,type:"error"})
        console.log("error open window",e)
    })
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

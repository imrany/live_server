import { MdClose } from "react-icons/md";
import { Content } from "../types/definitions";

type Props={
    data:{
        info:Content,
        functions:{
            toggleDialog:any
        }
    }
}

export function FileInfoDialog(props:Props){
    return(
        <div id={`file_info_dialog`} className="fixed top-0 bottom-0 left-0 right-0 z-20 bg-[#151515]/70 none">
            <div className="flex flex-col justify-center items-center h-[100vh]">
                <div id="dialog" className="items-center flex flex-col bg-[#252525] justify-center p-[24px] focus:ring-1 focus:ring-violet-300">
                    <div className="flex ml-auto mb-[8px] justify-end h-[22px] pb-[4px] text-white">
                        <MdClose onClick={()=>props.data.functions.toggleDialog(`file_info_dialog`)} className="md-16 cursor-pointer"/>
                    </div>    
                    <div className="w-[452px] h-[132px]"> 
                        <div className="flex flex-col gap-3 pb-4 text-[13px]  text-gray-300">
                            <div className="flex gap-14">
                                <p>Name:</p>
                                {props.data.info.name.length>30?(
				  <p>{props.data.info.name.slice(0,33)}...</p>
				):(
				  <p>{props.data.info.name}</p>
				)}
                            </div>
                            {props.data.info.metadata.is_file===true?(
                                <div className="flex gap-16">
                                    <p>Type:</p> 
                                    <p className="uppercase">{props.data.info.metadata.file_extension}</p>
                                </div>
                            ):(
                                <div className="flex gap-16">
                                    <p>Type:</p> 
                                    <p className="capitalize">{props.data.info.metadata.file_extension}</p>
                                </div>
                            )}
                            <div className="flex gap-10">
                                <p>Location:</p> 
                                <p>{props.data.info.path.slice(0,props.data.info.path?.lastIndexOf("/"))}</p>
                            </div>
                        </div>
                        <div className="flex justify-end items-center">
                            <button onClick={()=>props.data.functions.toggleDialog(`file_info_dialog`)} className="mr-[12px] py-[4px] px-[16px] hover:bg-[#EDFFA1] border-none h-[28px] w-[100px] text-[13px] text-[#1D1D1D] rounded-sm bg-[#EDFFA5]">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function OpenFolderDialog(){
    const close_dialog=()=>{
        let dialog_bg=document.getElementById("open_folder_dialog");
        dialog_bg?.classList.add("ease-in-out");
        dialog_bg?.classList.toggle("none");
        dialog_bg?.classList.add("duration-1000");
        dialog_bg?.classList.add("delay-2000");
    };
    function handleOpenFolder(e: any): void {
        e.preventDefault()
        let path:string=e.target.path.value;
        if(path.includes("\\")){
            // Replace backslashes with forward slashes
            path = path.replace(/\\/g, "/")
        }
        localStorage.setItem("path",path);
        e.target.reset()
        window.location.reload()
    }

    return(
        <div id="open_folder_dialog" className="fixed top-0 bottom-0 left-0 right-0 z-20 bg-[#151515]/70 none">
            <div className="flex flex-col justify-center items-center h-[100vh]">
                <div id="dialog" className="text-white items-center flex flex-col bg-[#252525] justify-center p-[24px] focus:ring-1 focus:ring-violet-300">
                    <div className="flex ml-auto mb-[8px] justify-end h-[22px] pb-[4px] text-white">
                        <MdClose onClick={close_dialog} className="w-[20px] h-[20px] cursor-pointer"/>
                    </div>    
                    <form onSubmit={handleOpenFolder} className="w-[452px] h-[90px]"> 
                        <div id="feedback_container">
                            <label htmlFor="path" className="text-white font-medium text-base">Enter or paste the folder's path</label>
                            <div className="flex gap-2 mt-2">
                                <input id="path" name="path" className="px-2 py-1 w-full rounded-sm text-black border-violet-300 border-[1px] focus:ring-1 focus:ring-violet-300" type="text" placeholder="C:/.../Downloads" required/>
                                <button className="py-1 px-[16px] hover:bg-[#EDFFA1] border-none w-[100px] text-[#1D1D1D] rounded-sm bg-[var(--theme-yellow)]">
                                    Open
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

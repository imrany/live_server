import { useEffect } from "react"
import { FaGithub, FaTwitter, FaWhatsapp } from "react-icons/fa"
import { MdArrowForward, MdFolder, MdMail, MdRefresh } from "react-icons/md"
import { openDialog } from "../components/actions"

type Props={
    data:{
        backgroundImage:string,
    }
}
export default function LandingPage(props:Props){
    let previous:any=localStorage.getItem("previous")===null?"":localStorage.getItem("previous")
   
    useEffect(()=>{
		document.title="Welcome to Anvel"
    },[])
    return(
        <div style={!props.data.backgroundImage.includes("primary-01")&&props.data.backgroundImage!=="default"?{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url('${props.data.backgroundImage}') top no-repeat`, backgroundSize:"cover", backgroundAttachment:"fixed"}:props.data.backgroundImage==="default"?{background: "var(--primary-01)"}:{background: `var(--${props.data.backgroundImage})`}} className="flex flex-col items-center justify-center h-screen w-screen text-[var(--primary-04)]">
            <div className="p-4">
                <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V12M17 19H21M19 17V21" stroke={props.data.backgroundImage==="default"||props.data.backgroundImage.includes("primary-01")?"black":"white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div style={props.data.backgroundImage==="default"||props.data.backgroundImage.includes("primary-01")?{}:{color:"white"}}>
                <p className="font-semibold text-2xl text-center">Welcome to Anvel ! </p>
                <div className="mt-4 lg:w-[40vw] md:w-[60vw] max-md:px-[10vw] text-[14px]">
                    <p>
                        Anvel is an open-source, cross platform program that lets people share files and folders.
                        This program enables you to share files with collegues on your local network. 
                    </p>
                    <div className="mt-8 w-full">
                        <div className="flex items-center justify-center gap-2">
                            {previous.length===0?(
                                <button onClick={()=>{
                                    localStorage.setItem("path","home")
                                    window.location.reload()
                                }} className="flex gap-2 text-[#252525] flex-grow items-center justify-center h-[35px] w-fit px-[20px] font-semibold rounded-sm bg-[var(--yellow-primary-01)] active:bg-[var(--yellow-primary-02)]">
                                    <span>Quick Start</span>
                                    <MdArrowForward className="w-[15px] h-[15px]"/>
                                </button>
                            ):(
                                <button onClick={()=>{
                                    localStorage.setItem("path",previous)
                                    window.location.reload()
                                }} className="flex gap-2 text-[#252525] flex-grow items-center justify-center h-[35px] w-fit font-semibold px-[20px] rounded-sm bg-[var(--yellow-primary-01)] active:bg-[var(--yellow-primary-02)]">
                                    <MdRefresh className="w-[20px] h-[20px]"/>
                                    <span>Open Recent Folder</span>
                                </button>
                            )}
                            <button onClick={()=>openDialog("open_folder_dialog")} className="flex gap-2 text-[#252525] flex-grow items-center justify-center h-[35px] w-fit px-[20px] rounded-sm bg-[var(--yellow-primary-01)] active:bg-[var(--yellow-primary-02)] font-semibold">
                                <MdFolder className="w-[20px] h-[20px]"/>
                                <span>Open Folder</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between lg:w-[40vw] md:w-[60vw] max-md:px-[10vw] mt-20 mb-4" style={props.data.backgroundImage==="default"||props.data.backgroundImage.includes("primary-01")?{}:{color:"white"}}>
                <a href="https://github.com/imrany/anvel" target="_blank" title="https://github.com/imrany/anvel" rel="noopener noreferrer" className="flex gap-1 items-center justify-center">
                    <FaGithub className="w-[16px] h-[16px]"/>
                    <span className="mt-1">Contribute on github</span>
                    <MdArrowForward className="mt-1"/>
                </a>
                <a href="https://twitter.com/matano_imran" title="@matano_imran" target="_blank" rel="noopener noreferrer" className="flex gap-1 items-center justify-center">
                    <FaTwitter className="w-[16px] h-[16px]"/>
                    <span className="mt-1">Twitter</span>
                </a>
                <a href="mailto:imranmat254@gmail.com" title="Send email to imranmat254@gmail.com" target="_blank" rel="noopener noreferrer" className="flex gap-1 items-center justify-center">
                    <MdMail className="w-[16px] h-[16px]"/>
                    <span className="mt-1">Email</span>
                </a>
                <a href="https://wa.me/254734720752" title="Send text on whatsapp" target="_blank" rel="noopener noreferrer" className="flex gap-1 items-center justify-center">
                    <FaWhatsapp className="w-[16px] h-[16px]"/>
                    <span className="mt-1">Whatsapp</span>
                </a>
            </div>
        </div>
    )
}

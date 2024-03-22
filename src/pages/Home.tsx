import { MdArrowBack, MdClose, MdContentCopy, MdDelete, MdEdit, MdFolder, MdInfoOutline, MdOpenInNew, MdSend, MdSettings } from "react-icons/md";
import Footer from "../components/Footer";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import { useEffect, useState } from "react";
import { ErrorBody, Folder, Configurations , Content, Notifications, ChooseBackground, NetworkInformation, SendFileInfo } from "../types/definitions"
import { openFile } from "../components/actions";
import { useNavigate } from "react-router-dom";
import unknownFile from "../assets/icons/filetype/application-x-zerosize.svg";
import audioMp3 from "../assets/icons/filetype/audio-mp3.svg";
import videoMp4 from "../assets/icons/filetype/application-vnd.rn-realmedia.svg"
import PDF from "../assets/icons/filetype/application-pdf.svg"
import DOCX from "../assets/icons/filetype/application-x-kword.svg"
import DOC from "../assets/icons/filetype/application-x-kword.svg"
import TXT from "../assets/icons/filetype/application-text.svg"
import ISOIMAGE from "../assets/icons/filetype/application-x-raw-disk-image.svg"
import PPTX from "../assets/icons/filetype/application-vnd.ms-powerpoint.svg"
import MKV from "../assets/icons/filetype/video-x-matroska.svg"
import AVI from "../assets/icons/filetype/video-x-wmv.svg"
import CSV from "../assets/icons/filetype/text-csv.svg"
import XLSX from "../assets/icons/filetype/libreoffice-oasis-spreadsheet.svg"
import PSD from "../assets/icons/filetype/image-vnd.adobe.photoshop.svg"
import DESKTOP from "../assets/icons/filetype/application-x-desktop.svg"
import OLD from "../assets/icons/filetype/application-x-trash.svg"
import ZIP from "../assets/icons/filetype/application-zip.svg"
import HTML from "../assets/icons/filetype/text-html.svg"
import CSS from "../assets/icons/filetype/text-css.svg"
import XML from "../assets/icons/filetype/text-xml.svg"
import PHP from "../assets/icons/filetype/application-x-php.svg"
import PYTHON from "../assets/icons/filetype/text-x-python.svg"
import SCRIPT from "../assets/icons/filetype/text-x-script.svg"
import JAVA from "../assets/icons/filetype/text-x-java.svg"
import CSHARP from "../assets/icons/filetype/text-csharp.svg"
import CPP from "../assets/icons/filetype/text-x-c++src.svg"
import PERL from "../assets/icons/filetype/application-x-perl.svg"
import CHEADER from "../assets/icons/filetype/text-x-chdr.svg"
import C from "../assets/icons/filetype/text-x-csrc.svg"
import RUBY from "../assets/icons/filetype/application-x-ruby.svg"
import EXE from "../assets/icons/filetype/application-octet-stream.svg"
import SYS from "../assets/icons/filetype/application-octet-stream.svg"
import APK from "../assets/icons/filetype/android-package-archive.svg"
import JS from "../assets/icons/filetype/application-javascript.svg"
import SQL from "../assets/icons/filetype/application-sql.svg"
import DEB from "../assets/icons/filetype/application-x-deb.svg"
import LNK from "../assets/icons/filetype/libreoffice-oasis-web-template.svg"

import FolderImage from "../assets/icons/folder.png";
import bg1 from "../assets/background/bg_1.png";
import { FileInfoDialog } from "../components/dialogs";
// import bg2 from "../assets/background/bg_2.png";

type Props={
    data:{
        backgroundImage:string,
        changeBackground:any
    }
}
export default function Home(props:Props){
    const navigate=useNavigate()
    let [name,setName]=useState("")
    let [counter,setCounter]=useState(0)
    let [isLoading,setIsLoading]=useState(true)
    let [loadingText,setLoadingText]=useState("Loading...")
    let [isLoadingNetInfo,setIsLoadingNetInfo]=useState(true)
    let [infoContent,setInfoContent]=useState<Content>({
        name:"",
        root:"",
        path:"",
        metadata:{
            is_file:false,
            file_extension:""
        }
    })
    let [showSettings,setShowSettings]=useState(false)
    let [showSettingsTab,setShowSettingsTab]=useState(false)
    let [startRequestLoop,setStartRequestLoop]=useState(false)
    let [settingsHeader,setSettingsHeader]=useState("")
    let [networkInformation,setNetworkInformation]=useState<NetworkInformation>(
        {
            internal:"",
            external:""
        }
    )
    let unparsedConfigurations:any=window.localStorage.getItem("configurations")===null?JSON.stringify({
        recipient_ip:""
    }):window.localStorage.getItem("configurations")
    let parsedConfigurations:Configurations=JSON.parse(unparsedConfigurations)
    let [configurations,setConfigurations]=useState<Configurations>({
        recipient_ip:parsedConfigurations.recipient_ip
    })
    let [folders,setFolders]=useState<Folder>({
        contents:[
            {
                name:"",
                root:"",
                path:"",
                metadata:{
                    is_file:false,
                    file_extension:""
                }
            }
        ]
    })
    let [notifications,setNotifications]=useState<Notifications[]>([
        {
            priority:"",
            message:""
        }
    ])
    let [contents,setContents]=useState<Content[]>([
        {
            name:"",
            root:"",
            path:"",
            metadata:{
                is_file:false,
                file_extension:""
            }
        }
    ])
    let [error,setError]=useState<ErrorBody>({
        message:""
    })

    let chooseBackground:ChooseBackground[]=[
        {
            name:"Background Image 1",
            image:bg1
        },
        // {
        //     name:"Background Image 2",
        //     image:bg2
        // }
    ]

    async function open(url:string){
        setLoadingText("Loading...")
        try {
            //setIsLoading(true)
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    root:localStorage.getItem("path")
                })
            })
    		document.title=localStorage.getItem("path")?`${localStorage.getItem("path")}`:"Anvel • Home"
            let path:any=localStorage.getItem("path");
            let parts = path.split("/");
            setName(parts[parts.length - 1]);
            const parseRes:any=await response.json()
            if(response.ok){
                let withOutDotConfig:Folder={
                    contents:[]
                }
                parseRes.contents.forEach((content:Content) => {
                   if(content.name.slice(0,1)!=="."){
                    withOutDotConfig.contents.push(content)
                   }
                });
                setFolders(withOutDotConfig)
	    	    setContents(withOutDotConfig.contents)
            }else{
                setError(parseRes)
                navigate(`/error?error=${parseRes.message}`)
            }
            setIsLoading(false)
        } catch (error:any) {
            console.error(error.message)
            setIsLoading(false)
            navigate(`/error?error=${error.message}`)
        }
    }

    async function getIPs(url:string){
        try {
            setIsLoadingNetInfo(true)
            const response=await fetch(url,{
                method:"GET",
            })
            const parseRes:any=await response.json()
            if(response.ok){
                setNetworkInformation(parseRes)
            }else{
                setError(parseRes)
                // navigate(`/error?error=${parseRes.message}`)
            }
            setIsLoadingNetInfo(false)
        }catch(error:any){
            console.log(error.message)
            navigate(`/error?error=${error.message}`)
        }
    }

    async function sendFile(url:string,info:SendFileInfo){
        setLoadingText("Sending...")
        console.log(info.recipient_server)
        try{
            setIsLoading(true)
            let response=await fetch(url,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    file_name:info.name,
                    file_path:info.path,
                    recipient_server: info.recipient_server,
                })
            })
            let parseRes=await response.json()
            if(response.ok){
                console.log(parseRes)
            }else{
                console.log(parseRes)
            }
            setIsLoading(false)
        }catch(error:any){
            console.log(error.message)
            navigate(`/error?error=${error.message}`)
        }
    }

    function onlyFolders(){
	    let arr:Folder={
            contents:[]
        }
        contents.map((content)=>{
            if(!content.metadata.is_file){
                arr.contents.push(content)
            }
            setFolders(arr)
        })
    }

    function onlyFiles(){
        let arr:Folder={
            contents:[]
        }
        contents.map((content)=>{
            if(content.metadata.is_file){
                arr.contents.push(content)
            }
            setFolders(arr)
        })
    }

    function showToast(id:string){
        let toast=document.getElementById(id)
        toast?.classList.contains("none")?toast?.classList.remove("none"):toast?.classList.add("none")
    }

    function toggleDialog(id:string){
        let dialog_bg=document.getElementById(id);
        dialog_bg?.classList.add("ease-in-out");
        dialog_bg?.classList.toggle("none");
        // dialog_bg?.classList.add("duration-1000");
        // dialog_bg?.classList.add("delay-2000");
    }

    function handleShowSettings(){
        setShowSettings(true)
        setShowSettingsTab(true)
        setStartRequestLoop(false)
        setSettingsHeader("Settings - Anvel")
    }

    function handleCloseSettings(){
        setSettingsHeader("")
        setShowSettings(false)
    }
    
    function toggleShowCloseBtn(id:string){
        let closeBtn=document.getElementById(id)
        closeBtn?.classList.contains("none")?closeBtn?.classList.remove("none"):closeBtn?.classList.add("none")
    }

    function kickOffStartRequestLoop(){
        setStartRequestLoop(true)
    }

    function endStartRequestLoop(){
        setStartRequestLoop(false)
    }

    if(startRequestLoop===true){
        let maxRequest=2
        for (let i = 0; i < maxRequest; i++) {
            setTimeout(() => {
                setCounter(i)
            }, 500);
        }
    }

    useEffect(()=>{
        open("http://localhost:8000/api/directory_content")
        getIPs("http://localhost:8000/api/get_ip_address")
        setNotifications([
            {
                priority:"not important",
                message:"Hello welcome to anvel, contact our support via imranmat254@gmail.com for help."
            },
            {
                priority:"not important",
                message:"Turn on Hotspot or WIFI and connect with other person using anvel."
            },
            {
                priority:"important",
                message:"Zero connections"
            },
        ])
	},[counter])
    return(
        <>
            {isLoading?(
                <div className="bg-white text-[var(--theme-dark)] flex flex-col h-screen w-screen items-center justify-center">
                    <p className="text-lg">{loadingText}</p>
                </div>
            ):(
                <div style={props.data.backgroundImage!=="default"?{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url('${props.data.backgroundImage}') top no-repeat`, backgroundSize:"cover", backgroundAttachment:"fixed"}:{background: "var(--theme-gray)"}} className="min-h-[100vh]">
                    <TopNav data={{name, handleShowSettings, settingsHeader, showToast}}/>
                    <div className="flex">
                        <SideNav data={{folders,error,open, getIPs, showSettings}}/>
                        <div className="mt-[48px] flex-grow mb-[22px] text-[#999999]">
                            {/*  folder view */}
                            <div id="folder_view">
                                {/* folder view nav */}
                                <div id="folder_view_nav" className="fixed overflow-hidden border-[#3c3c3c]/50 border-l-[1px] left-[199px] right-0 top-[35px]">
                                    <div className="flex w-full bg-[#151515]">
                                        {localStorage.getItem("path")==="/"?"":(
                                            <div onClick={()=>{
                                                let path:any=localStorage.getItem("path")!==null?localStorage.getItem("path"):""
                                                let newPath:any;
                                                if(path.slice(0,path?.lastIndexOf("/"))===""||path.slice(0,path?.lastIndexOf("/")).startsWith("\\:")||!path.slice(0,path?.lastIndexOf("/")).includes("/")&&path!=="Anvel shared"){
                                                    newPath="root"
                                                }else if(path==="Anvel shared"){
                                                    newPath=localStorage.getItem("previous")
                                                }else{
                                                    newPath=path.slice(0,path?.lastIndexOf("/"))
                                                }
                                                localStorage.setItem("path",newPath)
                                                open("http://localhost:8000/api/directory_content")
						endStartRequestLoop()
                                            }} title="Previous" className="bg-[#151515] hover:bg-[#3c3c3c]/55 cursor-pointer pl-[10px] pr-[3px] w-[50px] h-[35px] flex items-center">
                                                <MdArrowBack className="w-[18px] h-[18px] mr-[5px]"/>
                                            </div>
                                        )}

                                        <div onClick={()=>handleCloseSettings()} onMouseEnter={()=>toggleShowCloseBtn(`folder_close_btn`)} onMouseLeave={()=>toggleShowCloseBtn(`folder_close_btn`)} className={showSettings===true?"bg-[#151515] border-dotted border-l-[1px] border-[#3c3c3c]/50 hover:bg-[#3c3c3c]/55 cursor-pointer pl-[10px] pr-[3px] min-w-[128px] h-[35px] flex items-center":"bg-[#1d1d1d] hover:bg-[#3c3c3c]/55 cursor-pointer pl-[10px] pr-[3px] min-w-[128px] h-[35px] flex items-center"}>
                                            <MdFolder className="w-[18px] h-[18px] mr-[5px]"/>
                                            <p className="text-[#E5E5E5] mr-[3px] text-[13px] capitalize root_path_indicator">{name}</p>
                                            <MdClose id="folder_close_btn" className="p-[3px] none w-[22px] h-[22px] bg-[#3c3c3c]/90 ml-auto rounded-sm text-white" onClick={()=>{
                                                localStorage.setItem("path","root");
                                                open("http://localhost:8000/api/directory_content")
                                            }}/>
                                        </div>

                                        {showSettingsTab?(
                                            <div onMouseEnter={()=>toggleShowCloseBtn(`settings_close_btn`)} onMouseLeave={()=>toggleShowCloseBtn(`settings_close_btn`)} className={showSettings!==true?"bg-[#151515] border-dotted border-r-[1px] border-[#3c3c3c]/50 hover:bg-[#3c3c3c]/55 cursor-pointer pr-[3px] min-w-[128px] h-[35px] flex items-center":"bg-[#1d1d1d] hover:bg-[#3c3c3c]/55 cursor-pointer pr-[3px] min-w-[128px] h-[35px] flex items-center"}>
                                                <div className="flex pl-[10px]" onClick={()=>{
                                                    setSettingsHeader("Settings - Anvel")
                                                    setShowSettings(true)
                                                    setStartRequestLoop(false)
                                                }}>
                                                    <MdSettings className="w-[18px] h-[18px] mr-[5px]"/>
                                                    <p className="text-[#E5E5E5] mr-[3px] text-[13px] capitalize">Settings</p>
                                                </div>
                                                <MdClose id="settings_close_btn" className="p-[3px] none w-[22px] h-[22px] bg-[#3c3c3c]/90 ml-auto rounded-sm text-white" onClick={()=>{
                                                    setShowSettings(false)
                                                    setShowSettingsTab(false)
                                                    setSettingsHeader("")
                                                }}/>
                                            </div>
                                        ):""}
                                    </div>
                                </div>
                                {!showSettings?(
                                    <div className="w-full flex flex-wrap mt-[35px]" id="folder_view_body">
                                        <div id="test" className="ml-[200px] grid max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full gap-4 px-[25px] py-[13px]">
                                            { folders&&folders.contents.map((content)=>{
                                                let fileIcon
                                                let downloadURL=`http://localhost:8000/api/download/${content.path}`
                                                switch (content.metadata.file_extension) {
                                                    case "apk":
						        fileIcon=APK
							break;
						    case "APK":
						        fileIcon=APK
							break;
						    case "sys":
						        fileIcon=SYS
							break
						    case "exe":
						        fileIcon=EXE
							break
						    case "mp3":
                                                        fileIcon=audioMp3
                                                        break;
                                                    case "jpeg":
                                                        fileIcon=downloadURL
                                                        break;
						    case "deb":
						        fileIcon=DEB;
							break;
						    case "lnk":
						        fileIcon=LNK
							break;
						    case "sql":
						      fileIcon=SQL
						      break
						    case "db":
						       fileIcon=SQL
						       break
						    case "DB":
						       fileIcon=SQL
						       break
                                                    case "psd":
                                                        fileIcon=PSD;
                                                        break;
                                                    case "PSD":
                                                        fileIcon=PSD
                                                        break;
                                                    case "JPEG":
                                                        fileIcon=downloadURL
                                                        break;
                                                    case "svg":
                                                        fileIcon=downloadURL
                                                        break;
                                                    case "ttf":
                                                        fileIcon=TXT
                                                        break;
                                                    case "gif":
                                                        fileIcon=downloadURL
                                                        break;
                                                    case "jpg":
                                                        fileIcon=downloadURL
                                                        break;
                                                    case "JPG":
                                                        fileIcon=downloadURL
                                                        break;
                                                    case "png":
                                                        fileIcon=downloadURL
                                                        break;
                                                    case "PNG":
                                                        fileIcon=downloadURL
                                                        break;
                                                    case "webp":
                                                        fileIcon=downloadURL
                                                        break;
                                                    case "WEBP":
                                                        fileIcon=downloadURL
                                                        break;
                                                    case "pdf":
                                                        fileIcon=PDF
                                                        break;
                                                    case "iso":
                                                        fileIcon=ISOIMAGE
                                                        break; 
                                                    case "img":
                                                        fileIcon=ISOIMAGE
                                                        break; 
                                                    case "old":
                                                        fileIcon=OLD
                                                        break;
                                                    case "docx":
                                                        fileIcon=DOCX
                                                    break;
                                                    case "odp":
                                                        fileIcon=PPTX
                                                    break;
                                                    case "html":
                                                        fileIcon=HTML
                                                    break;
                                                    case "css":
                                                        fileIcon=CSS
                                                    break;
                                                    case "php":
                                                        fileIcon=PHP
                                                    break;
                                                    case "py":
                                                        fileIcon=PYTHON
                                                    break;
                                                    case "xml":
                                                        fileIcon=XML
                                                    break;
                                                    case "js":
                                                        fileIcon=JS
                                                    break;
                                                    case "sh":
                                                        fileIcon=SCRIPT
                                                    break;
                                                    case "odt":
                                                        fileIcon=DOCX
                                                    break;
						    case "ini":
						    	fileIcon=DESKTOP
							break
                                                    case "ods":
                                                        fileIcon=XLSX
                                                    break
                                                    case "doc":
                                                        fileIcon=DOC
                                                    break;
                                                    case "csv":
                                                        fileIcon=CSV
                                                    break;
                                                    case "java":
                                                        fileIcon=JAVA
                                                    break;
                                                    case "cs":
                                                        fileIcon=CSHARP
                                                    break;
                                                    case "cpp":
                                                        fileIcon=CPP
                                                    break;
                                                    case "rs":
                                                        fileIcon=TXT
                                                    break;
                                                    case "s":
                                                        fileIcon=TXT
                                                    break;
                                                    case "json":
                                                        fileIcon=SCRIPT
                                                    break;
                                                    case "c":
                                                        fileIcon=C
                                                    break;
                                                    case "m":
                                                        fileIcon=C
                                                    break;
                                                    case "h":
                                                        fileIcon=CHEADER
                                                    break;
                                                    case "rb":
                                                        fileIcon=RUBY
                                                    break;
                                                    case "fal":
                                                        fileIcon=TXT
                                                    break;
                                                    case "go":
                                                        fileIcon=TXT
                                                    break;
                                                    case "asm":
                                                        fileIcon=TXT
                                                    break;
                                                    case "nim":
                                                        fileIcon=TXT
                                                    break;
                                                    case "pm":
                                                        fileIcon=PERL
                                                    break;
                                                    case "pl":
                                                        fileIcon=PERL
                                                    break;
                                                    case "txt":
                                                        fileIcon=TXT
                                                        break;
                                                    case "md":
                                                        fileIcon=TXT
                                                        break;
                                                    case "zip":
                                                        fileIcon=ZIP
                                                        break;
                                                    case "mp4":
                                                        fileIcon=videoMp4
                                                        break;
                                                    case "mkv":
                                                        fileIcon=MKV
                                                        break;
                                                    case "avi":
                                                        fileIcon=AVI
                                                        break;
                                                    case "pptx":
                                                        fileIcon=PPTX
                                                        break;
                                                    case "xlsx":
                                                        fileIcon=XLSX
                                                        break;
                                                    case "desktop":
                                                        fileIcon=DESKTOP
                                                        break;
                                                    default:
                                                        fileIcon=unknownFile
                                                        break;
                                                }
						let path=content.path
						if(path.includes("\\")){
            					   // Replace backslashes with forward slashes
            					   path = path.replace(/\\/g, "/")
        					}	
                                                return(
                                                    <div key={content.name} className="flex flex-col items-center text-center">
                                                        <button id={content.name} title={content.name}
                                                            onContextMenu={()=>{
                                                                let dropdown_list=document.getElementById(`context_list_${content.name}`);
                                                                dropdown_list?.classList.toggle("block");
                                                            }}
                                                            onDoubleClick={()=>{
                                                                if(!content.metadata.is_file){
                                                                    localStorage.setItem("path",path)
                                                                    open("http://localhost:8000/api/directory_content")
                                                                }else{
                                                                    openFile("http://localhost:8000/api/open",path)
                                                                }
                                                            }}  className='flex flex-col items-center justify-center text-[12px] max-w-[150px] hover:text-white active:text-white focus:bg-[#3c3c3c]/90 focus:text-white dropdown_btn'>
                                                            {content.metadata.is_file?(<img src={fileIcon} alt='file' className='w-[55px] h-[55px]'/>):(<img src={FolderImage} alt='folder' className='w-[65px] h-[65px]'/>)}
                                                            <div className='flex justify-center'>
                                                                {content.name.length<30?(
                                                                    <p className="w-fit">{content.name}</p>
                                                                ):(
                                                                    <p className="w-fit">{!content.name.includes(" ")?content.name.slice(0,22):content.name.slice(0,30)}...</p>
                                                                )}
                                                            </div>
                                                        </button>
                                                        <div id={`context_list_${content.name}`} className='dropdown-content  flex-wrap  w-[200px] mt-[50px] -ml-[5px] max-lg:-ml-[27px]'>
                                                            <div>
                                                                <div onClick={()=>{
                                                                    if(content.metadata.is_file){
                                                                        openFile("http://localhost:8000/api/open",path)
                                                                    }else{
                                                                        localStorage.setItem("path",path)
                                                                        open("http://localhost:8000/api/directory_content")
                                                                    }
                                                                }} className='px-[12px] py-[8px] flex items-center cursor-pointer hover:bg-[#3c3c3c]/35 active:bg-[#3c3c3c]/35 {name_str}_open_item'>
                                                                    <MdOpenInNew className="w-[25px] h-[25px] pr-[6px]"/>
                                                                    <p>Open</p>
                                                                </div>
                                                                <button onClick={()=>{
                                                                    navigator.clipboard.writeText(path)
                                                                }} className='px-[12px] w-full py-[8px] flex items-center cursor-pointer hover:bg-[#3c3c3c]/35 active:bg-[#3c3c3c]/35 {name_str}_open_item'>
                                                                    <MdContentCopy className="w-[25px] h-[25px] pr-[6px]"/>
                                                                    <p>Copy Path</p>
                                                                </button>
                                                                <button onClick={()=>{
                                                                    navigator.clipboard.writeText(path)
                                                                }} className='px-[12px] w-full py-[8px] flex items-center cursor-pointer hover:bg-[#3c3c3c]/35 active:bg-[#3c3c3c]/35 {name_str}_open_item'>
                                                                    <MdEdit className="w-[25px] h-[25px] pr-[6px]"/>
                                                                    <p>Rename</p>
                                                                </button>
                                                                {content.metadata.is_file&&localStorage.getItem("path")!=="shared"?(
                                                                    <div onClick={()=>{
                                                                        if(configurations.recipient_ip.length===0){
                                                                            handleShowSettings()
                                                                        }else{
                                                                            let sendFileInfo:SendFileInfo={
                                                                                name:content.name,
                                                                                path,
                                                                                recipient_server:`http://${configurations.recipient_ip}:8000/api/receive`
                                                                            };
                                                                            sendFile("http://localhost:8000/api/send",sendFileInfo)
                                                                        }
                                                                    }} className='px-[12px] w-full py-[8px] flex items-center cursor-pointer hover:bg-[#3c3c3c]/35 active:bg-[#3c3c3c]/35 {name_str}_open_item'>
                                                                        <MdSend className="w-[25px] h-[25px] pr-[6px]"/>
                                                                        <p>{configurations.recipient_ip.length!==0?(
                                                                            <span>Send to {configurations.recipient_ip}</span>
                                                                        ):(
                                                                            <span>Add Recipient's IP</span>
                                                                        )}</p>
                                                                    </div>
                                                                ):""}
                                                                <button onClick={()=>{
                                                                    navigator.clipboard.writeText(path)
                                                                }} className='px-[12px] w-full py-[8px] flex items-center cursor-pointer hover:bg-[#3c3c3c]/35 active:bg-[#3c3c3c]/35 {name_str}_open_item'>
                                                                    <MdDelete className="w-[25px] h-[25px] pr-[6px]"/>
                                                                    <p>Delete</p>
                                                                </button>
                                                                <button onClick={()=>{
                                                                    toggleDialog(`file_info_dialog`)
                                                                    setInfoContent(content)
                                                                }} className='px-[12px] w-full py-[8px] flex items-center border-t-[1px] border-[#9999991A] cursor-pointer hover:bg-[#3c3c3c]/35 active:bg-[#3c3c3c]/35'>
                                                                    <MdInfoOutline className="w-[25px] h-[25px] pr-[6px]"/>
                                                                    <p>Properties</p>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ):(
                                    <div className="w-full flex flex-wrap mt-[35px]" id="settings_view">
                                        <div className="ml-[200px] flex flex-col w-full gap-x-4 gap-y-12 px-[25px] py-[13px]">
                                            <div>
                                                <p className="text-white text-lg mb-2">Network Information</p>
                                                <div className="flex gap-6 flex-col">
                                                    <div>
                                                        <div className="flex flex-col gap-2 my-2">
                                                            {isLoadingNetInfo?(
                                                                <i className="text-sm">Getting Network Information...</i>
                                                            ):(
                                                                <>
                                                                    {networkInformation.internal.length===0?(<>{error.message}</>):(
                                                                        <>
                                                                            <div className="grid grid-cols-4 gap-10">
                                                                                <p>Internet Protocol (IP)</p>
                                                                                <p className="text-white">{networkInformation.internal}</p>
                                                                            </div>
                                                                            {networkInformation.external.includes("No internet")?"":(
                                                                                <div className="grid grid-cols-4 gap-10">
                                                                                    <p>External IP</p>
                                                                                    <p className="text-white">{networkInformation.external}</p>
                                                                                </div>
                                                                            )}
                                                                            <div className="grid grid-cols-4 gap-10">
                                                                                <p>Port (number)</p>
                                                                                <p className="text-white">8000</p>
                                                                            </div>
                                                                            <div className="grid grid-cols-4 gap-10">
                                                                                <p>Server (host)</p>
                                                                                <a href={`http://${networkInformation.internal}:8000/`} target="_blank" rel="noopener noreferrer" className="text-white underline">http://{networkInformation.internal}:8000/</a>
                                                                            </div>
                                                                            <div className="grid grid-cols-4 gap-10">
                                                                                <p>Status</p>
                                                                                <p className="text-white">{networkInformation.external.includes("No internet")?"Offline":"Online"}</p>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </>
                                                            )}
                                                        
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-100">Configurations</p>
                                                        <form onSubmit={(e:any)=>{
                                                            e.preventDefault()
                                                            let configs:Configurations={
                                                                recipient_ip:e.target.recipient_ip.value
                                                            }
                                                            setConfigurations(configs)
                                                            window.localStorage.setItem("configurations",JSON.stringify(configs))
                                                        }} className="flex flex-col gap-2 my-2">
                                                                {configurations.recipient_ip.length===0?(
                                                                    <div className="grid grid-cols-4 gap-10">
                                                                        <label htmlFor="recipient_ip">Enter Recipient's IP</label>
                                                                        <input id="recipient_ip" name="recipient_ip" className="px-2 py-1 w-full rounded-md bg-transparent text-white border-violet-300 border-[1px] focus:ring-1 focus:ring-violet-300" type="text" placeholder="192.10.0.95" required/>
                                                                    </div>
                                                                ):(
                                                                    <div className="grid grid-cols-4 gap-10">
                                                                        <p>Recipient's IP</p>
                                                                        <p className="text-white">{configurations.recipient_ip}</p>
                                                                    </div>
                                                                )}
                                                            <div className="grid grid-cols-4 gap-10">
                                                                <label htmlFor="both_folder_and_file">Send Both Folder and File</label>
                                                                <input disabled id="both_folder_and_file" name="both_folder_and_file" checked type="checkbox" className="h-[20px] w-[20px] cursor-pointer rounded-md bg-transparent focus:outline-none checked:bg-violet-300 focus:ring-1 focus:ring-violet-300" />
                                                            </div>
                                                            {configurations.recipient_ip.length===0?(
                                                                <button className="py-1 px-[16px] hover:bg-[#EDFFA1] border-none w-[100px] text-[#1D1D1D] rounded-sm bg-[var(--theme-yellow)]">
                                                                    Save
                                                                </button>
                                                            ):(
                                                                <button type="button" onClick={()=>{
                                                                    setConfigurations({
                                                                        recipient_ip:""
                                                                    })
                                                                }} className="py-1 px-[16px] hover:bg-[#EDFFA1] border-none w-[100px] text-[#1D1D1D] rounded-sm bg-[var(--theme-yellow)]">
                                                                    Change
                                                                </button>
                                                            )}
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-white text-lg mb-2">User Preference</p>
                                                <div className="flex flex-col">
                                                    <p>Choose Background image</p>
                                                    <div className="flex max-sm:flex-col gap-2 my-2">
                                                        <button onClick={()=>props.data.changeBackground("default")} style={{boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)"}} className="bg-[#252525] flex justify-center items-center rounded-md h-[200px] hover:text-white w-[240px]">
                                                            <p className="text-base text-gray-100">Default</p>
                                                        </button>
                                                        <div className="flex max-sm:flex-col gap-2">
                                                            {chooseBackground.map((choice)=>{
                                                                return(
                                                                    <button key={choice.name} onClick={()=>props.data.changeBackground(choice.image)} style={{boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('${choice.image}') center no-repeat`, backgroundSize:"cover"}} className={`hover:text-white flex justify-center items-center rounded-md h-[200px] w-[240px]`}>
                                                                        <p className="text-base text-gray-100">{choice.name}</p>
                                                                    </button>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <FileInfoDialog data={{info:infoContent,functions:{toggleDialog}}}/>
                    <Footer data={{folders, onlyFolders, onlyFiles, open, handleShowSettings, notifications, showToast, handleCloseSettings, kickOffStartRequestLoop, endStartRequestLoop}}/>
                </div>
            )}
        </>
    )
}

import { Link } from "react-router-dom";
import { Folder, Notifications } from "../types/definitions";
import { MdClose, MdFileOpen, MdFolder, MdFolderShared, MdNotifications, MdOutlineNotifications, MdOutlineNotificationsActive, MdOutlineNotificationsOff, MdSettings } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TbCircleX } from "react-icons/tb";
import {motion, AnimatePresence} from "framer-motion";

type Props={
    data:{
        folders:Folder,
        onlyFolders:any,
        onlyFiles:any,
        open:any,
        handleShowSettings:any,
        showToast:any,
        handleCloseSettings:any,
        kickOffStartRequestLoop:any,
        endStartRequestLoop:any,
        notifications:Notifications[]
    }
}
export default function Footer(props:Props){
    let folderCount=[]
    let fileCount=[]
    let notification_off:any=localStorage.getItem("notification_off")
    let notificationOff:boolean=JSON.parse(notification_off)
    let [showNotificationAlertBtn,setShowNotificationAlertBtn]=useState(false)

    props.data.folders.contents.forEach((item)=>{
        if(!item.metadata.is_file){
            folderCount.push(item)
        }else{
            fileCount.push(item)
        }
    })

    function hideSingleNotifications(){
        if(notificationOff===true){
            setShowNotificationAlertBtn(true)
            let single_notifications:any=document.getElementById("single_notifications")
            if(single_notifications.classList.contains("none")===false){
                single_notifications.classList.add("none")
            }
        }else{
            setShowNotificationAlertBtn(false)
        }
    }

    useEffect(()=>{
        hideSingleNotifications()
    },[showNotificationAlertBtn])
    return(
        <footer className="fixed bottom-0 h-[26px] bg-[var(--yellow-primary-01)] text-[#252525]  left-0 right-0">
            <div className="flex">
                {/* <p className="px-[5px] py-[2px] text-[13px]">anvel</p> */}
               
                <button onClick={()=>{
                    props.data.handleShowSettings()
                }} onMouseEnter={()=>props.data.showToast("connection_count")} onMouseLeave={()=>props.data.showToast("connection_count")} className="relative inline-block px-[15px] py-[2px] hover:bg-[#EDFFA5]">
                    <span id="connection_count" className="absolute none text-[13px] flex items-center justify-center text-gray-300 bg-[#252525] z-10 -mt-8 border-[1px] border-[var(--theme-gray)] -ml-3 h-[25px] min-w-[150px]">My configurations</span>
                    <div className="flex gap-1 items-center ">
                        <MdSettings className="w-[15px] h-[15px]"/>
                        <span className="text-[13px]">Settings</span>
                    </div>
                </button>

                <div className="flex ml-auto">
                    <div className="flex items-center justify-center">
                        <Link to="/" onMouseEnter={()=>props.data.showToast("sign_up")} onMouseLeave={()=>props.data.showToast("sign_up")} className="relative inline-block px-[15px] py-[2px] hover:bg-[#EDFFA5]">
                            <span id="sign_up" className="text-[13px] absolute none text-gray-300 flex items-center justify-center bg-[#252525] z-10 -mt-8 border-[1px] border-[var(--theme-gray)] -ml-14 h-[25px] min-w-[150px]">Create an account</span>
                            <span className="text-[13px]">Sign up</span>
                        </Link>
                        <Link to="/" onMouseEnter={()=>props.data.showToast("login")} onMouseLeave={()=>props.data.showToast("login")} className="relative inline-block px-[15px] py-[2px] hover:bg-[#EDFFA5]">
                            <span id="login" className="absolute text-[13px] none text-gray-300 flex items-center justify-center bg-[#252525] z-10 -mt-8 border-[1px] border-[var(--theme-gray)] -ml-14 h-[25px] min-w-[150px]">Login to your account</span>
                            <span className="text-[13px]">Login</span>
                        </Link>
                    </div>

                    {/* <div className="flex items-center justify-center text-[13px] border-dotted border-l-[1px] border-gray-500">
                        <button onClick={()=>{
                        }} onMouseEnter={()=>props.data.showToast("connection_count")} onMouseLeave={()=>props.data.showToast("connection_count")} className="relative inline-block px-[15px] py-[2px] hover:bg-[#EDFFA5]">
                            <span id="connection_count" className="absolute none flex items-center justify-center text-gray-300 bg-[#252525] z-10 -mt-8 border-[1px] border-[var(--theme-gray)] -ml-8 h-[25px] min-w-[150px]">My configurations</span>
                            <div className="flex gap-1 items-center ">
                                <MdSettings className="w-[15px] h-[15px]"/>
                                <span>Settings</span>
                            </div>
                        </button>
                    </div> */}

                    <div className="flex items-center justify-center border-dotted border-l-[1px] border-gray-500">
                        <button onClick={()=>{
                           props.data.onlyFolders()
                           props.data.handleCloseSettings()
                           props.data.endStartRequestLoop()
                        }} onMouseEnter={()=>props.data.showToast("folder_count")} onMouseLeave={()=>props.data.showToast("folder_count")} className="relative inline-block px-[15px] py-[2px] hover:bg-[#EDFFA5]">
                            <span id="folder_count" className="absolute text-[13px] none flex items-center justify-center text-gray-300 bg-[#252525] z-10 -mt-8 border-[1px] border-[var(--theme-gray)] -ml-10 h-[25px] min-w-[150px]">{folderCount.length!==0?(<p>View folders : {folderCount.length}</p>):(<p>No folder</p>)}</span>
                            <div className="flex gap-1 items-center">
                                <MdFolder/>
                                <span className="text-[13px]">Folder: {folderCount.length}</span>
                            </div>
                        </button>
                        <button onClick={()=>{
                            props.data.onlyFiles()
                            props.data.handleCloseSettings()
                            props.data.endStartRequestLoop()
                        }} onMouseEnter={()=>props.data.showToast("file_count")} onMouseLeave={()=>props.data.showToast("file_count")} className="relative inline-block px-[15px] py-[2px] hover:bg-[#EDFFA5]">
                            <span id="file_count" className="absolute text-[13px] text-gray-300 none flex items-center justify-center bg-[#252525] z-10 -mt-8 border-[1px] border-[var(--theme-gray)] -ml-10 h-[25px] min-w-[150px]">{fileCount.length!==0?(<p>View files : {fileCount.length}</p>):(<p>No file</p>)}</span>
                            <div className="flex gap-1 items-center ">
                                <MdFileOpen/>
                                <span className="text-[13px]">File: {fileCount.length}</span>
                            </div>
                        </button>
                        <button onClick={()=>{
                            let path:any=localStorage.getItem("path")
                            path!=="Anvel shared"?localStorage.setItem("previous",path):""
                            localStorage.setItem("path","Anvel shared")
                            props.data.open("http://localhost:80/api/directory_content")
                            props.data.handleCloseSettings()
                            props.data.kickOffStartRequestLoop()
                        }} onMouseEnter={()=>props.data.showToast("shared_resources")} onMouseLeave={()=>props.data.showToast("shared_resources")} className="relative inline-block px-[10px] py-[2px] hover:bg-[#EDFFA5]">
                            <span id="shared_resources" className="text-[13px] absolute text-gray-300 none flex items-center justify-center bg-[#252525] z-10 -mt-8 border-[1px] border-[var(--theme-gray)] -ml-3 h-[25px] min-w-[150px]">View shared resources</span>
                            <div className="flex gap-1 items-center ">
                                <MdFolderShared/>
                                <span className="text-[13px]">Shared Resources</span>
                            </div>
                        </button>

                        <div className="relative inline-block">
                            <div id="single_notifications"
                            className="text-gray-300 flex flex-col justify-center z-40 fixed right-2 bottom-8  w-[380px]"
                            >
                                {props.data.notifications.length!==0?(
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col gap-2"
                                    >
                                        <AnimatePresence>
                                            {props.data.notifications.map((notification)=>{
                                                let [message,setMessage]=useState(<>{notification.message.slice(0,30)}...</>)
                                                let [showChevronDown,setShowChevronDown]=useState(false)
                                                let icon
                                                switch (notification.priority) {
                                                    case "important":
                                                        icon=(
                                                            <motion.div
                                                            whileHover={{
                                                                rotateZ: [0, -20, 20, -20, 20, -20, 20, 0],
                                                                transition: { duration: 0.5 },
                                                            }}
                                                            >
                                                                <MdOutlineNotificationsActive className="text-green-500 w-[20px] h-[20px]"/>
                                                            </motion.div>
                                                        )
                                                        break;
                                                
                                                    case "not important":
                                                        icon=(
                                                            <motion.div
                                                            whileHover={{
                                                                rotateZ: [0, -20, 20, -20, 20, -20, 20, 0],
                                                                transition: { duration: 0.5 },
                                                            }}
                                                            >
                                                                <TbCircleX className="text-red-500 w-[20px] h-[20px]"/>
                                                            </motion.div>
                                                        )
                                                        break;
                                                }
                                                return(
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ x: "12rem", opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        layout
                                                        key={notification.message} id={`single_${notification.message}`} style={{boxShadow:"0px 8px 16px 0px rgba(0,0,0,0.3)"}} className="px-[12px] py-2 rounded-md flex gap-2 items-center bg-[var(--primary-01)]">
                                                        {icon}
                                                        <p className="uppercase text-[var(--primary-04)] text-[11px] w-[250px]">{message}</p>
                                                        <div className="ml-auto flex gap-2 items-center">
                                                            {!showChevronDown?(
                                                                <button onClick={()=>{
                                                                    document.getElementById(`single_${notification.message}`)?.classList.replace("py-2","py-3")
                                                                    setShowChevronDown(true)
                                                                    setMessage(<>{notification.message}</>)
                                                                }} className="p-[5px] hover:bg-[var(--primary-03)] flex items-center justify-center rounded-md">
                                                                    <FaChevronUp className="text-gray-400 w-[13px] h-[12px]"/>
                                                                </button>
                                                            ):
                                                                <button onClick={()=>{
                                                                    document.getElementById(`single_${notification.message}`)?.classList.replace("py-3","py-2")
                                                                    setShowChevronDown(false)
                                                                    setMessage(<>{notification.message.slice(0,30)}...</>)
                                                                }} className="p-[5px] hover:bg-[var(--primary-03)] flex items-center justify-center rounded-md">
                                                                    <FaChevronDown className="text-gray-400 w-[13px] h-[12px]"/>
                                                                </button>
                                                            }
                                                            <button 
                                                                onClick={()=>{
                                                                    props.data.showToast(`single_${notification.message}`)
                                                                }} 
                                                                className="p-[5px] hover:bg-[var(--primary-03)] flex items-center justify-center rounded-md"
                                                            >
                                                                <MdClose className="text-gray-400 w-[13px] h-[12px]"/>
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )
                                            })}
                                        </AnimatePresence>
                                    </motion.div>
                                ):
                                    <div id="single_no_new_notifications" className="px-[12px] py-[8px] rounded-md flex items-center bg-[var(--primary-01)]">
                                        <p className="uppercase text-[11px]">No New Notifications</p>
                                        <div className="ml-auto flex gap-2 items-center">
                                            <button onClick={()=>props.data.showToast("single_no_new_notifications")} className="p-[5px] hover:bg-[var(--primary-03)] flex items-center justify-center rounded-md">
                                                <MdClose className="text-gray-400 w-[13px] h-[12px]"/>
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="relative inline-block">
                            <div id="notification_dialog"
                            style={{boxShadow:"0px 8px 16px 0px rgba(0,0,0,0.7)"}} 
                            className="none text-[var(--primary-04)] flex flex-col rounded-md justify-center bg-[var(--primary-03)] z-40 fixed right-2 bottom-8  w-[380px]"
                            >
                                {props.data.notifications.length!==0?
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="px-[12px] border-b-[1px] border-[#9999991A] py-[8px] rounded-t-md flex items-center bg-[var(--primary-01)]">
                                            <p className="uppercase text-[11px]">Notifications</p>
                                            <div className="ml-auto flex gap-2 items-center">
                                                {showNotificationAlertBtn===true?(
                                                    <button title="Turn on notification alerts" onClick={()=>{
                                                        setShowNotificationAlertBtn(false)
                                                        props.data.showToast("notification_dialog")
                                                        localStorage.setItem("notification_off",JSON.stringify(false))
                                                    }} className="p-[5px] hover:bg-[var(--primary-03)] flex items-center justify-center rounded-md">
                                                        <MdOutlineNotifications className="text-gray-400 w-[15px] h-[15px]"/>
                                                    </button>
                                                ):(
                                                    <button  title="Turn off notification alerts" onClick={()=>{
                                                        setShowNotificationAlertBtn(true)
                                                        props.data.showToast("notification_dialog")
                                                        localStorage.setItem("notification_off",JSON.stringify(true))
                                                    }} className="p-[5px] hover:bg-[var(--primary-03)] flex items-center justify-center rounded-md">
                                                        <MdOutlineNotificationsOff className="text-gray-400 w-[15px] h-[15px]"/>
                                                    </button>
                                                )}


                                                <button onClick={()=>props.data.showToast("notification_dialog")} className="p-[5px] hover:bg-[var(--primary-03)] flex items-center justify-center rounded-md">
                                                    <FaChevronDown className="text-gray-400 w-[13px] h-[12px]"/>
                                                </button>
                                            </div>
                                        </div>
                                        {props.data.notifications.map((notification)=>{
                                            let [showChevronDown,setShowChevronDown]=useState(false)
                                            let [message,setMessage]=useState(<>{notification.message.slice(0,30)}...</>)
                                            let icon
                                            switch (notification.priority) {
                                                case "important":
                                                    icon=(
                                                        <motion.div
                                                        whileHover={{
                                                            rotateZ: [0, -20, 20, -20, 20, -20, 20, 0],
                                                            transition: { duration: 0.5 },
                                                        }}
                                                        >
                                                            <MdOutlineNotificationsActive className="text-green-500 w-[20px] h-[20px]"/>
                                                        </motion.div>
                                                    )
                                                    break;
                                            
                                                case "not important":
                                                    icon=(
                                                        <motion.div
                                                        whileHover={{
                                                            rotateZ: [0, -20, 20, -20, 20, -20, 20, 0],
                                                            transition: { duration: 0.5 },
                                                        }}
                                                        >
                                                            <TbCircleX className="text-red-500 w-[20px] h-[20px]"/>
                                                        </motion.div>
                                                    )
                                                    break;
                                            } 
                                            return(
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ x: "12rem", opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    layout onMouseEnter={()=>{
                                                    // props.data.showToast(`btn_${notification.message}`)
                                                }} onMouseLeave={()=>{
                                                    // props.data.showToast(`btn_${notification.message}`)
                                                }} key={notification.message} id={`bar_${notification.message}`} className="px-[12px] py-2 flex gap-2 items-center border-t-[1px] border-[#9999991A] cursor-pointer hover:bg-[#3c3c3c]/20 text-[13px] active:bg-[#3c3c3c]/20">
                                                    {icon}
                                                    <p className="w-[250px]">{message}</p>
                                                    <div id={`btn_${notification.message}`} className="ml-auto flex gap-2 items-center">
                                                        {!showChevronDown?(
                                                            <button onClick={()=>{
                                                                document.getElementById(`bar_${notification.message}`)?.classList.replace("py-2","py-3")
                                                                setShowChevronDown(true)
                                                                setMessage(<>{notification.message}</>)
                                                            }} className="p-[5px] hover:bg-[var(--primary-01)] flex items-center justify-center rounded-md">
                                                                <FaChevronUp className="text-gray-400 w-[13px] h-[12px]"/>
                                                            </button>
                                                        ):
                                                            <button onClick={()=>{
                                                                document.getElementById(`bar_${notification.message}`)?.classList.replace("py-3","py-2")
                                                                setShowChevronDown(false)
                                                                setMessage(<>{notification.message.slice(0,30)}...</>)
                                                            }} className="p-[5px] hover:bg-[var(--primary-01)] flex items-center justify-center rounded-md">
                                                                <FaChevronDown className="text-gray-400 w-[13px] h-[12px]"/>
                                                            </button>
                                                        }
                                                        <button onClick={()=>props.data.showToast(`bar_${notification.message}`)} className="p-[5px] hover:bg-[var(--primary-01)] flex items-center justify-center rounded-md">
                                                            <MdClose className="text-gray-400 w-[13px] h-[12px]"/>
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                    </motion.div>
                                </AnimatePresence>
                                :
                                    <div id="bar_no_new_notifications" className="px-[12px] py-[8px] rounded-md flex items-center bg-[var(--primary-01)]">
                                        <p className="uppercase text-[11px]">No New Notifications</p>
                                        <div className="ml-auto flex gap-2 items-center">
                                            <button onClick={()=>props.data.showToast("bar_no_new_notifications")} className="p-[5px] hover:bg-[var(--primary-01)] flex items-center justify-center rounded-md">
                                                <MdClose className="text-gray-400 w-[13px] h-[12px]"/>
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                            <button onClick={()=>{
                                document.getElementById("single_notifications")?.classList.add("none")
                                props.data.showToast("notification_dialog")
                            }} onMouseEnter={()=>props.data.showToast("notification_toast")} onMouseLeave={()=>props.data.showToast("notification_toast")} className="relative inline-block px-[15px] h-[25px] hover:bg-[#EDFFA5]">
                                {props.data.notifications.length===0?(
                                    <span id="notification_toast" className="absolute text-[13px] text-gray-300 none flex items-center justify-center bg-[#252525] z-10 -mt-8 border-[1px] border-[var(--theme-gray)] -ml-[120px] h-[25px] min-w-[150px]">No New Notifications</span>
                                ):(
                                    <span id="notification_toast" className="absolute text-[13px] text-gray-300 none flex items-center justify-center bg-[#252525] z-10 -mt-8 border-[1px] border-[var(--theme-gray)] -ml-[120px] h-[25px] min-w-[150px]">{props.data.notifications.length} notifications</span>
                                )}
                                <div className="flex gap-1 items-center">
                                    <MdNotifications className="w-[17px] h-[17px]"/>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

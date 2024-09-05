import { MdOutlineAudiotrack, MdClose} from "react-icons/md";
import { useContext } from "react";
import { GlobalContext } from "../context";
import { FaPlay, FaPause } from "react-icons/fa";

type Props={
    data:{
        audioSource:string,
        isPlaying:boolean
    },
    functions:{
        toggleAudioTag:any,
        play:any,
        pause:any
    }
}

export default function AudioTag(props:Props){
    const { API_URL }=useContext(GlobalContext)
    return(
        <>
            {props.data.audioSource.length!==0?(
                <div title={`Playing ${props.data.audioSource.slice(props.data.audioSource.lastIndexOf("/")+1,props.data.audioSource.length)}`} className="fixed bottom-[40px] right-[20px] text-[var(--primary-04)] z-10">
                    <div className="flex gap-x-3 w-[250px] h-[40px] border-[1px] border-[#3c3c3c]/20 items-center text-[13px] rounded-[4px] bg-[var(--primary-06)] cursor-default shadow-sm font-semibold">
                        <div className="flex items-center pl-[6px] gap-x-[6px]">
                            <MdOutlineAudiotrack className="w-[20px] h-[20px]"/>
                            <p>{props.data.audioSource.slice(props.data.audioSource.lastIndexOf("/")+1,props.data.audioSource.lastIndexOf("/")+21)}...</p>
                        </div>
                        <audio id={props.data.audioSource} src={`${API_URL}/api/download/${props.data.audioSource}`}></audio>
                        {props.data.isPlaying===false?(
                            <FaPlay onClick={()=>props.functions.play(props.data.audioSource)} className="w-[10px] cursor-pointer h-[20px]"/>
                        ):(
                            <FaPause onClick={()=>props.functions.pause(props.data.audioSource)} className="w-[10px] cursor-pointer h-[20px]"/>
                        )}
                        <MdClose onClick={()=>{
                            let elem:any=document.getElementById(`${props.data.audioSource}`)
                            elem.pause()
                            props.functions.toggleAudioTag("")
                        }} className="w-[23px] cursor-pointer ml-auto h-[20px] pr-[6px]"/>
                    </div>
                </div>
            ):""}
        </>
    )
}

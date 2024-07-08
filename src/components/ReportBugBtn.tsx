import { IoBugOutline } from "react-icons/io5";

type Props={
    data:{
        status:{
            external:string,
            internal: string
        }
    }
}

export default function ReportBugBtn(props:Props){
return(
    <>
        {!props.data.status.external.includes("No internet")?(
            <div onClick={()=>{
                window.location.href="mailto:imranmat254@gmail.com?subject=Reporting a bug in Anvel"
            }} className="fixed bottom-[40px] right-[20px] text-[var(--primary-04)] z-10">
                <button className="flex justify-center w-[150px] h-[27px] border-[1px] border-[#3c3c3c]/20 items-center text-[13px] rounded-[4px] bg-[var(--primary-06)] cursor-default shadow-sm hover:font-semibold blur-effect">
                    <IoBugOutline className="w-[21px] h-[23px] pr-[6px]"/>
                    <p>Report a bug</p>
                </button>
            </div>
        ):""} 
    </>
)}

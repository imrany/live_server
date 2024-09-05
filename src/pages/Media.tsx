import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function  Media(){
    const navigate=useNavigate();
    const { API_URL }=useContext(GlobalContext)
    
    // Get the query string from the URL
    const queryString = window.location.search;
    // Create a URLSearchParams object
    const urlParams = new URLSearchParams(queryString);
    // Get a specific parameter value
    const file = urlParams.get('file');
    const label:any = urlParams.get('label');

    let extension=label.slice(label.lastIndexOf(".")+1,label.length);
    console.log(extension);

    useEffect(()=>{
		document.title=`Anvel • ${label}`
    },[])
    return(
        <div className="bg-black text-[var(--primary-04)] flex flex-col h-screen w-screen">
            <div className="flex px-[24px] bg-[var(--primary-07)] gap-4 items-center h-[30px]">
                <FaArrowLeftLong className="w-[18px] h-[18px] cursor-pointer" onClick={()=>{
                    navigate("/")
                }}/>
                <p className="text-sm">{label}</p>
            </div>
            <div className="flex items-center justify-center flex-grow">
                {/*<object data={`${API_URL}/api/download/${file}`} className="w-full h-full mb-6 mt-6 mx-2 "></object>*/}
                <video controls={true} autoPlay={true} className="w-full h-full md:h-[95vh]">
                    <source src={`${API_URL}/api/download/${file}`} />
                </video>
            </div>
        </div>
    )
}

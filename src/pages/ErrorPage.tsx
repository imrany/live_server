import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { ErrorBody } from "../types/definitions";

function NotFound() {
    let navigate=useNavigate()
    let [resolveBtn,setResolveBtn]=useState(
        <button onClick={()=>window.location.reload()} className="mr-[12px] py-[4px] px-[16px] hover:bg-[#EDFFA1] border-none font-semibold h-[28px] w-[119px] text-[13px] text-[#1D1D1D] rounded-sm bg-[#EDFFA5]">
            Refresh page
        </button>
    )
    let [errorBody,setErrorBody]=useState<ErrorBody>({
        error_type:"",
        error_code:"",
        message:"",
        solution:(<></>)
    });
    let search:any=useSearchParams()
    let errorQuery=search[0].get("error")
    useEffect(()=>{
        switch (errorQuery) {
            case "Not supported":
                setErrorBody({
                    error_type:"Not supported",
                    error_code:"501",
                    message:"This item or feature might not be supported on the current version, you can update to the lastest version.",
                    solution:(
                        <>
                            If the issue persists,
                            <strong> please contact our support team at </strong>
                            <a href='mailto:imranmat254@gmail.com' className='font-normal underline'>imranmat254@gmail.com</a> for further assistance, making sure to copy the error details below.
                        </>
                    )
                })
            break;
        
            case "Failed to fetch":
                setErrorBody({
                    error_type:"Failed to fetch",
                    error_code:"500",
                    message:"Anvel is not running correctly, please cancel and run again.",
                    solution:(
                        <>
                            If the issue persists,
                            <strong> please contact our support team at </strong>
                            <a href='mailto:imranmat254@gmail.com' className='font-normal underline'>imranmat254@gmail.com</a> for further assistance, making sure to copy the error details below.
                        </>
                    )
                })
            break;

            default:
                setErrorBody({
                    error_type:errorQuery,
                    error_code:"404",
                    message:`${errorQuery}.`,
                    solution:(
                        <>
                            If the issue persists,
                            <strong> please contact our support team at </strong>
                            <a href='mailto:imranmat254@gmail.com' className='font-normal underline'>imranmat254@gmail.com</a> for further assistance, making sure to copy the error details below.
                        </>
                    )
                })
                setResolveBtn(
                    <button onClick={()=>{
                        localStorage.removeItem("path")
                        window.location.href="/welcome"
                    }} className="mr-[12px] py-[4px] px-[16px] hover:bg-[#EDFFA1] border-none font-semibold h-[28px] w-[119px] text-[13px] text-[#1D1D1D] rounded-sm bg-[#EDFFA5]">
                        Try again
                    </button>
                )
            break;
        }
    },[])
    return (
        <div className="flex flex-col w-[100vw] p-[91px] z-9 text-white h-[100vh] justify-center bg-[#0E0E0E]">
            <div className="mb-[8px] pb-[18px]">
                <Link to="/" className="flex items-center font-semibold text-[25px]">
                    <svg width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V12M17 19H21M19 17V21" stroke="#ffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="ml-1">Anvel</span>
                </Link>
            </div>
            <div className="max-w-[528px] flex flex-col">
                <div className="mb-[24px]">
                    <h1 className="font-semibold text-[32px]">Something went wrong</h1>
                </div>
                <p className="text-[13px] text-[#999999] mb-[24px]">
                   {errorBody.message} 
                </p>
                <p className="text-[13px] text-[#999999] mb-[24px]">
                    {errorBody.solution}
                </p>
                <details>
                    <summary className="text-[#999999] cursor-pointer hover:text-white active:text-white focus:text-white text-[13px]">Problem details and configurations</summary>
                    <div className="text-[#999999] bg-[#151515] rounded-sm mt-[24px] p-[24px] text-[13px]">
                        <div className="grid grid-cols-2 gap-6">
                            <p>TypeError: </p>
                            <p>{errorBody.error_type}</p>
                        </div>
                        <div className="mt-[16px] grid grid-rows-2 gap-3">
                            <code className="grid grid-cols-2 gap-6">
                                <span>Status</span> 
                                <span>{errorBody.error_code}</span>
                            </code>
                            <code className="grid grid-cols-2 gap-6">
                                <span>Version</span> 
                                <span>0.1.0</span>
                            </code>
                            <code className="grid grid-cols-2 gap-6">
                                <span>Environment</span>      
                                <span>Local</span>
                            </code>
                        </div>
                    </div>
                </details>
                <div className="flex items-center gap-3 mt-[24px]">
                    {resolveBtn}
                    <button onClick={()=>{
			let previous:any=localStorage.getItem("previous")===null?"":localStorage.getItem("previous")
			if(previous.length!==0){
			   localStorage.setItem("path",previous)
			   navigate("/")
			}else{
			   localStorage.removeItem("path")
			   window.location.href="/welcome"
			}
		    }} className="py-[4px] text-center px-[16px] border-[1px] border-[#343434] font-semibold hover:bg-[#292d39]  hover:text-white h-[28px] w-[119px] text-[13px] text-[#C2C2C2] rounded-sm bg-[#252525]">
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

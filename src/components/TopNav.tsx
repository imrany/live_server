// @flow strict
import { MdEdit, MdExitToApp, MdNotifications, MdOutlineExpandMore, MdSettings,  } from "react-icons/md";
import { openDialog } from "./actions";

type Props={
    data:{
        name:string,
        handleShowSettings:any,
        settingsHeader:string,
        showToast:any
    }
}
function TopNav(props:Props) {
    window.onclick = function(event:any) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('block')) {
                    openDropdown.classList.remove('block');
                }
            }
        }
    }

    function showDropdownMenu(){
        let dropdown_list=document.getElementById("dropdown_list");
        dropdown_list?.classList.toggle("block");
    }
    
    return (
        <nav className="fixed bg-[var(--theme-dark)] top-0 left-0 right-0 z-10">
            <div className="font-semibold text-[13px] flex justify-between h-[35px] items-center">
                <div className="dropdown">
                    <button onClick={showDropdownMenu} className="pl-[12px] justify-start w-[200px] h-[35px] border-[#3c3c3c]/50 border-r-[1px] flex dropbtn items-center py-[4px] px-[12px] cursor-pointer">
                        <p className="dropbtn">Anvel</p>
                        <MdOutlineExpandMore className="w-[25px] h-[25px] dropbtn p-[3px]"/>
                    </button>
                    <div id="dropdown_list"  className="dropdown-content  ml-[12px]">
                        <div onClick={()=>openDialog("open_folder_dialog")} className="px-[12px] py-[8px] flex items-center cursor-pointer hover:bg-[#3c3c3c]/35 active:bg-[#3c3c3c]/35">
                            <MdEdit className="w-[25px] h-[25px] pr-[6px]"/>
                            <p>Open Folder</p>
                        </div>

                        <div onClick={()=>props.data.showToast("notification_dialog")} className="px-[12px] py-[8px] flex items-center cursor-pointer hover:bg-[#3c3c3c]/35 active:bg-[#3c3c3c]/35">
                            <MdNotifications className="w-[25px] h-[25px] pr-[6px]"/>
                            <p>Notifications</p>
                        </div>
                        
                        <div onClick={()=>props.data.handleShowSettings()} className="px-[12px] py-[8px] flex items-center cursor-pointer hover:bg-[#3c3c3c]/35 active:bg-[#3c3c3c]/35">
                            <MdSettings className="w-[25px] h-[25px] pr-[6px]"/>
                            <p>Settings</p>
                        </div>

                        <div onClick={()=>{
                            localStorage.removeItem("path")
                            window.location.href="/welcome"
                        }} className="px-[12px] py-[8px] flex items-center border-t-[1px] border-[#9999991A] cursor-pointer hover:bg-[#3c3c3c]/35 active:bg-[#3c3c3c]/35">
                            <MdExitToApp className="w-[25px] h-[25px] pr-[6px]"/>
                            <p>Exit</p>
                        </div>
                    </div>
                </div>
                <div className="text-[#C2C2C2] h-[35px] justify-center border-[#3c3c3c]/50 border-b-[1px] gap-x-2 py-1 flex-grow flex font-medium items-center">
                    {props.data.settingsHeader.length!==0?(
                        <p className="capitalize">{props.data.settingsHeader}</p>
                    ):(
                        <>
                            <p className="rounded-md bg-[#252525] py-[2px] px-2">Directory</p>
                            <p className="capitalize">{props.data.name}</p>
                        </>
                    )}
                </div>
                {/* <div className="text-[#C2C2C2] flex gap-2 min-w-[10vw] justify-around">
                    more nav link or btn
                </div> */}
            </div>
        </nav>
    );
};

export default TopNav;
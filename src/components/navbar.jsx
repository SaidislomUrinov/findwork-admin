import { Chip, IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaBars, FaCheckCircle, FaCogs, FaListUl, FaMoneyBill, FaNewspaper, FaSearch } from "react-icons/fa";
import { FaBoxesStacked, FaChartSimple, FaMoneyBillTransfer, FaRotate, FaUsers, FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { runRefresh } from "../contexts/user";
function NavLink({ path = '', name = '', icon }) {
    const p = useLocation().pathname;
    const Icon = icon
    return (
        <Link className={`flex rounded-[7px] px-[10px] ${p === path ? 'text-white bg-gradient-to-br from-indigo-400 to-indigo-800' : 'text-blue-gray-500'} items-center relative group justify-start gap-1 w-full min-h-[40px]`} to={path}>
            <Icon className="text-[20px] group-hover:mr-[15px] duration-300" />
            <span className="capitalize text-[15px]">{name}</span>
        </Link>
    )
}
function Navbar() {
    const [open, setOpen] = useState(false);
    const p = useLocation().pathname;
    const dp = useDispatch();
    useEffect(() => {
        setOpen(false);
    }, [p]);
    // 
    return (
        <>
            <div className={`flex items-center z-[3] justify-start duration-300 flex-col gap-[10px] w-[300px] lg:w-1/5 p-[10px] bg-white h-[100vh] fixed lg:relative top-0 ${open ? 'left-0' : 'left-[-300px] lg:left-0'}`}>
                {/*  */}
                <div className="flex items-center min-h-[50px] h-[50px] justify-start gap-[10px] w-full relative bg-gray-50 p-[5px] rounded-[10px]">
                    <IconButton variant="text" color="indigo" className="rounded-full" onClick={() => dp(runRefresh())}>
                        <FaRotate className="text-[20px]" />
                    </IconButton>
                    <p className="text-[20px] uppercase font-bold text-blue-gray-800">Dashbboard</p>
                    {/*  */}
                    <div className={`absolute ${open ? 'right-[5px]' : 'right-[-60px]'} lg:hidden duration-300`}>
                        <IconButton onClick={() => setOpen(!open)}>
                            {!open ? <FaBars /> : <FaXmark />}
                        </IconButton>
                    </div>
                    {/*  */}
                </div>
                {/*  */}
                <div className={`flex select-none items-center justify-start gap-[10px] py-[5px] border-t flex-col w-full h-[100vh] overflow-y-scroll`}>
                    <NavLink path={'/'} name={"Dashboard"} icon={FaChartSimple} />
                    <NavLink path={'/users'} name={"users"} icon={FaUsers} />
                    <NavLink path={'/search-user'} name={"search-user"} icon={FaSearch} />
                    <NavLink path={'/posts'} name={"posts"} icon={FaNewspaper} />
                    <NavLink path={'/search-post'} name={"search-post"} icon={FaSearch} />
                    <NavLink path={'/categories'} name={"categories"} icon={FaListUl} />
                    <NavLink path={'/brands'} name={"brands"} icon={FaCheckCircle} />
                    <NavLink path={'/logout'} name={"logout"} icon={BiLogOut} />
                </div>
                {/*  */}
            </div>
            {/* closer */}
            <div onClick={() => setOpen(false)} className={`left-0 h-[100vh] z-[2] bg-[#0009] fixed top-0 duration-300 ${open ? 'w-full' : 'w-0'} lg:hidden`}></div>
        </>
    );
}

export default Navbar;
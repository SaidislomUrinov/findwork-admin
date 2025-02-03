import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchData } from "../utils/requests";
import { errorMsg, successMsg } from "../utils/msg";
import Fetching from "../components/fetching";
import NoData from "../components/nodata";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { FaPlusCircle } from "react-icons/fa";
import { BiDotsVertical, BiEdit, BiTrash } from "react-icons/bi";

function Categories() {
    const { refresh } = useSelector(e => e?.user);
    const [load, setLoad] = useState(false);
    const [categories, setCategories] = useState([]);
    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        setLoad(false);
        fetchData('GET', '/category/getAll').then(res => {
            const { ok, data, msg } = res.data;
            if (ok) {
                setCategories(data);
            } else {
                errorMsg(msg);
            }
        }).catch(() => {
            errorMsg("Error fetching categories");
        }).finally(() => {
            setLoad(true);
            return;
        })
    }, [refresh]);
    // 
    const [add, setAdd] = useState({
        open: false,
        uz: '',
        ru: '',
        slug: ''
    });
    // 
    const closeAdd = () => setAdd({ open: false, uz: '', ru: '', slug: '' });
    const submitAdd = () => {
        setDisabled(true);
        const { uz, ru, slug } = add;
        if (!uz || !ru || !slug) {
            errorMsg("Fill all fields");
            return;
        }
        fetchData('POST', '/category/create', {}, { uz, ru, slug }).then(res => {
            const { ok, msg, data } = res.data;
            if (ok) {
                successMsg("Category added successfully");
                setCategories([...categories, data]);
                closeAdd();
            } else {
                errorMsg(msg);
            }
        }).catch(() => {
            errorMsg("Error adding category");
        }).finally(() => {
            setDisabled(false);
            return;
        })
    };
    // 
    // 
    return (
        <div className="flex items-center gap-[10px] justify-start flex-col w-full">
            {!load && <Fetching />}
            {load && !categories.length ?
                <div className="flex items-center flex-col justify-center w-full h-[50vh]">
                    <NoData />
                    <Button onClick={() => setAdd({ ...add, open: true })} color="indigo" variant="gradient">
                        <FaPlusCircle />
                        Add new
                    </Button>
                </div>
                :
                <>
                    <div className="flex items-start flex-col justify-start w-full gap-[4px]">
                        {/* struct */}
                        <div className="flex items-center justify-start h-[30px] bg-gradient-to-b from-indigo-300 to-indigo-900 rounded-[4px]">
                            {/*  */}
                            <p className="w-[50px] h-full border-r flex items-center justify-center text-white text-[13px] font-semibold truncate">
                                #
                            </p>
                            {/*  */}
                            <p className="w-[200px] h-full border-r flex items-center justify-center text-white text-[13px] font-semibold truncate">
                                Title Uz
                            </p>
                            {/*  */}
                            <p className="w-[200px] h-full border-r flex items-center justify-center text-white text-[13px] font-semibold truncate">
                                Title Ru
                            </p>
                            {/*  */}
                            <p className="w-[200px] h-full flex items-center justify-center text-white text-[13px] font-semibold truncate border-r">
                                Slug
                            </p>
                            {/*  */}
                            <p className="w-[50px] h-full flex items-center justify-center text-white text-[13px] font-semibold truncate">
                                Posts
                            </p>
                        </div>
                        {/* mapping */}
                        {categories.map((c, i) => {
                            return (
                                <div key={i} className="flex items-center justify-start h-[50px] bg-white border rounded-[4px]">
                                    {/*  */}
                                    <div className="w-[50px] h-full border-r flex items-center justify-center">
                                        <Menu placement="bottom-start">
                                            <MenuHandler>
                                                <IconButton variant="text" className="text-[20px]">
                                                    <BiDotsVertical />
                                                </IconButton>
                                            </MenuHandler>
                                            <MenuList className="min-w-[100px]">
                                                <MenuItem className="flex items-center justify-start text-green-500">
                                                    <BiEdit />
                                                    Edit
                                                </MenuItem>
                                                <MenuItem className="flex items-center justify-start text-red-500">
                                                    <BiTrash />
                                                    Delete
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </div>
                                    {/*  */}
                                    <p className="w-[200px] h-full border-r flex items-center justify-center text-black text-[13px] truncate">
                                        {c?.uz}
                                    </p>
                                    {/*  */}
                                    <p className="w-[200px] h-full border-r flex items-center justify-center text-black text-[13px] truncate">
                                        {c?.ru}
                                    </p>
                                    {/*  */}
                                    <p className="w-[200px] h-full flex items-center justify-center text-black text-[13px] truncate border-r">
                                        {c?.slug}
                                    </p>
                                    {/*  */}
                                    <p className="w-[50px] h-full flex items-center justify-center text-black text-[13px] truncate">
                                        {c?.posts}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
            {/* adding */}
            <Dialog open={add.open}>
                <DialogHeader>
                    <p className="text-[17px]">Add new category</p>
                </DialogHeader>
                <DialogBody className="border-y flex items-center justify-center gap-[10px] flex-col">
                    <Input variant="standard" label="Title( UZ )" required onChange={e => setAdd({ ...add, uz: e.target.value })} value={add.uz} />
                    <Input variant="standard" label="Title( RU )" required onChange={e => setAdd({ ...add, ru: e.target.value })} value={add.ru} />
                    <Input variant="standard" label="Slug" required onChange={e => setAdd({ ...add, slug: e.target.value?.toLowerCase()?.trim() })} value={add.slug} />
                </DialogBody>
                <DialogFooter className="gap-[10px]">
                    <Button onClick={closeAdd} disabled={disabled} color="gray" variant="gradient">Cancel</Button>
                    <Button onClick={submitAdd} loading={disabled} color="indigo" variant="gradient">Save</Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default Categories;
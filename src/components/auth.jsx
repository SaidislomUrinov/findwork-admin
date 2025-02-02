import { useState } from "react";
import { errorMsg, successMsg } from "../utils/msg";
import { fetchData } from "../utils/requests";
import { useDispatch } from "react-redux";
import { updateUser } from "../contexts/user";
import { Button, Input } from "@material-tailwind/react";
import { FaAt, FaLock } from "react-icons/fa";

function Auth() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [disabled, setDisabled] = useState(false);
    const dp = useDispatch();
    async function submit() {
        try {
            setDisabled(true);
            const { username, password } = form;

            if (!username || !password) throw new Error("Fill the rows");

            const res = await fetchData('POST', '/admin/signIn', {}, { username, password });

            const { ok, msg, data, access } = res.data;

            if (!ok) throw new Error(msg);
            successMsg(msg);
            localStorage.setItem('access', access);
            setTimeout(() => {
                dp(updateUser(data));
            }, 500);
        } catch (error) {
            errorMsg(error.message);
        } finally {
            setDisabled(false);
        }
    }
    return (
        <div className="flex items-center justify-center w-full h-[100vh]">
            <div className="flex items-center flex-col justify-center w-[95%] sm:w-[520px] bg-white rounded-xl gap-[10px] p-[10px]">
                <p className="uppercase font-semibold text-blue-gray-900 text-[20px]">login</p>
                {/*  */}
                <Input variant="standard" onChange={e => setForm({ ...form, username: e.target.value.toLowerCase().trim() })} value={form.username} required label="Username" icon={<FaAt />} />
                {/*  */}
                <Input type="password" variant="standard" onChange={e => setForm({ ...form, password: e.target.value.toLowerCase().trim() })} value={form.password} required label="Password" icon={<FaLock />} />
                {/*  */}
                <Button onClick={submit} loading={disabled} className="w-full" color="indigo" variant="gradient">Submit</Button>
            </div>
        </div>
    );
}

export default Auth;
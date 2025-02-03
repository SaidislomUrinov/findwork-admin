import { Spinner } from "@material-tailwind/react";

function Fetching() {
    return (
        <div className="flex items-center justify-center flex-col w-full h-[300px] bg-container">
            <Spinner color="gray" className="w-[40px] h-[40px]" />
            <p className="text-black">Fetching data</p>
        </div>
    );
}

export default Fetching;
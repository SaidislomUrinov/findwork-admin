import { useLocation } from "react-router-dom";
const links = {
    dashboard: 'Dashboard',
    users: 'users',
    posts: 'posts',
    categories: 'categories',
    brands: 'brands',
    'search-user': 'search user',
    'search-post': 'search post',
    logout: 'logout',
}
function Top() {
    const p = useLocation().pathname?.replace('/', '');
    return (
        <div className="flex items-center justify-end lg:justify-start w-full bg-white h-[70px] min-h-[70px] px-[10px]">
            <p className="uppercase font-bold">{!p ? links?.['dashboard'] : links?.[p]}</p>
        </div>
    );
}

export default Top;
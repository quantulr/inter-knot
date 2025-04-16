import {ReactNode} from "react";

const Layout = ({children}: { children: ReactNode }) => {
    return (
        <div className={"border-2 border-gray-200 bg-blue-200 h-screen"}>
            {children}
        </div>
    );
};

export default Layout;
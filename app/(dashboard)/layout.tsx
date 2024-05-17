import HeaderPage from "./dashboard/_components/header";

interface Props{
    children:React.ReactNode
}

const DashboardLayout = ({
    children,
}:Props) => {
    return ( 
        <>
        <HeaderPage/>
        <main className="px-3 lg:px-14">
            {children}
        </main>
        </>
    );
}

export default DashboardLayout;
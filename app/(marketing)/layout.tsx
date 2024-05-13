
import FooterPage from "./footer";
import HeaderPage from "./header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderPage />
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      {/* Can extend the number of sections in the future */}
      {/* <ConnectJson/> */}
      <div className="items-center justify-center">
      </div>
      <FooterPage />
    </div>
  );
};

export default MarketingLayout;

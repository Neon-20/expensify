import { Button } from "@/components/ui/button";
import Image from "next/image";

const FooterPage = () => {
  return (
    <footer className="hidden lg:block border-t-2 dark:border-none w-full h-16 border-slate-100 p-2">
    <div className="max-w-screen-lg mx-auto items-center justify-evenly
    h-full flex">
    <Button variant="ghost" size="lg" className="w-full">
      <Image
      src="/visa.svg"
      alt="Visa"
      height={32}
      width={40}
      className="mr-4 rounded-md"
      />
      Visa
    </Button>
    <Button variant="ghost" size="lg" className="w-full">
      <Image
      src="/amex.svg"
      alt="Amex"
      height={32}
      width={40}
      className="mr-4 rounded-md"
      />
      American Express
    </Button>
    <Button variant="ghost" size="lg" className="w-full">
      <Image
      src="/discover.svg"
      alt="Discover"
      height={32}
      width={40}
      className="mr-4 rounded-md"
      />
      Discover
    </Button>
    <Button variant="ghost" size="lg" className="w-full">
      <Image
      src="/mastercard.svg"
      alt="MasterCard"
      height={32}
      width={40}
      className="mr-4 rounded-md"
      />
      MasterCard
    </Button>
    <Button variant="ghost" size="lg" className="w-full">
      <Image
      src="/paypal.svg"
      alt="PayPal"
      height={32}
      width={40}
      className="mr-4 rounded-md"
      />
      PayPal
    </Button>
    </div>
    </footer>
  );
};

export default FooterPage;

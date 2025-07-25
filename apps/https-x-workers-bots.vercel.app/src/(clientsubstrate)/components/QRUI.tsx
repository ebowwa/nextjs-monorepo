/**
 * v0 by Vercel.
 * @see https://v0.dev/t/c6ruz2GoKAn
    LOCATION: src/(clientsubstrate)/components/QRUI.tsx
 */
    "use client"
    import { Button } from "./ui/button";
    import { FC, useState } from "react";
    import { ShareIcon, DownloadIcon, CopyIcon } from "./icons";
    import QRCodeGenerator from './QRCodeGenerator';
    import marketplaceContent from '../../../public/html/marketplaceContent.json';
    import BotCard from "../../(clientsubstrate)/components/BotCard";
    import { Bot, BotData } from "@/lib/data/bot_types";
    import agentsData from "../../../public/data/agents.json";
    import Image from 'next/image';
    
    const QR_CODE_LINK = 'https://x-workers.vercel.app/';
    
    const ShareButton: FC = () => {
      return (
        <Button size="sm" variant="outline">
          <ShareIcon className="mr-2 h-4 w-4" />
          {marketplaceContent.shareQRCodeButton}
        </Button>
      );
    };
    
    const CopyButton: FC = () => {
      const [isCopied, setIsCopied] = useState(false);
    
      const handleCopy = () => {
        navigator.clipboard.writeText(QR_CODE_LINK);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      };
    
      return (
        <Button size="sm" variant="outline" onClick={handleCopy}>
          <CopyIcon className="mr-2 h-4 w-4" />
          {isCopied ? 'Copied!' : 'Copy Link'}
        </Button>
      );
    };
    
    const MarketplaceComponent: FC = () => {
      const botData: BotData = agentsData as BotData;
    
      // Get the top 3 featured products and top sellers
      const featuredProducts = botData.slice(0, 3);
      const topSellers = botData.slice(3, 6);
    
      return (
        <div className="w-full max-w-2xl mx-auto py-12 md:py-16 lg:py-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-center sm:text-4xl md:text-5xl">
                {marketplaceContent.title}
              </h1>
              <p className="text-gray-500 text-center text-base md:text-lg">
                {marketplaceContent.description}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center">
              <div className="w-full max-w-[300px] mx-auto md:mr-8">
                <QRCodeGenerator link={QR_CODE_LINK} />
                <div className="mt-4 flex justify-center gap-4">
                  <CopyButton />
                  <ShareButton />
                </div>
              </div>
              <div className="w-full max-w-[300px] mx-auto mt-6 md:mt-0">
                <Image
                  src="/meta/IMG_2498.jpg"
                  alt="Marketplace Image"
                  width={1125}
                  height={1886}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 md:p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold">{marketplaceContent.featuredProductsTitle}</h2>
                  {featuredProducts.map((bot: Bot, index: number) => (
                    <div key={index} className="mb-8">
                      <BotCard bot={bot} />
                    </div>
                  ))}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{marketplaceContent.topSellersTitle}</h2>
                  {topSellers.map((bot: Bot, index: number) => (
                    <div key={index} className="mb-8">
                      <BotCard bot={bot} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default MarketplaceComponent;
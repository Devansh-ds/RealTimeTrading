import React, { useEffect, useState } from "react";
import { Button } from "../../components/button";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Cross1Icon, DotIcon } from "@radix-ui/react-icons";
import { CrossIcon, MessageCircle } from "lucide-react";
import { Input } from "../../components/input";

const Home = () => {
  const [category, setCategory] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [isBotRelease, setIsBotRelease] = useState(false);

  const handleBotRelease = () => {
    setIsBotRelease(!isBotRelease);
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCategory = (value) => {
    setCategory(value);
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      console.log("pressed");
      console.log(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="relative">
      <div className="xl:flex lg:flex lg:flex-row">
        {/* left part to show all bitcoins */}
        <div className="lg:w-[50%] lg:border-r">
          {/* 4 filter buttons */}
          <div className="p-3 flex items-center gap-4">
            <Button variant={category == "all" ? "default" : "outline"} className="rounded-full" onClick={() => handleCategory("all")}>
              All
            </Button>
            <Button variant={category == "topGainers" ? "default" : "outline"} className="rounded-full" onClick={() => handleCategory("topGainers")}>
              Top Gainers
            </Button>
            <Button variant={category == "topLosers" ? "default" : "outline"} className="rounded-full" onClick={() => handleCategory("topLosers")}>
              Top Losers
            </Button>
            <Button variant={category == "top50" ? "default" : "outline"} className="rounded-full" onClick={() => handleCategory("top50")}>
              Top 50
            </Button>
          </div>
          <AssetTable category={category} />
        </div>
        {/* right part to show the chart */}
        <div className="lg:block lg:w-[50%]">
          <StockChart />
          <div className="flex gap-5 items-center mx-5 mb-10">
            <div>
              <Avatar>
                <AvatarImage className="size-15" src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />
              </Avatar>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p>BTC</p>
                <DotIcon className="text-gray-400" />
                <p className="text-gray-400">Bitcoin</p>
              </div>
              <div className="flex items-end gap-4">
                <p className="text-xl font-bold">5354</p>
                <p className="text-red-600">
                  <span>-93420805</span>
                  <span>(0.294234%)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* chat bot */}
      <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end gap-2 items-end">
        {/* chat bot popped up screen */}
        {isBotRelease && (
          <div className="rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-900">
            {/* header */}
            <div className="flex justify-between items-center border-b px-6 h-[12%]">
              <p>Chat Bot</p>
              <Button onClick={handleBotRelease} variant="ghost" size="icon">
                <Cross1Icon />
              </Button>
            </div>
            {/* chat area */}
            <div className="h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-3 scroll-container">
              {/* initital message */}
              <div className="self-start w-auto">
                <div className="justify-end self-end rounded-md bg-slate-800 w-auto px-5 py-2">
                  <p>Yo bitch</p>
                  <p>got any crypto related questions?</p>
                </div>
              </div>
              {/* user question and answer */}
              {[1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => (
                <div key={i} className={`${i % 2 == 0 ? "self-end" : "self-start"} w-auto`}>
                  {/* prompt */}
                  {i % 2 == 0 ? (
                    <div className="justify-end self-end rounded-md bg-slate-800 max-w-[15rem] px-5 py-2">
                      <p>prompt: who are you?</p>
                    </div>
                  ) : (
                    <div className="justify-start self-start rounded-md bg-slate-800 max-w-[15rem] px-5 py-2">
                      <p>ans hi, John cena</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* chat input button */}
            <div className="h-[12%] border-t p-3">
              <Input
                className="w-full h-full border-none outline-none"
                placeholder="write prompt"
                onChange={handleChange}
                value={inputValue}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        )}
        {/* chat bot button */}
        <div className="relative w-[10rem] cursor-pointer">
          <Button className="w-full py-6 gap-2 items-center" variant="outline" onClick={handleBotRelease}>
            <MessageCircle className="fill-[#fff]  -rotate-90 stroke-none group-hover:fill-[#1a1a1a] size-6" />
            <span className="text-2xl">Chat Bot</span>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;

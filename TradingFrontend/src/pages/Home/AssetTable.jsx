import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/pagination";
import { Button } from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoins } from "../../state/Coin/Action.js";

const AssetTable = ({ category }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(106);
  const [coins, setCoins] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const allCoins = useSelector((store) => store.allCoins);
  const limit = 10;

  useEffect(() => {
    setCoins(allCoins.disCoins || []);
  }, [allCoins.disCoins]);

  useEffect(() => {
    setPage(1);
  }, [category])

  useEffect(() => {
    if (category == "all") {
      dispatch(getAllCoins({ page: page - 1, size: limit, token: auth.token, sort: "" }));
    } else if (category == "topGainers") {
      dispatch(getAllCoins({ page: page - 1, size: limit, token: auth.token, sort: "priceChangePercentage24h,desc" }));
    } else if (category == "topLosers") {
      dispatch(getAllCoins({ page: page - 1, size: limit, token: auth.token, sort: "priceChangePercentage24h,asc" }));
    } else if (category == "top50") {
      dispatch(getAllCoins({ page: page - 1, size: limit, token: auth.token, sort: "marketCapRank,asc" }));
    }
  }, [auth.token, page, category]);

  const totalPages = Math.ceil(total / limit);

  const getPageNumbers = () => {
    const pages = [];
    const siblings = 1; // how many numbers to show before/after current page

    const start = Math.max(2, page - siblings);
    const end = Math.min(totalPages - 1, page + siblings);

    pages.push(1); // Always show the first page

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages); // Always show last page if more than 1
    }

    return pages;
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="left">Coin</TableHead>
            <TableHead>SYMBOL</TableHead>
            <TableHead>VOLUME</TableHead>
            <TableHead>MARKET CAP</TableHead>
            <TableHead>24H</TableHead>
            <TableHead className="text-right">PRICE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins?.map((item, index) => (
            <TableRow key={index} onClick={() => navigate("/market/" + item.id)}>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage className="size-10" src={item.image} />
                </Avatar>
                <span>{item.name.length > 30 ? item.name.substring(0, 30) + "..." : item.name}</span>
              </TableCell>
              <TableCell>{item.symbol.toUpperCase()}</TableCell>
              <TableCell>{item.total_volume}</TableCell>
              <TableCell>{item.market_cap}</TableCell>
              <TableCell className={item.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}>
                {item.price_change_percentage_24h}%
              </TableCell>
              <TableCell className="text-right">${item.current_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="my-4 flex justify-center">
        <Pagination>
          <PaginationContent className="flex gap-1">
            <PaginationItem>
              <PaginationPrevious onClick={() => page > 1 && setPage(page - 1)} className={page === 1 ? "pointer-events-none opacity-50" : ""} />
            </PaginationItem>

            {getPageNumbers().map((p, idx) => (
              <PaginationItem key={idx}>
                {p === "..." ? (
                  <span className="px-3 py-1 text-muted-foreground">...</span>
                ) : (
                  <Button variant={p === page ? "default" : "outline"} onClick={() => setPage(p)} className="px-3 py-1 text-sm">
                    {p}
                  </Button>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => page < totalPages && setPage(page + 1)}
                className={page === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default AssetTable;

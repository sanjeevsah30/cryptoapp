import React, { useEffect, useState } from "react";

import axios from "axios";
import { server } from "../index";
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import { Scale } from "chart.js";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);

  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };
  console.log(currency);

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        console.log(data);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent message={"error while fetching Coins"} />;
  console.log(coins);
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup onChange={setCurrency} value={currency}>
            <HStack spacing={4} p={8}>
              <Radio value={'inr'}>Inr</Radio>
              <Radio value={'usd'}>Usd</Radio>
              <Radio value={'eur'}>Euro</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins?.map((item) => (
              <CoinCard
                id={item.id}
                price={item.current_price}
                name={item.name}
                key={item.id}
                img={item.image}
                symbol={item.symbol}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack width={"full"} overflow={"auto"} p={8}>
            {btns.map((item, index) => (
              <Button
              key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => {
                  changePage(index + 1);
                }}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;

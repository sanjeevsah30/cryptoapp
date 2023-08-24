import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const CoinCard = ({ id, name, img, rank, price, symbol, currencySymbol }) => {
  return (
    <Link to={`/coin/${id}`} target={"blank"}>
      <VStack
        w={"52"}
        shadow={"lg"}
        p={8}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image
          src={img}
          w={"10"}
          h={"10"}
          objectFit={"contain"}
          alt='exchanges'
        />

        <Heading size={"md"} noOfLines={1}>
          {symbol}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{price ? `${currencySymbol} ${price}` : "NA"}</Text>
      </VStack>
    </Link>
  );
};

export default CoinCard;

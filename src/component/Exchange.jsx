import React, { useEffect, useState } from "react";

import axios from "axios";
import { server } from "../index";
import {
  Container,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import { Scale } from "chart.js";
import ErrorComponent from "./ErrorComponent";

const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        //   console.log(data);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  if (error)
    return <ErrorComponent message={"errro while fetching exchanges"} />;
  console.log(exchanges);
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges?.map((item) => (
              //   <div>{item?.name} </div>
              <ExchangeCard
                name={item.name}
                key={item.id}
                img={item.image}
                rank={item.trust_score_rank}
                url={item.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Exchange;

const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target='blank'>
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
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};

import React, { useState } from "react";
import styled from "styled-components";

const ProducerInfo = () => {
  const [data, setData] = useState(false);
  return (
    <div>
      {!data && (
        <Btn
          onClick={() => {
            setData(!data);
          }}
        >
          <p>👩‍💻</p>
        </Btn>
      )}
    </div>
  );
};

export default ProducerInfo;

const Btn = styled.button`
  border: none;
  display: block;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  position: relative;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  background-color: #222;
  padding: 17px 60px;
  margin: 0 auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  span {
    position: relative;
    z-index: 1;
  }

  :after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 490%;
    width: 140%;
    background: #78c7d2;
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-transform: translateX(-98%) translateY(-25%) rotate(45deg);
    transform: translateX(-98%) translateY(-25%) rotate(45deg);
  }

  :hover:after {
    -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
    transform: translateX(-9%) translateY(-25%) rotate(45deg);
  }

  p {
    font-size: 50px;
  }
`;

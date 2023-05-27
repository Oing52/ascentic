import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { scentNames } from "./ScentNames";

const ProdEditModal = ({ prodNum, hadleCloseEditModal }) => {
  const [productInfo, setProductInfo] = useState({
    prodNum: 0,
    prodName: "",
    scentName: "",
    prodCategory: "",
    productInfo: "",
    options: [],
  });

  // 옵션 추가 버튼 클릭 시 실행
  const handleAddOption = () => {
    if (productInfo.options.length > 3) {
      alert("옵션이 너무 많습니다.");
      return;
    }
    console.log("sss");
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      options: [
        ...prevProductInfo.options,
        { prodOption: "", prodPrice: "", prodStock: "" },
      ],
    }));
  };

  // 옵션 삭제 버튼 클릭 시 실행
  const handleDeleteOption = (index) => {
    console.log("gg");
    setProductInfo((prevProductInfo) => {
      const updatedOptions = prevProductInfo.options.filter(
        (_, i) => i !== index
      );
      return {
        ...prevProductInfo,
        options: updatedOptions,
      };
    });
  };

  // 옵션 정보 업데이트
  const handleOptionChange = (e, index, field) => {
    const updatedOptions = productInfo.options.map((option, i) => {
      if (i === index) {
        return {
          ...option,
          [field]: e.target.value,
        };
      }
      return option;
    });

    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      options: updatedOptions,
    }));
  };

  // 정보 업데이트
  const handleChange = (e, field) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [field]: e.target.value,
    }));
  };

  // 수정 버튼 클릭시
  const handleEdit = () => {
    const isEmptyOptions = productInfo.options.some(
      (option) =>
        option.prodOption === "" ||
        option.prodPrice === "" ||
        option.prodStock === ""
    );

    if (isEmptyOptions) {
      alert("옵션을 입력해주세요!");
      return;
    }
    const updateProduct = async () => {
      try {
        await axios.post(`http://localhost:8080/adminProdUpdate`, productInfo);
      } catch (e) {
        console.log(e);
      }
    };
    updateProduct();

    hadleCloseEditModal();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/admingetProdUpdateInfo?prodNum=${prodNum}`
        );
        setProductInfo(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <ModalBackground />
      <ModalContainer>
        <InputContainer>
          <ProdInputContainer>
            <OneInputContainer>
              <Label>제품명</Label>
              <NameInput
                type="text"
                value={productInfo.prodName}
                onChange={(e) => handleChange(e, "prodName")}
              ></NameInput>
            </OneInputContainer>
            <OneInputContainer>
              <Label>향이름</Label>
              <ScentInput
                value={productInfo.scentName}
                onChange={(e) => handleChange(e, "scentName")}
              >
                {scentNames.map((scent, index) => (
                  <option key={index} value={scent}>
                    {scent}
                  </option>
                ))}
              </ScentInput>
            </OneInputContainer>
            <OneInputContainer>
              <Label>분류</Label>
              <NameInput
                type="text"
                value={productInfo.prodCategory}
                onChange={(e) => handleChange(e, "prodCategory")}
              ></NameInput>
            </OneInputContainer>
            <BigOneInputContainer>
              <Label>제품 설명</Label>
              <ProdInfoInput
                value={productInfo.prodInfo}
                onChange={(e) => handleChange(e, "prodInfo")}
              ></ProdInfoInput>
            </BigOneInputContainer>
          </ProdInputContainer>
          <OptionContainer>
            <OneInputContainer>
              <OptionLabel>
                <OptionInfoLabel>옵션명</OptionInfoLabel>
                <OptionInfoLabel>가격</OptionInfoLabel>
                <OptionInfoLabel>재고</OptionInfoLabel>
              </OptionLabel>
            </OneInputContainer>
            {productInfo.options.map((option, index) => (
              <div key={index}>
                <OptionOneInputContainer>
                  <Label>옵션{index + 1}</Label>
                  <InputOption
                    type="text"
                    value={option.prodOption}
                    onChange={(e) => handleOptionChange(e, index, "prodOption")}
                  />
                  <InputOption
                    type="text"
                    value={option.prodPrice}
                    onChange={(e) => handleOptionChange(e, index, "prodPrice")}
                  />
                  원
                  <InputOption
                    type="text"
                    value={option.prodStock}
                    onChange={(e) => handleOptionChange(e, index, "prodStock")}
                  />
                  개
                  <OptionDelBtn onClick={() => handleDeleteOption(index)}>
                    -
                  </OptionDelBtn>
                </OptionOneInputContainer>
              </div>
            ))}
            <OptionAddBtn onClick={() => handleAddOption()}>+</OptionAddBtn>
          </OptionContainer>
          <EditBtnContainer>
            <EditBtn onClick={() => handleEdit()}>수정</EditBtn>
            <CloseBtn onClick={() => hadleCloseEditModal()}>취소</CloseBtn>
          </EditBtnContainer>
        </InputContainer>
      </ModalContainer>
    </>
  );
};

export default ProdEditModal;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  background-color: white;
  z-index: 1000;
  border: 5px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 80%;
  height: 90%;
`;

const ProdInputContainer = styled.div`
  width: 100%;
  height: 45%;
`;

const OptionContainer = styled.div`
  width: 100%;
  height: 55%;
`;

const EditBtnContainer = styled.div`
  width: 100%;
  height: 5%;
`;

const OneInputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 10px;
`;

const Label = styled.div`
  width: 15%;
  font-size: 20px;
  font-weight: 600;
`;

const NameInput = styled.input`
  width: 90%;
  height: 80%;
  border: 1px solid;
`;

const ScentInput = styled.select`
  width: 90%;
  height: 80%;
  border: 1px solid;
`;

const BigOneInputContainer = styled.div`
  display: flex;
`;

const ProdInfoInput = styled.textarea`
  width: 90%;
  height: 100px;
  resize: none;
  border: 1px solid;
`;

const OptionOneInputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 10px;
  align-items: center;

  > input:nth-child(3),
  input:nth-child(4) {
    margin-left: 60px;
  }
`;

const OptionLabel = styled.div`
  font-size: 20px;
  width: 80%;
  display: flex;
  margin-left: 15%;
`;

const OptionInfoLabel = styled.div`
  width: 33.3%;
`;

const InputOption = styled.input`
  width: 100px;
  height: 30px;
  gap: 10px;
  border: 1px solid;
`;

const OptionDelBtn = styled.button`
  margin-left: 10px;
  font-size: 20px;
  background-color: white;
  color: red;
  border: 1px solid red;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
`;

const OptionAddBtn = styled.button`
  cursor: pointer;
  font-size: 25px;
  margin-left: 45%;
  border: 1px solid gray;
  border-radius: 50%;
  background-color: white;
  text-align: center;
`;

const EditBtn = styled.button`
  width: 150px;
  height: 30px;
  margin-left: 50%;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const CloseBtn = styled.button`
  margin-left: 20px;
  width: 150px;
  height: 30px;
  background-color: white;
  cursor: pointer;
`;

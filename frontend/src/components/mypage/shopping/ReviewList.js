import styled from "styled-components";
import { ReviewItem } from "./ReviewItem";
import { useEffect, useState } from "react";
import { getCookie } from "../../../utils/Cookies";
import { getOrderReviewList } from "../../../api/OrderProduct";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../store/modules/mypage";

export const ReviewList = () => {
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await getOrderReviewList(getCookie("accessToken"));
      setReviewList(
        response.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      );
      await dispatch(setActiveTab("리뷰 관리"));
      setIsLoading(false);
    };
    fetchProductData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ReviewListWrap>
      <ContentHeader>리뷰 관리</ContentHeader>
      <ItemInfoBox>
        <ItemBigBox>
          <ItemName>상품 정보</ItemName>
        </ItemBigBox>
        <ItemSmallBox>
          <OrderDate>주문 일자</OrderDate>
        </ItemSmallBox>
        <ItemSmallBox>
          <OrderAmount>주문금액 (수량)</OrderAmount>
        </ItemSmallBox>
        <ItemSmallBox>
          <OrderState>후기</OrderState>
        </ItemSmallBox>
      </ItemInfoBox>
      {reviewList.length === 0 ? (
        <IsNotItem>주문하신 상품이 없습니다.</IsNotItem>
      ) : (
        reviewList.map((item, index) => <ReviewItem item={item} key={index} />)
      )}
    </ReviewListWrap>
  );
};

const ReviewListWrap = styled.div`
  border-bottom: 2px solid black;
`;

const ContentHeader = styled.div`
  padding: 20px 0;
  font-size: 30px;
  font-weight: 700;
  border-bottom: 2px solid black;
`;

const ItemInfoBox = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid black;
`;

const ItemBigBox = styled.div`
  width: 40%;
`;

const ItemName = styled.div`
  text-align: center;
`;

const ItemSmallBox = styled.div`
  width: 20%;
`;

const OrderDate = styled.div`
  text-align: center;
`;

const OrderAmount = styled.div`
  text-align: center;
`;

const OrderState = styled.div`
  text-align: center;
`;

const IsNotItem = styled.div``;

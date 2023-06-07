import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../store/modules/mypage";
import styled from "styled-components";
import { getCookie } from "../../../utils/Cookies";
import { useEffect, useState } from "react";

export const PasswordUpdate = () => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const accessToken = getCookie("accessToken");
      await dispatch(setActiveTab("비밀번호변경"));
    };
    fetchMemberInfo();
  }, []);

  const submitHandle = () => {
    //api
  };

  return (
    <Wrap>
      <ContentHeader>비밀번호변경</ContentHeader>

      <PasswordUpdateBox>
        <CurrentPasswordBox>
          <Label>현재 비밀번호</Label>
          <CurrentPasswordInput
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          ></CurrentPasswordInput>
        </CurrentPasswordBox>

        <NewPasswordBox>
          <Label>새로운 비밀번호</Label>
          <div>
            새 비밀번호 영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </div>
          <NewPasswordInput
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          ></NewPasswordInput>
        </NewPasswordBox>
        <NewPasswordConfirmBox>
          <Label>비밀번호 확인</Label>
          <NewPasswordConfirmInput
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></NewPasswordConfirmInput>
        </NewPasswordConfirmBox>
        <SubmitButton>수정 완료</SubmitButton>
      </PasswordUpdateBox>
    </Wrap>
  );
};

const Wrap = styled.div``;

const ContentHeader = styled.div`
  padding: 0px 0px 20px 0;
  font-size: 1.8rem;
  font-weight: 700;
  border-bottom: 1px solid grey;
`;

const PasswordUpdateBox = styled.div`
  width: 500px;
  padding: 40px;
  color: #292929;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  margin: 100px auto;
`;

const CurrentPasswordBox = styled.div`
  margin: 20px 0;
`;

const NewPasswordBox = styled.div`
  margin: 20px 0;
`;

const NewPasswordConfirmBox = styled.div`
  margin: 20px 0;
`;

const CurrentPasswordInput = styled.input`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 8px;
  border: 0.5px solid grey;
  box-sizing: border-box;
  padding: 10px 11px;
  font-size: 1.5rem;
`;

const NewPasswordInput = styled.input`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 8px;
  border: 0.5px solid grey;
  box-sizing: border-box;
  padding: 10px 11px;
  font-size: 1.5rem;
`;

const NewPasswordConfirmInput = styled.input`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 8px;
  border: 0.5px solid grey;
  box-sizing: border-box;
  padding: 10px 11px;
  font-size: 1.5rem;
`;

const Label = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const SubmitButton = styled.div`
  color: rgba(34, 34, 34, 0.5);
  font-size: 1rem;
  margin-top: 10px;
  border: 1px solid rgba(34, 34, 34, 0.5);
  padding: 10px;
  border-radius: 10px;
`;

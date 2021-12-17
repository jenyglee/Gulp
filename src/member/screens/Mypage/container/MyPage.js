import React, { useState, useEffect } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "@/member/screens/Mypage/component/Profile";
import ButtonMenu from "@/member/screens/Mypage/component/ButtonMenu";
import { GradeTable } from "@components/modal/index";
import { logout, removeUser } from "@/member/api/memberApi";
import RequireSignin from "@/common/components/RequireSignin";
import { illust } from "@/images";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { stateMembers } from "stores/members/membersSlice";
import actionsMembers from "stores/members/memberActions";

const Container = styled.View`
    width: 100%;
    height: ${({ height }) => height}px;
    align-items: center;
    justify-content: ${({ isSignin }) => (isSignin ? `flex-start` : `center`)};
    background-color: ${({ theme }) => theme.background};
`;

const MyPageContainer = ({ navigation }) => {
    const dispatch = useDispatch();
    const height = Dimensions.get("window").height;
    const [gradeTable, setGradeTable] = useState(false); // 등급표
    const [isSignin, setIsSignin] = useState(true); // 마이페이지 노출(로그인시)
    const [nickname, setNickname] = useState("");

    // ✨ 유저 정보 확인
    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            getUser();
        });
        return () => {
            removeFocusEvent();
        };
    }, [isSignin]);

    // ✨ 로그인정보 가져오기
    const getUser = async () => {
        const token = await AsyncStorage.getItem("token");
        // console.log(token);
        const user = await jwt_decode(token);
        (await user) ? setIsSignin(true) : setIsSignin(false);
        await setNickname(user.nickname);
    };

    // ✨ 등급표 노출/숨김
    const showGradeTable = () => {
        setGradeTable(!gradeTable);
    };

    return (
        <SafeAreaView>
            {isSignin ? (
                <Container height={height} isSignin={isSignin}>
                    <Profile nickname={nickname} />
                    <ButtonMenu
                        showGradeTable={showGradeTable}
                        showUserInfo={() => {
                            navigation.navigate("CustomInfo");
                        }}
                        logout={logout}
                        onRemoveUser={() => {
                            removeUser();
                            // navigation.navigate("Signin");
                        }}
                        setIsSignin={setIsSignin}
                    />
                    {gradeTable ? (
                        <GradeTable onPress={showGradeTable} />
                    ) : null}
                </Container>
            ) : (
                <Container
                    height={height}
                    style={{
                        paddingBottom: 200,
                    }}
                >
                    <RequireSignin
                        src={illust.error}
                        title="로그인이 필요한 서비스입니다."
                        onPress={() => navigation.navigate("Signin")}
                    />
                </Container>
            )}
        </SafeAreaView>
    );
};

export default MyPageContainer;

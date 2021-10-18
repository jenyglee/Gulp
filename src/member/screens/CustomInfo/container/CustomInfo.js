import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input, InputDisabled } from "@components/index";
import { BasicModal } from "@components/modal/index";
import { illust } from "@/images";
import { removeWhiteSpace } from "@/util";
import { View, Alert, Animated, Dimensions } from "react-native";
// import { createUser } from "@/firebase";

const Container = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.white};
    display: flex;
    /* justify-content: center; */
    margin-top: 50px;
    align-items: center;
`;

const InputContainer = styled.View`
    /* margin-bottom: 36px; */
`;

const StyledTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const SignupContainer00 = ({ navigation }) => {
    const theme = useContext(ThemeContext);
    const width = Dimensions.get("window").width;
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [allValue, setAllValue] = useState(false);
    const refPasswordConfirm = useRef(null);

    // ✨ 포커스 아웃이 되면 다음 인풋 노출
    const [showEmail, setShowEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [errorModal, setErrorModal] = useState(false);

    //  ✨ 에러모달 닫기
    const closeModal = () => {
        setErrorModal(false);
    };

    // ✨ 닉네임 확인
    const confirmNickname = () => {
        if (nickname != "") {
            navigation.goBack();
        } else {
            setErrorModal(true);
            setErrorMessage("닉네임을 입력해주세요.");
        }
    };

    // ✨ 패스워드 확인
    const confirmPassword = async (root) => {
        if (passwordConfirm != "") {
            if (password.length >= 6 || passwordConfirm.length >= 6) {
                if (password == passwordConfirm) {
                    await handleSignupBtnPress();
                    navigation.navigate(root);
                } else {
                    setErrorModal(true);
                    setErrorMessage("비밀번호가 일치하지 않습니다.");
                }
            } else {
                setErrorModal(true);
                setErrorMessage("비밀번호는 6자리 이상입니다.");
            }
        } else {
            setErrorModal(true);
            setErrorMessage("비밀번호를 한번 더 입력해주세요.");
        }
    };

    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            getUser();
        });
        return () => {
            removeFocusEvent();
        };
    }, []);

    // ✨ 유저 정보 가져오기
    const getUser = async () => {
        const user = jwt_decode(await AsyncStorage.getItem("token"));
        console.log(user);
        setEmail(user.email);
        setNickname(user.nickname);
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{
                flex: 1,
            }}
            extraScrollHeight={20}
        >
            <Container>
                <InputContainer>
                    <StyledTitle
                        style={{
                            color: theme.inputPlaceholderText,
                        }}
                    >
                        이메일은 변경할 수 없어요
                    </StyledTitle>
                    <InputDisabled
                        title="이메일"
                        value={email}
                        containerStyle={{
                            marginBottom: 36,
                        }}
                    />
                </InputContainer>

                <View>
                    <StyledTitle>변경할 닉네임을 입력해주세요</StyledTitle>
                    <Input
                        title="닉네임"
                        value={nickname}
                        placeholder="닉네임을 입력하세요"
                        maxLenth={10}
                        onChangeText={(text) => {
                            const changedNickname = removeWhiteSpace(text);
                            setNickname(changedNickname);
                        }}
                        onBlur={() => {}}
                        returnKeyType="done"
                        containerStyle={{
                            marginBottom: 36,
                        }}
                    />
                </View>

                <View>
                    <StyledTitle>변경할 비밀번호를 입력해주세요</StyledTitle>
                    <Input
                        // ref={refPassword}
                        title="비밀번호"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        maxLenth={10}
                        returnKeyType="next"
                        onBlur={() => {}}
                        onChangeText={(text) => {
                            const changedPassword = removeWhiteSpace(text);
                            setPassword(changedPassword);
                        }}
                        secureTextEntry={true}
                    />
                    <Input
                        ref={refPasswordConfirm}
                        title="비밀번호 재입력"
                        placeholder="비밀번호를 한번 더 입력하세요"
                        value={passwordConfirm}
                        maxLenth={10}
                        onBlur={() => {}}
                        returnKeyType="done"
                        onChangeText={(text) => {
                            const changedPasswordConfirm =
                                removeWhiteSpace(text);
                            setPasswordConfirm(changedPasswordConfirm);
                        }}
                        secureTextEntry={true}
                    />
                </View>
                <Button
                    title="저장하기"
                    onPress={confirmNickname}
                    btnWrapStyle={{
                        width: width - 48,
                        position: "absolute",
                        bottom: 40,
                    }}
                />
            </Container>
            {errorModal ? (
                <BasicModal
                    title={errorMessage}
                    onPress={closeModal}
                    src={illust.error}
                />
            ) : null}
        </KeyboardAwareScrollView>
    );
};

export default SignupContainer00;
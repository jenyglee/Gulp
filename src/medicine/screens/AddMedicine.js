import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Input } from "@components/index";
import {
    BrandsDropList,
    PressDropList,
    ButtonCategorySelect,
} from "@/medicine/components/index";
import { Alert, Dimensions } from "react-native";
import { getBrands, getMedicines } from "@/medicine/api/medicineApi";
import _ from "lodash";
import { addMedicine } from "@/medicine/api/medicineApi";
import { useSelector, useDispatch } from "react-redux";
import { stateMedicines } from "stores/medicines/medicinesSlice";
import actionsMedicines from "stores/medicines/medicineActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.View`
    width: ${({ width }) => width - 48}px;
    height: 100%;
    margin-top: 50px;
    align-self: center;
`;

const StyledForm = styled.View`
    width: 100%;
    margin-bottom: 36px;
`;

const StyledTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const AddMedicine = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const width = Dimensions.get("window").width;
    const { categoryData, category, brand, brandKey } =
        useSelector(stateMedicines);
    const [filtered, setFiltered] = useState([]);
    // const [category, setCategory] = useState({ title: "선택" });
    // const [brand, setBrand] = useState("");
    const [medicine, setMedicine] = useState("");
    const [isFocusedCategory, setIsFocusedCategory] = useState(false);
    const [isSelectingCategory, setIsSelectingCategory] = useState(false);
    const [isSearchingBrand, setIsSearchingBrand] = useState(false);
    const [isFocusedBrand, setIsFocusedBrand] = useState(false);
    const refBrand = useRef(null);
    const refMedicine = useRef(null);

    useEffect(() => {
        setMedicine(route.params.medicine || "");
    }, []);

    // ✨ 로컬에 저장하기
    const setMedicineData = async () => {
        try {
            // ① 이미 등록된 약인지 확인
            const loadedData = await AsyncStorage.getItem("medicine");
            const medicines = JSON.parse(loadedData);
            let isSameMedicinesArr = medicines
                ? Object.values(medicines).map((item) => {
                      // 브랜드 명이 이미 있는 것 인지 확인 -> 약 이름까지 이미 있는 것 인지 확인
                      if (item.brandName === brand) {
                          if (item.name === medicine) {
                              return false;
                          } else return true;
                      } else return true;
                  })
                : [];
            if (isSameMedicinesArr.includes(false)) {
                Alert.alert("이 약은 이미 등록되어 있습니다.");
                return;
            } else {
                // ② 저장 진행
                const ID = Date.now();
                const newMedicine = {
                    [ID]: { id: ID, name: medicine, brandName: brand },
                    // name: medicine,
                    // brand: { id: brandKey },
                    // category: { id: category.id },.
                };
                await AsyncStorage.setItem(
                    "medicine",
                    JSON.stringify({ ...medicines, ...newMedicine })
                );
                navigation.navigate("AddAlarm");
            }

            // const response = await addMedicine(newMedicine);
            // if (response === 200) {
            //     navigation.navigate("AddAlarm");
            // } else if (response !== 200) {
            //     // 🍎 무조건 200 뜨므로 여기서 걸러내면 안됨!!!🍎
            //     // Alert.alert("이 약은 이미 등록되어 있습니다.")
            // }
        } catch (e) {
            console.log(e);
        }
    };

    const handleSelectCategory = (id) => {
        categoryData.map((item) => {
            if (item.id === id) {
                dispatch(actionsMedicines.setCategory(item));
                // setCategory(item);
                refBrand.current.focus();
                return;
            } else return;
        });
    };

    // ✨ medicine 검색어 자동완성 노출
    const debounceSearchMedicine = _.debounce(async (text) => {
        if (text) {
            setIsSearchingMedicine(true);
            const medicines = await getMedicines({ brandKey, text });
            setFiltered(medicines ?? []);
        } else {
            setIsSearchingMedicine(false);
        }
    }, 300);

    //✨ brand 검색어 자동완성 노출
    const debounceSearchBrand = _.debounce(async (text) => {
        if (text) {
            setIsSearchingBrand(true);
            const brands = await getBrands(text);
            setFiltered(brands ?? []);
        } else {
            setIsSearchingBrand(false);
        }
    }, 300);

    const handleVisibleDropList = () => {
        setIsSelectingCategory(!isSelectingCategory);
    };

    return (
        <>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                contentContainerStyle={{
                    // flex: 1,
                    height: "100%",
                    // alignSelf: "center",
                }}
            >
                <Container width={width}>
                    <StyledForm>
                        <StyledTitle>영양제 종류</StyledTitle>
                        <ButtonCategorySelect
                            containerStyle={{
                                marginBottom: 0,
                            }}
                            value={category.title}
                            onVisibleDropList={handleVisibleDropList}
                            isFocused={isFocusedCategory}
                            setIsFocused={setIsFocusedCategory}
                        />
                        {isSelectingCategory && (
                            <PressDropList
                                filtered={filtered}
                                onSelectItem={handleSelectCategory}
                                onVisibleDropList={handleVisibleDropList}
                                categoryData={categoryData}
                                isFocused={isFocusedCategory}
                                setIsFocused={setIsFocusedCategory}
                            />
                        )}
                    </StyledForm>
                    <StyledForm>
                        <StyledTitle>브랜드 이름</StyledTitle>
                        <Input
                            ref={refBrand}
                            containerStyle={{
                                marginBottom: 0,
                            }}
                            value={brand}
                            onBlur={() => {}}
                            // onChangeText={(text) => setBrand(text)}
                            onChangeText={(text) =>
                                dispatch(
                                    actionsMedicines.onSearchBrand(
                                        text,
                                        debounceSearchBrand
                                    )
                                )
                            }
                            placeholder="브랜드를 입력해주세요"
                            onSubmitEditing={() => {
                                // refMedicine.current.focus();
                            }}
                            isFocusedOther={isFocusedBrand}
                            setIsFocusedOther={setIsFocusedBrand}
                            isSearching={isSearchingBrand}
                            isSearchMedicine
                        />
                        {isSearchingBrand && (
                            <BrandsDropList
                                filtered={filtered}
                                onSelectItem={(id) => {
                                    dispatch(
                                        actionsMedicines.handleSelectBrand(
                                            id,
                                            filtered,
                                            setIsSearchingBrand,
                                            setFiltered
                                        )
                                    );
                                }}
                                setIsFocusedBrand={setIsFocusedBrand}
                            />
                        )}
                    </StyledForm>
                    <StyledForm>
                        <StyledTitle>영양제 이름</StyledTitle>
                        <Input
                            ref={refMedicine}
                            containerStyle={{
                                marginBottom: 0,
                            }}
                            value={medicine}
                            onBlur={() => {}}
                            onChangeText={(text) => setMedicine(text)}
                            placeholder="약 이름을 입력해주세요"
                        />
                    </StyledForm>
                </Container>
                <Button title="등록" onPress={setMedicineData} />
            </KeyboardAwareScrollView>
        </>
    );
};

export default AddMedicine;

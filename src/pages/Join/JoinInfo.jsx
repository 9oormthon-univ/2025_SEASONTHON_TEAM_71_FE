// 회원가입 회원정보입력 페이지

import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import JoinHeader from "../../components/JoinHeader";

export default function JoinInfo () {
    const { role } = useParams(); // 'user' | 'owner' | 'consultant'
    
    return (
        <JoinHeader text="개인"/>
    )
    
}
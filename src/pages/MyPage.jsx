import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getUserInfo } from '../api/user/getUserInfo';
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import {updateUserInfo} from "../api/user/updateUserInfo";
import {withdrawalApi} from "../api/user/withdrawalApi";

export default function MyPage({ isLogin }) {
  const [update, setUpdate] = useState(true);
  const [info, setInfo] = useState({
    nickname: "",
    gender: "",
    dateOfBirth: "",
    height: 0.0,
    weight: 0.0,
    mbti: "",
    isSmoking: null,
    isAlcohol: null,
    HealthcareType: null,
    profileImageUrl: '',
      email: '',
      firstName: '',
      lastName: '',
  });

  useEffect(() => {
      const initUserinfo = async () => {
      const newinfo = await getUserInfo();
      setInfo(newinfo);
    };
    initUserinfo();
  }, [isLogin]);

  const updateStateFalse = () => {
    setUpdate(false);
  }

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        withdrawalApi();
        window.location.replace("/");
    };

  return (
    <div className="main-bg">
        <Modal show={show} onHide={handleClose} animation={false} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title style={{color: "#E63A35"}}><strong>회원 탈퇴</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{fontSize: "25px"}}>정말 회원을 탈퇴하시겠습니까?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
      <div className="main">
        <h3 className="small-title">My Page</h3>
        <div>
        {
          update ? <MyPageTrue info={info} updateStateFalse={updateStateFalse} handleShow={handleShow}/> : <MyPageFalse info={info} update={update} setUpdate={setUpdate} setInfo={setInfo}/>
        }
        </div>
      </div>
    </div>
  );
}

function MyPageTrue({info, updateStateFalse, handleShow}){

  return (
      <Table striped bordered hover variant="light">
          <tbody>
          <tr>
            <th>프로필</th>
            <td><img src={info.profileImageUrl}/></td>
          </tr>
          <tr>
            <th>이름</th>
            <td>{info.lastName}{info.firstName}</td>
          </tr>
          <tr>
              <th>MBTI</th>
              <td>{info.mbti}</td>
          </tr>
          <tr>
            <th>닉네임</th>
            <td>{info.nickname}</td>
          </tr>
          <tr>
            <th>이메일</th>
            <td>{info.email}</td>
          </tr>
          <tr>
            <th>성별</th>
            <td>{info.gender}</td>
          </tr>
          <tr>
            <th>키</th>
            <td>{info.height}</td>
          </tr>
          <tr>
            <th>몸무게</th>
            <td>{info.weight}</td>
          </tr>
          </tbody>
          <Button variant="outline-danger" size="lg" onClick={updateStateFalse}>정보 변경</Button>
          <Button variant="outline-danger" size="lg" onClick={handleShow}>회원 탈퇴</Button>
      </Table>
  );
}

function MyPageFalse({info, update, setUpdate, setInfo}){
    const navigate = useNavigate();
    let [formData, setFormData] = useState({
        nickname: "",
        gender: "",
        dateOfBirth: "",
        height: 0.0,
        weight: 0.0,
        mbti: "",
        isSmoking: null,
        isAlcohol: null,
        HealthcareType: null,
        profileImageUrl: '',
        email: '',
        firstName: '',
        lastName: '',
    });
    useEffect(()=>{
        setFormData(info);
    }, [])
    const handleInputChange = (event) => {
        setFormData((prevProps) => ({
            ...prevProps,
            [event.target.name]: event.target.value
        }));
    };
    const onSubmit = (data) => {
        data.preventDefault();
        const submitData = {
            nickname: formData.nickname,
            gender: info.gender,
            dateOfBirth: info.dateOfBirth,
            height: formData.height,
            weight: formData.weight,
            mbti: formData.mbti,
            isSmoking: formData.isSmoking,
            isAlcohol: formData.isAlcohol,
            HealthcareType: formData.HealthcareType,
            stressPoint: formData.stressPoint,
            profileImageUrl: formData.profileImageUrl,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
        }
        setInfo(submitData);
        updateUserInfo(submitData);
        setUpdate(true);
        navigate("/mypage");
    };

  return (
      <form onSubmit={onSubmit}>
          <Table striped bordered hover variant="light">
              <tbody>
              <tr>
                  <th>프로필</th>
                  <td><input onChange={handleInputChange} className="form-string-input" type="text" id="profileImageUrl" name="profileImageUrl" value={formData.profileImageUrl}/></td>
              </tr>
              <tr>
                  <th>이름</th>
                  <td>{info.lastName}{info.firstName}</td>
              </tr>
              <tr>
                  <th>MBTI</th>
                  <td><input onChange={handleInputChange} className="form-string-input" type="text" id="mbti" name="mbti" value={formData.mbti} /></td>
              </tr>
              <tr>
                  <th>닉네임</th>
                  <td><input onChange={handleInputChange} className="form-string-input" type="text" id="nickname" name="nickname" value={formData.nickname} /></td>
              </tr>
              <tr>
                  <th>이메일</th>
                  <td>{info.email}</td>
              </tr>
              <tr>
                  <th>키</th>
                  <td><input onChange={handleInputChange} className="form-string-input" type="text" id="height" name="height" value={formData.height} /></td>
              </tr>
              <tr>
                  <th>몸무게</th>
                  <td><input onChange={handleInputChange} className="form-string-input" type="text" id="weight" name="weight" value={formData.weight} /></td>
              </tr>
              </tbody>
          </Table>
          <Button type="submit" variant="outline-danger" size="lg">변경하기</Button>
      </form>
  );
}
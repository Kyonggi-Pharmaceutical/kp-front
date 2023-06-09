import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getUserInfo } from '../api/user/getUserInfo';
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import {updateUserInfo} from "../api/user/updateUserInfo";
import {withdrawalApi} from "../api/user/withdrawalApi";
import "./MyPage.css"

export default function MyPage({ isLogin }) {
  const [update, setUpdate] = useState(true);
  const [info, setInfo] = useState({
      nickname: null,
      gender: null,
      dateOfBirth: null,
      height: null,
      weight: null,
      mbti: null,
      isSmoking: null,
      isAlcohol: null,
      HealthcareType: null,
      profileImageUrl: null,
      email: null,
      firstName: null,
      lastName: null,
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
    <div className="main-bgs" style={{width: "40%", height: "75%"}}>
        <div className="article-box">
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
    </div>
  );
}

function MyPageTrue({info, updateStateFalse, handleShow}){

  return (
      <>
          <Table striped bordered hover variant="light" className="mypage-table">
              <tbody>
              <tr>
                  <td colSpan={2}><img src={info.profileImageUrl} width={"150px"} style={{borderRadius: "20px"}}/></td>
              </tr>
              <tr>
                  <th style={{width: "30%"}}>이름</th>
                  <td style={{textAlign: "left", paddingLeft: "20px"}}>{info.lastName}{info.firstName}</td>
              </tr>
              <tr>
                  <th>MBTI</th>
                  <td style={{textAlign: "left", paddingLeft: "20px"}}>{info.mbti}</td>
              </tr>
              <tr>
                  <th>닉네임</th>
                  <td style={{textAlign: "left", paddingLeft: "20px"}}>{info.nickname}</td>
              </tr>
              <tr>
                  <th>이메일</th>
                  <td style={{textAlign: "left", paddingLeft: "20px"}}>{info.email}</td>
              </tr>
              <tr>
                  <th>성별</th>
                  <td style={{textAlign: "left", paddingLeft: "20px"}}>
                      {
                          info.gender === 'MALE' ? '남' : '여'
                      }
                  </td>
              </tr>
              <tr>
                  <th>키</th>
                  <td style={{textAlign: "left", paddingLeft: "20px"}}>{info.height}cm</td>
              </tr>
              <tr>
                  <th>몸무게</th>
                  <td style={{textAlign: "left", paddingLeft: "20px"}}>{info.weight}kg</td>
              </tr>
              </tbody>
          </Table>
          <div style={{marginTop: "10px"}}>
              <Button variant="outline-danger" size="lg" onClick={updateStateFalse} style={{marginRight: "5px"}}>정보 변경</Button>
              <Button variant="outline-danger" size="lg" onClick={handleShow} style={{marginLeft: "5px"}}>회원 탈퇴</Button>
          </div>
      </>
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
          <Table striped bordered hover variant="light" className="mypage-table">
              <tbody>
              <tr>
                  <th style={{width: "30%"}}>프로필<br/>미리보기</th>
                  <td><img src={formData.profileImageUrl} width={"100px"} style={{borderRadius: "20px"}}/></td>
              </tr>
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
          <Button type="submit" variant="outline-danger" size="lg" style={{marginTop: "10px"}}>변경하기</Button>
      </form>
  );
}
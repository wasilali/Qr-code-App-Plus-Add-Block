import React, {useState, useRef} from 'react';
import {Container, Card, CardContent, makeStyles, Grid, TextField, Button} from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader-cmr';
import { useEffect } from 'react';


function QrReaders() {
  const [onn, setOff] = useState(false);
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [img, setImg] = useState('');
  const registerDataChange=(e)=>{
     const reader=new FileReader()
     reader.onload=()=>{
        if(reader.readyState===2){
          setImg(reader.result)
        }
     }
     const file=e.target.files[0]
    
       reader.readAsDataURL(file)
    }

  const [id, setId] = useState(`${Math.round(Math.random()*5000)}`);

  const getItemssss=()=>{
    let list=localStorage.getItem("formData")
    if(list){
      return JSON.parse(localStorage.getItem("formData"))
    }else{
      return []
    }
  }

  const [items, setItems] = useState(getItemssss());


  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const classes = useStyles();
  const qrRef = useRef(null);
function name() {
 return localStorage.setItem("formData", JSON.stringify(items));
}
useEffect(()=>{
  name()
},[])

  const generateQrCode = async () => {
    try {
      const myForm={
        id:id,
        text:text,
        email:email,
        password:password,
        img
      }
      console.log(myForm);
        items.push(myForm)
        setItems([...items,myForm])
        name()
      
          const response = await QRCode.toDataURL(id);
          setImageUrl(response);

    }catch (error) {
      console.log(error);
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
    let userMilgya=items.find((item)=>(
      item.id.toString()==result.toString()
    ))
    console.log(userMilgya);

          setScanResultFile(userMilgya);

  }
  const onScanFile = () => {
    setOff(true)
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result) {
      const quScaned=items.find((item)=>(
        item.id.toString()==result.toString()
      ))
          setScanResultWebCam(quScaned);
    }
   }
  return (
    <Container className={classes.conatiner}>
          <Card>
              <h2 className={classes.title}>Generate Download & Scan QR Code with React js</h2>
              <CardContent>
                  <Grid container spacing={2}>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                      <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
                      <TextField label="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
                          <TextField label="Enter Password" onChange={(e) => setPass(e.target.value)}/>
                          <TextField label="Enter Password" type='file' onChange={registerDataChange}/>
                          <Button className={classes.btn} variant="contained"
                            color="primary" onClick={() => generateQrCode()}>Generate</Button>
                            <br/>
                            <br/>
                            <br/>
                            {imageUrl ? (
                              <a href={imageUrl} download>
                                  <img src={imageUrl} alt="img"/>
                              </a>) : null}
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Scan Qr Code</Button>
                        <QrReader
                          ref={qrRef}
                          delay={300}
                          style={{width: '100%'}}
                          onError={handleErrorFile}
                          onScan={handleScanFile}
                          legacyMode
                        />
                        {onn&&(
                          <>
                          <h2>Scanned Code:{scanResultFile&&scanResultFile.id}</h2>
                        <img src={scanResultFile&&scanResultFile.img} height={200} width={200} alt="" />
                        <h2>Names:{scanResultFile&&scanResultFile.text}</h2>
                        <h2>Email:{scanResultFile&&scanResultFile.email}</h2>
                        <h2>Password:{scanResultFile&&scanResultFile.password}</h2>
                          </>
                        )}
                      </Grid>
                      <Grid item xl={4} lg={6} md={6} sm={12} xs={12}>
                         <h3>Qr Code Scan by Web Cam</h3>
                         <QrReader
                         delay={300}
                         style={{width: '100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                         />
                         <h3>Scanned By WebCam Codes: {scanResultWebCam&&scanResultWebCam.id}</h3>
                         <h3>Name:{scanResultWebCam&&scanResultWebCam.text}</h3>
                        <h3>Email:{scanResultWebCam&&scanResultWebCam.email}</h3>
                        <h3>Password:{scanResultWebCam&&scanResultWebCam.password}</h3>
                      </Grid>
                  </Grid>
              </CardContent>
          </Card>
    </Container>

  );
}

const useStyles = makeStyles((theme) => ({
    conatiner: {
      marginTop: 10
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      background: '#3f51b5',
      color: '#fff',
      padding: 20
    },
    btn : {
      marginTop: 10,
      marginBottom: 20
    }
}));
export default QrReaders;

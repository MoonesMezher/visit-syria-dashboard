import MainPhotoInput from "../MainPhotoInput/MainPhotoInput";
import { useEffect, useRef, useState } from "react";
import addImg from '../../../assets/images/input/add+.png'

const MainPhotoGroupInput = ({ imgs, setImgs }) => {
  const [img1, setImg1] = useState(imgs[0]);
  const [img2, setImg2] = useState(imgs[1]);
  const [img3, setImg3] = useState(imgs[2]);
  const [img4, setImg4] = useState(imgs[3]);

  useEffect(() => {
    const imgs = [img1, img2, img3, img4].filter(e => e != null);
    // setImgs(imgs);
    console.log(imgs);
  }, [img1, img2, img3, img4]);

  return (
    <div className="d-flex justify-content-center align-items-center gap-2" style={
      {
        border: '1px solid #dee2e6',
        padding: '5px',
        borderRadius: '5px',
      }
    }>
      <div className="d-flex gap-2 flex-column">
          <MainPhotoInput img={img1} setImg={setImg1}/>
          <MainPhotoInput img={img2} setImg={setImg2}/>
      </div>
      <div className="d-flex gap-2 flex-column">
        <MainPhotoInput img={img3} setImg={setImg3}/>
        <MainPhotoInput img={img4 || addImg} setImg={setImg4}/>
      </div>
    </div>
  )
};

export default MainPhotoGroupInput;

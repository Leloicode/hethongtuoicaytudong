import './App.css';
import { useEffect, useState } from 'react';
import { getDatabase, off, onValue, ref, set } from 'firebase/database';
import { initializeApp } from "firebase/app";


//mode
// 0 là thử công
// 1 là tự động

// Derive
// 0 là off
// 1 là on

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPJO0ApfJh38q8MpDA5jtpmHUbKV7TaXg",
  authDomain: "tuoicaytudong-11f0f.firebaseapp.com",
  databaseURL: "https://tuoicaytudong-11f0f-default-rtdb.firebaseio.com",
  projectId: "tuoicaytudong-11f0f",
  storageBucket: "tuoicaytudong-11f0f.appspot.com",
  messagingSenderId: "889736151386",
  appId: "1:889736151386:web:681d7937f94010e89bf363",
  measurementId: "G-GB6H8KWNWE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  const [tuoicay, setTuoiCay] = useState(0);
  const [phantram, setPhanTram] = useState(0);
  const [mucnuoc, setMucnuoc] = useState(0);
  const [bombinh, setBombinh] = useState(0);
  const [led1, setLed1] = useState(0);
  const [led2, setLed2] = useState(0);
  const [led3, setLed3] = useState(0);
  const [regime, setRegime] = useState(0);
  // thiết bị
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const dbRef = ref(database, "/");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const regime = data.regime;
      setRegime(regime);
      setTuoiCay(data.pump);
      setMucnuoc(data.distance);
      setBombinh(data.pumpDistance);
      setLed1(data.led1);
      setLed2(data.led2);
      setLed3(data.led3);
      setPhanTram(data.percentHumidity);
    });
    return () => {
      off(dbRef);
    };
  }, []);

  const handleCLickStatus = () => {
    if (regime === 1) {
      set(ref(database, '/regime'), 0)
        .then(() => {
          console.log('Giá trị Mode đã được cập nhật thành 0', regime);
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật giá trị Mode:', regime);
        });
      setRegime(0); // Mode = 1
    }
    else {
      set(ref(database, '/regime'), 1)
        .then(() => {
          console.log('Giá trị Mode đã được cập nhật thành 1', regime);
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật giá trị Mode:', error);
        });
        setRegime(1); 
        set(ref(database, '/pump'), 0)
        .then(() => {
          console.log('Giá trị Mode đã được cập nhật thành 1', tuoicay);
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật giá trị Mode:', error);
        });
        setTuoiCay(0); 
        set(ref(database, '/led1'), 0)
        .then(() => {
          console.log('Giá trị Mode đã được cập nhật thành 1', regime);
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật giá trị Mode:', error);
        });
        setLed1(0); 
        set(ref(database, '/led2'), 0)
        .then(() => {
          console.log('Giá trị Mode đã được cập nhật thành 1', regime);
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật giá trị Mode:', error);
        });
        setLed2(0); 
        set(ref(database, '/led3'), 0)
        .then(() => {
          console.log('Giá trị Mode đã được cập nhật thành 1', regime);
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật giá trị Mode:', error);
        });
        setLed3(0); 
        set(ref(database, '/pumpDistance'), 0)
        .then(() => {
          console.log('Giá trị Mode đã được cập nhật thành 1', regime);
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật giá trị Mode:', error);
        });
        setMucnuoc(0); 
    }

  }
  const handleDevice = (type, mode) => {
    if(regime === 0) return alert('Hệ thống đang ở chế độ tự động');
    const deviceCurent = mode === 0 ? 1 : 0;
    if(type === 'tuoicay') {
      set(ref(database, '/pump'), deviceCurent)
        .then(() => {
          console.log('Giá trị Device2 đã được cập nhật thành ' + deviceCurent);
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật giá trị Device:', error);
        });
      setTuoiCay(deviceCurent)
    } 
    if(type === 'led1') {
      set(ref(database, '/led1'), deviceCurent)
        .then(() => {
          console.log('Giá trị Device2 đã được cập nhật thành ' + deviceCurent);
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật giá trị Device:', error);
        });
      setLed1(deviceCurent)
    } 
    if(type === 'led2') {
      set(ref(database, '/led2'), deviceCurent)
      .then(() => {
        console.log('Giá trị Device2 đã được cập nhật thành ' + deviceCurent);
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật giá trị Device:', error);
      });
    setLed2(deviceCurent)
    } 
    if(type === 'led3') {
      set(ref(database, '/led3'), deviceCurent)
      .then(() => {
        console.log('Giá trị Device2 đã được cập nhật thành ' + deviceCurent);
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật giá trị Device:', error);
      });
    setLed3(deviceCurent)
    }
    if(type === 'pumpDistance') {
      set(ref(database, '/pumpDistance'), deviceCurent)
      .then(() => {
        console.log('Giá trị Device2 đã được cập nhật thành ' + deviceCurent);
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật giá trị Device:', error);
      });
    setMucnuoc(deviceCurent)
    }
   
  }
  useEffect(() => {
    var burgerCheckbox = document.getElementById('burger');
    var sidebarElement = document.querySelector('.sidebar');

    function handleCheckboxChange() {
      if (burgerCheckbox.checked) {
        sidebarElement.classList.add('visible');
      } else {
        sidebarElement.classList.remove('visible');
      }
    }

    burgerCheckbox.addEventListener('change', handleCheckboxChange);

    // Hủy đăng ký sự kiện khi component bị unmount
    return () => {
      burgerCheckbox.removeEventListener('change', handleCheckboxChange);
    };
  }, []);
  return (

    <>

      {isOnline === false && <div className="not-internet">
        <img src="/no-internet.jpg" alt="" />

      </div>}

      {
        isOnline === true &&
        <div className="App"
        >

          {/* -- end cảnh báo khẩn cấp-- */}
          <div className='header'>
            <div className='logo-not-connect'><img src="/no-internet.jpg" alt="" /></div>
            {/* <div className="logo"><img className="logo" src="/logo.jpeg" alt="" /></div> */}
            <div className="title"><h1>HỆ THỐNG TƯỚI CÂY TỰ ĐỘNG</h1></div>
            {/* <div className="logo"><img className="logo" src="/logo2.jpg" alt="" /></div> */}
          </div>
          <div className="body">
            <div className="sidebar">
              <h2 className='title-sidebar'>Chuyển chế độ</h2>
              <div className="survivalmode">
                {/* <h2>Chế độ</h2> */}
                <button className="btn" type="button" onClick={handleCLickStatus}>
                  <strong>{regime === 0 ?  'Thủ công' : 'Tự động'}</strong>
                  <div id="container-stars">
                    <div id="stars"></div>
                  </div>

                  <div id="glow">
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                </button>
              </div>
              <div className='action-mesage'>
                {/* eslint-disable-next-line */}
                <marquee className="message" scrollamount="12"><h3>{regime === 1 ?'Hiện tại đang ở chế độ thủ công' :  "Hiện tại đang ở chế độ tự động"}</h3></marquee>
              </div>
              
            </div>
            <div className="content">
              <label className="burger" htmlFor="burger">
                <input type="checkbox" id="burger" />
                <span></span>
                <span></span>
                <span></span>
              </label>
              <div className='init-block'>
                <div className="thongso init">
                  <h2 className='title-thongso title-doam'>Độ ẩm đất</h2>
                    <h1 class='thong-so-do-am'>
                      {phantram} %
                    </h1>
                </div>
                <div className="thongso init">
                  <h2 className='title-thongso title-doam'>Mực nước bình chứa</h2>
                    <h1 class='thong-so-do-am'>
                      {mucnuoc} cm
                    </h1>
                </div>
              </div>
             
              <h2 className='title-content thietbi'>Thông số thiết bị</h2>
              {/* ph */}
              
              <div className='action'>
                  <div className="card">
                    <div className="card2">
                      <h4 className='title-message'>Bơm tưới cây</h4>
                      <div className='btn-control'>
                        <div className="switch-holder">
                          <div className="switch-label">
                            <i className="fa fa-bluetooth-b"></i><span>Relay</span>
                          </div>
                          <div className="switch-toggle">
                            <input type="checkbox" id="bluetooth1" onChange={() => {handleDevice('tuoicay',tuoicay)}} checked={tuoicay === 1} />
                            <label htmlFor="bluetooth1"></label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='action'>
                  <div className="card">
                    <div className="card2">
                      <h4 className='title-message'>Đèn 1</h4>
                      <div className='btn-control'>
                        <div className="switch-holder">
                          <div className="switch-label">
                            <i className="fa fa-bluetooth-b"></i><span>Relay</span>
                          </div>
                          <div className="switch-toggle">
                            <input type="checkbox" id="bluetooth2" onChange={() => {handleDevice('led1',led1)}} checked={led1 === 1} />
                            <label htmlFor="bluetooth2"></label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='action'>
                  <div className="card">
                    <div className="card2">
                      <h4 className='title-message'>Đèn 2</h4>
                      <div className='btn-control'>
                        <div className="switch-holder">
                          <div className="switch-label">
                            <i className="fa fa-bluetooth-b"></i><span>Relay</span>
                          </div>
                          <div className="switch-toggle">
                            <input type="checkbox" id="bluetooth3" onChange={() => {handleDevice('led2',led2)}} checked={led2 === 1} />
                            <label htmlFor="bluetooth3"></label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='action'>
                  <div className="card">
                    <div className="card2">
                      <h4 className='title-message'>Đèn 3</h4>
                      <div className='btn-control'>
                        <div className="switch-holder">
                          <div className="switch-label">
                            <i className="fa fa-bluetooth-b"></i><span>Relay</span>
                          </div>
                          <div className="switch-toggle">
                            <input type="checkbox" id="bluetooth4" onChange={() => {handleDevice('led3',led3)}} checked={led3 === 1} />
                            <label htmlFor="bluetooth4"></label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='action'>
                  <div className="card">
                    <div className="card2">
                      <h4 className='title-message'>Bơm Bình chứa</h4>
                      <div className='btn-control'>
                        <div className="switch-holder">
                          <div className="switch-label">
                            <i className="fa fa-bluetooth-b"></i><span>Relay</span>
                          </div>
                          <div className="switch-toggle">
                            <input type="checkbox" id="bluetooth5" onChange={() => {handleDevice('pumpDistance',bombinh)}} checked={bombinh === 1} />
                            <label htmlFor="bluetooth5"></label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>


        </div>}
    </>
  );
}

export default App;

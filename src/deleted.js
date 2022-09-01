/* 
.heroBtn {
    animation: fadeIn 1s 1 ease-in;
    font-size: 1.1rem;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    display: -webkit-inline-box;
    display: -moz-inline-box;
    display: inline-box;
    display: -webkit-inline-flex;
    display: -moz-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    margin-top: 10px;
}
.heroBtn > div {
    position: relative;
    width: 160px;
    height: 50px;
    -webkit-perspective: 1000px;
    -moz-perspective: 1000px;
    perspective: 1000px;
}
.heroBtn > div > a {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: translateZ(-25px);
    -moz-transform: translateZ(-25px);
    -ms-transform: translateZ(-25px);
    -o-transform: translateZ(-25px);
    transform: translateZ(-25px);
    -webkit-transition: -webkit-transform 0.25s;
    -moz-transition: -moz-transform 0.25s;
    transition: transform 0.25s;
}
.heroBtn > div > a::before, 
.heroBtn > div > a::after {
    background-color: #000;
    justify-content: center;
    align-items: center;
    margin: 0;
    width: 160px;
    height: 50px;
    position: absolute;
    border: 2px solid rgb(61, 135, 255);
    box-sizing: border-box;
    content: attr(title);
    display: -webkit-box;
    display: -moz-box;
    display: box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    border-radius: 2px;
}
.heroBtn > div > a::before {
    border: 2px solid rgb(61, 135, 255);
    color: rgb(61, 135, 255);

    -webkit-transform: rotateY(0deg) translateZ(25px);
    -moz-transform: rotateY(0deg) translateZ(25px);
    -ms-transform: rotateY(0deg) translateZ(25px);
    -o-transform: rotateY(0deg) translateZ(25px);
    transform: rotateY(0deg) translateZ(25px);
}
.heroBtn > div > a::after {
    color: #CC2DD7;
    border: 2px solid #CC2DD7;
    -webkit-transform: rotateX(90deg) translateZ(25px);
    -moz-transform: rotateX(90deg) translateZ(25px);
    -ms-transform: rotateX(90deg) translateZ(25px);
    -o-transform: rotateX(90deg) translateZ(25px);
    transform: rotateX(90deg) translateZ(25px);
}
.heroBtn > div > a:hover {
    -webkit-transform: translateZ(-25px) rotateX(-90deg);
    -moz-transform: translateZ(-25px) rotateX(-90deg);
    -ms-transform: translateZ(-25px) rotateX(-90deg);
    -o-transform: translateZ(-25px) rotateX(-90deg);
    transform: translateZ(-25px) rotateX(-90deg);
    cursor: pointer; 
} */


/* .startLessonBtn {
  position: absolute;
  z-index: 3;
  font-size: 1.1rem;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  display: -webkit-inline-box;
  display: -moz-inline-box;
  display: inline-box;
  display: -webkit-inline-flex;
  display: -moz-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
} */
/* .startLessonBtn > div {
  position: relative;
  width: 180px;
  height: 55px;
  margin: 0 15px;
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  perspective: 1000px;
}
.startLessonBtn > div > a {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: translateZ(-25px);
  -moz-transform: translateZ(-25px);
  -ms-transform: translateZ(-25px);
  -o-transform: translateZ(-25px);
  transform: translateZ(-25px);
  -webkit-transition: -webkit-transform 0.25s;
  -moz-transition: -moz-transform 0.25s;
  transition: transform 0.25s;
}
.startLessonBtn > div > a::before, .startLessonBtn > div > a::after {
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 180px;
  height: 55px;
  position: absolute;
  box-sizing: border-box;
  content: attr(title);
  display: -webkit-box;
  display: -moz-box;
  display: box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
  border-radius: 2px;
}


.startLessonBtn > div > a::before {
  border: 2px solid rgb(255, 255, 255);
  background-color: #000;
  color: 2px solid rgb(255, 255, 255);
  -webkit-transform: rotateY(0deg) translateZ(25px);
  -moz-transform: rotateY(0deg) translateZ(25px);
  -ms-transform: rotateY(0deg) translateZ(25px);
  -o-transform: rotateY(0deg) translateZ(25px);
  transform: rotateY(0deg) translateZ(25px);
}
.startLessonBtn > div > a::after {
  background-color: black;
  border: 2px solid #f07167;
  color: #f07167;
  -webkit-transform: rotateX(90deg) translateZ(25px);
  -moz-transform: rotateX(90deg) translateZ(25px);
  -ms-transform: rotateX(90deg) translateZ(25px);
  -o-transform: rotateX(90deg) translateZ(25px);
  transform: rotateX(90deg) translateZ(25px);
}
.startLessonBtn > div > a:hover {
  -webkit-transform: translateZ(-25px) rotateX(-90deg);
  -moz-transform: translateZ(-25px) rotateX(-90deg);
  -ms-transform: translateZ(-25px) rotateX(-90deg);
  -o-transform: translateZ(-25px) rotateX(-90deg);
  transform: translateZ(-25px) rotateX(-90deg);
  cursor: pointer; 
} */

import React from 'react';

const UnderConstruction = () => {
  return (
    <div class="container">
      <div class="box">
        <div className="title">
          <h3><a href="http://www.seekadesign.com">Seek-A-Design.com</a> is currently...</h3>
        </div>
        <div class="animation">
         <div class="one spin-one"></div>
         <div class="two spin-two"></div>
         <div class="three spin-one"></div>
        </div>
      <h1>Under maintenance</h1>
      <br />
      <p>The engineers are building our new web site right now!</p>
      <br />
      <p>Please feel free to reach out to <a href="mailto:seekadesign@gmail.com">SeekADesign@gmail.com</a> for immediate assistance.</p>
      </div>
    </div>
  );
};

export default UnderConstruction;
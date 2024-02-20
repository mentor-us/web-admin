import React from "react";
import { PropTypes } from "prop-types";

import "../../styles.css";

function Instruction({ isReverse, title, category, description, subDescription, img, imgWidth }) {
  return (
    <section className="section instruction" id="instruction">
      <div
        className="instruction__img animate__animated animate__fadeInUp animate__slow animate__delay-2s"
        style={isReverse ? { order: 2, marginLeft: "4rem" } : { order: 1, marginRight: "4rem" }}
      >
        {imgWidth ? (
          <img src={img} alt="mentorus-img" style={{ width: imgWidth }} />
        ) : (
          <img src={img} alt="mentorus-img" />
        )}
      </div>
      <div
        className="instruction__text animate__animated animate__fadeInDown animate__slow animate__delay-2s"
        style={isReverse ? { order: 1 } : { order: 2 }}
      >
        <h2>{category}</h2>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{subDescription}</p>
      </div>
    </section>
  );
}

Instruction.defaultProps = {
  isReverse: false,
  subDescription: "",
  imgWidth: false
};

Instruction.propTypes = {
  isReverse: PropTypes.bool,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,

  description: PropTypes.string.isRequired,
  subDescription: PropTypes.string,
  img: PropTypes.string.isRequired,
  imgWidth: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default Instruction;

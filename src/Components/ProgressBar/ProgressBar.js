import React, {useState, useLayoutEffect, useEffect} from 'react';
import { motion, useMotionValue, useTransform, motionValue, transform } from 'framer-motion';

function round_to_precision(x, precision) {
  var y = +x + (precision === undefined ? 0.5 : precision/2);
  return y - (y % (precision === undefined ? 1 : +precision));
}
const variants = {
  10: { opacity: .5 },
  20: {opacity: 1}
}

const ProgressBar = (props) => {
 const itemCount = props.itemCount;
 const completedCount = props.completedCount;
 const ratio = round_to_precision(completedCount / itemCount, .01)*100;
  const output = transform(ratio, [0, 25, 50,75, 100], ["red", "orange", "yellow", "green", "blue" ])
  console.log({output});
  return (
    <motion.div
      style={{
        color: output}}
    >
      {ratio}%
    </motion.div>
  )
}
export default ProgressBar;
import { useState } from 'react';
import Line from './Line';
function InputWithLine({ component, lineStyles }) {
  const [show, setShow] = useState(false);
  const onFocus = () => {
    setShow(true);
  };
  const onBlur = () => {
    setShow(false);
  };
  return (
    <>
      {component({ onFocus, onBlur })}
      <Line show={show} style={lineStyles} />
    </>
  );
}

export default InputWithLine;

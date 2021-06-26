import styles from './DropDown.module.scss';
import { useEffect, useState, useRef } from 'react';
import LightButton from '../buttons/LightButton';
import { largestCommonCharacters, revertObj } from '../../helpers/utils';
function DropDown({
  options,
  setOption,
  selectedOption,
  methodBeforeDisplay = (val) => val,
  optionsStyle = {},
  type = 'dropDown',
}) {
  const [dropDownActive, setDropdownActive] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [sortedOptions, setSortedOptions] = useState(options);
  const optionsRef = useRef();
  useEffect(() => {
    window.addEventListener('click', () => {
      // console.log('window clicked');
      setDropdownActive(false);
    });
  }, []);
  useEffect(() => {
    const optionScoreMap = {};
    for (let option of sortedOptions) {
      const optionString = methodBeforeDisplay(option);
      optionScoreMap[optionString] = largestCommonCharacters(
        optionString,
        textInput
      );
    }
    // console.log(optionScoreMap);
    // const revertedMap = revertObj(optionScoreMap);
    // const counts = Object.keys(revertedMap);
    // counts.sort((a, b) => b - a);
    // setSortedOptions(() => {
    //   const arr = [];
    //   for (let v in counts) {
    //     arr.push(revertedMap.push);
    //   }
    // });
  }, [textInput]);
  const inputKeyDown = (e) => {};
  return (
    <div className={styles.container}>
      {type === 'dropDown' ? (
        <LightButton
          hovered={dropDownActive}
          onClick={(e) => {
            // console.log('button clicked');
            e.stopPropagation();
            setDropdownActive(!dropDownActive);
          }}
        >
          <div className={styles.selector}>
            <span className={styles.typeText}>
              {methodBeforeDisplay(selectedOption)}
            </span>
            <span
              class="material-icons-outlined"
              style={{
                transform: `translateX(7px)`,
              }}
            >
              arrow_drop_down
            </span>
          </div>
        </LightButton>
      ) : (
        <div className={styles.textInput}>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={inputKeyDown}
            onClick={(e) => {
              e.stopPropagation();
              console.log('clicked');
              setDropdownActive(true);
            }}
          ></input>
        </div>
      )}
      {dropDownActive && (
        <div className={styles.options} style={optionsStyle} ref={optionsRef}>
          {sortedOptions.map((option, i) => (
            <p
              key={i}
              className={styles.option}
              onClick={(e) => {
                // console.log('option clicked');
                e.stopPropagation();
                setTextInput(methodBeforeDisplay(option));
                setDropdownActive(false);
                setOption(option);
              }}
            >
              {methodBeforeDisplay(option)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;

import styles from './DropDown.module.scss';
import { useEffect, useState, useRef } from 'react';
import LightButton from '../buttons/LightButton';
import { largestCommonCharacters } from '../../helpers/utils';
import InputWithLine from './InputWithLine';
function DropDown({
  options,
  setOption,
  selectedOption,
  methodBeforeDisplay = (val) => val,
  optionsStyle = {},
  type = 'dropDown',
  maxOptionsToShow = options.length,
  addLineBelowInput = false,
}) {
  const [dropDownActive, setDropdownActive] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [sortedOptions, setSortedOptions] = useState(options);
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const optionsRef = useRef();
  useEffect(() => {
    const clickCallBack = () => {
      // console.log('window clicked');
      setDropdownActive(false);
    };
    window.addEventListener('click', clickCallBack);
    const keyDownCallBack = (e) => {
      setDropdownActive((dropDownActive) => {
        if (dropDownActive) {
          // console.log(e);
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            // console.log('arrow down');
            setHoveredIdx((hoveredIdx) => {
              const nextHoverIdx = hoveredIdx + 1;
              if (nextHoverIdx < sortedOptions.length) {
                return nextHoverIdx;
              } else {
                return 0;
              }
            });
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHoveredIdx((hoveredIdx) => {
              const prevHoverIdx = hoveredIdx - 1;
              if (prevHoverIdx >= 0) {
                return prevHoverIdx;
              } else {
                return sortedOptions.length - 1;
              }
            });
          } else if (e.key === 'Enter') {
            e.preventDefault();
            setHoveredIdx((hoveredIdx) => {
              setSortedOptions((sortedOptions) => {
                const option = sortedOptions[hoveredIdx];
                setTextInput(methodBeforeDisplay(option));
                setDropdownActive(false);
                setOption(option);
                return sortedOptions;
              });

              return hoveredIdx;
            });
          } else if (e.key === 'Escape') {
            e.preventDefault();
            setDropdownActive(false);
          }
        }
        return dropDownActive;
      });
    };
    window.addEventListener('keydown', keyDownCallBack);
    return () => {
      window.removeEventListener('click', clickCallBack);
      window.removeEventListener('keydown', keyDownCallBack);
    };
  }, []);
  useEffect(() => {
    if (type === 'text') {
      const optionScoreMap = new Map();
      for (let option of sortedOptions) {
        optionScoreMap.set(
          option,
          largestCommonCharacters(methodBeforeDisplay(option), textInput)
        );
      }
      // console.log(optionScoreMap);
      // console.log(optionScoreMap.entries());
      const arr = [...optionScoreMap.entries()];
      arr.sort((a, b) => b[1] - a[1]);
      // console.log(arr);
      setSortedOptions(arr.map((v) => v[0]));
    }
  }, [textInput]);
  const inputComponent = (handlers = {}) => {
    return (
      <input
        type="text"
        value={textInput}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            if (!dropDownActive) {
              e.preventDefault();
              setDropdownActive(true);
              setHoveredIdx(0);
              e.stopPropagation();
            }
          }
        }}
        onChange={(e) => {
          setTextInput(e.target.value);
          setDropdownActive(true);
          setHoveredIdx(0);
        }}
        onClick={(e) => {
          e.stopPropagation();
          // console.log('clicked');
          setDropdownActive(true);
        }}
        {...handlers}
      ></input>
    );
  };
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
          {addLineBelowInput ? (
            <InputWithLine component={(handlers) => inputComponent(handlers)} />
          ) : (
            inputComponent()
          )}
        </div>
      )}
      {dropDownActive && (
        <div className={styles.options} style={optionsStyle} ref={optionsRef}>
          {sortedOptions.map(
            (option, i) =>
              i < maxOptionsToShow && (
                <p
                  key={i}
                  className={[
                    styles.option,
                    hoveredIdx === i ? styles.hovered : '',
                  ].join(' ')}
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
              )
          )}
        </div>
      )}
    </div>
  );
}

export default DropDown;

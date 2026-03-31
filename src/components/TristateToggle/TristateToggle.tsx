import * as React from 'react';
import { type TogglePositions } from './TristateToggleTypes';
import './TristateToggle.css';

type Props = {
  id?: string;
  onToggleStateChange: (state: TogglePositions) => void;
  labels?: { 
    left?: string | React.ReactElement | undefined;
    center?: string | React.ReactElement | undefined;
    right?: string | React.ReactElement | undefined;
  },
  onClick?: React.MouseEventHandler<HTMLSpanElement>; 
  togglePosition?: TogglePositions;
  disabled?: boolean;
};

export function TristateToggle({id, labels, onToggleStateChange, onClick, togglePosition, disabled}: Props) {
  const currentPosition = React.useMemo<TogglePositions>(() => { return togglePosition ?? 'center'; }, [togglePosition]);
  const [toggleAnimationCss, setToggleAnimationCss] = React.useState<string>('');

  const toggleStateChangeCallback = React.useCallback((state: TogglePositions) => {
    onToggleStateChange(state)
  }, [onToggleStateChange]);

  React.useEffect(() => {
    setToggleAnimationCss(`to-${currentPosition}`);
  }, [currentPosition]);


  function onClickState(state: TogglePositions) {
    if (disabled) return;
    toggleStateChangeCallback(state);
  }

  function getToggleSegment(state: TogglePositions) {
    const displayLabelText = (labels != null) ? (labels[state]) : null;
    return (<label className={`${id}-${state}-label`} onClick={onClickState.bind(null, state)}>{displayLabelText}</label>);
  }
  
  return (<>
    <span onClick={onClick} id={id} className={`tristate-toggle-container ${disabled?'disabled':''}`}>
      {getToggleSegment('left')}
      {getToggleSegment('center')}
      {getToggleSegment('right')}
      <span id={`${id}-back`} className={'tristate-backing'} />
      <div id={`${id}-switch`} className={`tristate-switch ${toggleAnimationCss}`} />
    </span>
  </>);
}
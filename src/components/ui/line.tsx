import React from 'react'
import styled from 'styled-components'

interface LineProps {
  direction?: 'horizontal' | 'vertical'
  width?: string
  height?: string
}

const Linemaker: React.FC<LineProps> = ({
  direction = 'horizontal',
  width = '164em',
  height = '4em',
}) => {
  return (
    <StyledWrapper
      direction={direction}
      customWidth={width}
      customHeight={height}
    >
      <div className="loader">
        <div />
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div<{
  direction?: 'horizontal' | 'vertical'
  customWidth?: string
  customHeight?: string
}>`
  .loader {
    width: ${(props) =>
      props.direction === 'vertical' ? '6px' : props.customWidth};
    height: ${(props) =>
      props.direction === 'vertical' ? props.customHeight : '6px'};
    border-radius: 8px;
    background-color: #f0f0f0;
  }

  .loader div {
    height: 100%;
    width: 100%;
    border-radius: 8px;
    background-color: #e4ae0b;
    animation: ${(props) =>
        props.direction === 'vertical' ? 'height7435' : 'width7435'}
      5s linear infinite;
    transition: all;
    transform-origin: ${(props) =>
      props.direction === 'vertical' ? 'top' : 'left'};
  }

  @keyframes width7435 {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }

  @keyframes height7435 {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }
`

export default Linemaker

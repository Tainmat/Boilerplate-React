import styled, { css } from 'styled-components'

import { rgba } from 'polished'

import { animated } from 'react-spring'

import { IToastType } from 'contexts/Toast/Toast.interface'

interface Props {
  type: IToastType
}

export const Container = styled(animated.div)<Props>`
  ${props => css`
    backdrop-filter: blur(${props.theme.background.blur.level.two});
    background-color: ${rgba(
      props.theme.colors.neutral.low.pure,
      props.theme.opacity.level.intense
    )};
    border-radius: ${props.theme.border.radius.md};
    box-shadow: ${props.theme.shadow.level.one};

    display: flex;

    position: relative;
    padding: 1rem;

    width: 420px;

    & + div {
      margin-top: 0.5rem;
    }

    .icon {
      border-radius: ${props.theme.border.radius.circular};
      font-size: 1.5rem;

      display: flex;
      align-items: center;
      justify-content: center;

      margin-right: 1rem;

      height: 2.5rem;
      width: 2.5rem;

      ${props.type === 'success' &&
      css`
        background-color: ${props.theme.colors.feedback.success.light};

        > span {
          color: ${props.theme.colors.feedback.success.medium};
        }
      `}

      ${props.type === 'helper' &&
      css`
        background-color: ${props.theme.colors.feedback.helper.light};

        > span {
          color: ${props.theme.colors.feedback.helper.medium};
        }
      `}

      ${props.type === 'warning' &&
      css`
        background-color: ${props.theme.colors.feedback.warning.light};

        > span {
          color: ${props.theme.colors.feedback.warning.medium};
        }
      `}
    }

    .text {
      flex: 1;

      .heading {
        display: flex;
        align-items: center;
        height: 2.5rem;
      }
    }

    .close {
      position: absolute;
      top: 1rem;
      right: 1rem;

      button {
        span {
          color: ${props.theme.colors.neutral.high.pure};
        }
      }
    }
  `}
`

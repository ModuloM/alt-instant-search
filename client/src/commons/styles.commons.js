import { css } from 'styled-components';

// media query mixin
const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 480
}
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `
  return acc
}, {})

///////////////
// variables //
///////////////

// colors
export const colorPrimary1 = 'rgba(29, 234, 102, 0.69)';
export const colorPrimary2 = '#10987c';
export const colorPrimary3 = '#3DE6C4';
export const colorPrimary4 = '#0d7e6a';
export const colorPrimary5 = '#859491';

export const colorSecondary1 = '#D4D4D4';
export const colorSecondary2 = '#FDFDFD';

export const colorTernary1 = '#11c3f9';
export const colorTernary2 = '#10a4d2';

export const colorQuaternary1 = '#fed800';

// spacings
export const spacingDefault = '1rem';

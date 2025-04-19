import { styled } from '@mui/material';

export const Root = styled('div')({
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Loader = styled('svg')`
  & path:nth-child(1) {
    opacity: 0;
    transform: scale(1.4);
    fill: transparent;
    transition:
      opacity 0.5s ease 0s,
      transform 0.5s ease 0s,
      fill 0.5s ease 0.3s;
  }

  &.active path:nth-child(1) {
    opacity: 1;
    transform: scale(1);
    fill: rgb(25, 160, 252);
  }

  & path:nth-child(2) {
    stroke-dashoffset: 172px;
    stroke-dasharray: 172px;
    fill: transparent;
    -webkit-transition:
      stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.12s,
      fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.9s;
    transition:
      stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.12s,
      fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.9s;
  }

  &.active path:nth-child(2) {
    stroke-dashoffset: 0;
    fill: rgb(59, 179, 255);
  }

  & path:nth-child(3) {
    stroke-dashoffset: 172px;
    stroke-dasharray: 172px;
    fill: transparent;
    -webkit-transition:
      stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.24s,
      fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1s;
    transition:
      stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.24s,
      fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1s;
  }

  &.active path:nth-child(3) {
    stroke-dashoffset: 0;
    fill: rgb(20, 126, 244);
  }

  & path:nth-child(4) {
    stroke-dashoffset: 248px;
    stroke-dasharray: 248px;
    -webkit-transition:
      stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.36s,
      fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1.1s;
    transition:
      stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.36s,
      fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1.1s;
  }

  &.active path:nth-child(4) {
    stroke-dashoffset: 0;
  }

  & path:nth-child(5) {
    stroke-dashoffset: 78px;
    stroke-dasharray: 78px;
    -webkit-transition:
      stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.48s,
      fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1.2000000000000002s;
    transition:
      stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.48s,
      fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1.2000000000000002s;
  }

  &.active path:nth-child(5) {
    stroke-dashoffset: 0;
  }

  & path:nth-child(6) {
    stroke-dashoffset: 49px;
    stroke-dasharray: 49px;
    -webkit-transition:
      stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.6s,
      fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1.3s;
    transition:
      stroke-dashoffset 1s cubic-bezier(0.47, 0, 0.745, 0.715) 0.6s,
      fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1.3s;
  }

  &.active path:nth-child(6) {
    stroke-dashoffset: 0;
  }
`;

// ----------------------------------------------------------------------

export default function Tooltip(theme) {
  // const isLight = theme.palette.mode === 'light';

  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.common.white,
          color: theme.palette.common.black,
        },
        arrow: {
          color: theme.palette.common.black,
        },
      },
    },
  };
}

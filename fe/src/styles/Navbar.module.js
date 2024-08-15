export const appBarStyle = (theme) => ({
  boxShadow: 0,
  bgcolor: 'transparent',
  backgroundImage: 'none',
  mt: 2,
});

export const toolbarStyle = (theme) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: '999px',
  bgcolor:
    theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, 0.4)'
      : 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(24px)',
  maxHeight: 40,
  border: '1px solid',
  borderColor: 'divider',
  boxShadow:
    theme.palette.mode === 'light'
      ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
      : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
});

export const boxStyle = {
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  ml: '-18px',
  px: 0,
};

export const logoStyle = {
  width: '50px',
  height: 'auto',
  cursor: 'pointer',
};

export const menuStyle = {
  display: { xs: 'none', md: 'flex' },
};

export const profileBoxStyle = {
  display: { xs: 'none', md: 'flex' },
  gap: 0.5,
  alignItems: 'center',
};

export const drawerBoxStyle = {
  display: { xs: 'flex', md: 'none' },
  maxWidth: '150px',
};

export const drawerContentStyle = (isSmallScreen) => ({
  minWidth: isSmallScreen ? '80vw' : '60vw',
  p: 2,
  backgroundColor: 'background.paper',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
});

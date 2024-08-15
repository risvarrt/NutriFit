import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';

export default function Footer() {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        maxWidth: 'lg',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            gap: { xs: 2, sm: 4 },
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              textAlign: 'center',
            }}
          >
            <Link component={RouterLink} to="/Aboutus" color="text.secondary">
              About Us
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              textAlign: 'center',
            }}
          >
            <Link component={RouterLink} to="/contact" color="text.secondary">
              Contact Us
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              textAlign: 'center',
            }}
          >
            <Link component={RouterLink} to="/faq" color="text.secondary">
              FAQs
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              textAlign: 'center',
            }}
          >
            <Link color="text.secondary" href="#">
              Privacy Policy
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              justifyContent: 'center',
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              spacing={1}
              useFlexGap
              sx={{
                color: 'text.secondary',
              }}
            >
              <IconButton
                color="inherit"
                href="https://github.com/mui"
                aria-label="GitHub"
                sx={{ alignSelf: 'center' }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://x.com/MaterialUI"
                aria-label="X"
                sx={{ alignSelf: 'center' }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://www.linkedin.com/company/mui/"
                aria-label="LinkedIn"
                sx={{ alignSelf: 'center' }}
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

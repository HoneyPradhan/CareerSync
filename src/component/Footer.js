import { Box ,Typography} from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
const Footer = () => {
    const { palette } = useTheme();
    return (
        <>
            <Box sx={{
                height: '70px',
                bgcolor: palette.secondary.main,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
 

<Box sx={{ textAlign: 'center' ,color: palette.secondary.midNightBlue}}>
<Typography variant="body2">
                <span>© Honey Pradhan | 2024</span>
            </Typography>
            
            <Typography variant="body2" sx={{ mt: 1 }}>
                <a href="mailto:honeypradhan10339@gmail.com"  style={{ color: 'inherit', textDecoration: 'none', marginRight: '10px' }}>
                    <MailOutlineIcon></MailOutlineIcon>
                </a>
                <a href="https://www.linkedin.com/in/honey-pradhan-806678236/" style={{ color: 'inherit', textDecoration: 'none', marginRight: '10px' }}>
                    <LinkedInIcon />
                </a>
                <a href="https://github.com/HoneyPradhan" style={{ color: 'inherit', textDecoration: 'none', marginRight: '10px' }}>
                    <GitHubIcon />
                </a>
                <a href="https://twitter.com/honey_pradhan17" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <TwitterIcon />
                </a>
            </Typography>
</Box>

            </Box>
        </>
    )
}

export default Footer
import React from 'react'
import {AppBar,Toolbar,IconButton,Badge,MenuItem,Menu,Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons' 
import logo from '../../assets/logo.png'
import useStyles from './styles'
import {Link,useLocation} from 'react-router-dom'

const Navbar = ({totalItems}) => {
    const classes=useStyles();
    const location=useLocation()
    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" color="inherit" className={classes.link}>
                    <img src={logo} alt="logo" height="25px" className={classes.image} />
                        MouShop
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.button}>
                        {location.pathname==="/" && (
                    <IconButton component={Link} to="/cart" aria-label="show cart items"color="inherit">
                        <Badge badgeContent={totalItems} color="error">
                            <ShoppingCart/>
                        </Badge>
                    </IconButton>)}
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar

import React from 'react'
import {AppBar,Toolbar,IconButton,Badge,MenuItem,Menu,Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons' 
import logo from '../../assets/logo.png'
import useStyles from './styles'
const Navbar = ({totalItems}) => {
    const classes=useStyles();
    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                    <img src={logo} alt="logo" height="25px" className={classes.image} />
                        MouShop
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.button}>
                    <IconButton aria-label="show cart items"color="inherit">
                        <Badge badgeContent={totalItems} color="error">
                            <ShoppingCart/>
                        </Badge>
                    </IconButton>
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar

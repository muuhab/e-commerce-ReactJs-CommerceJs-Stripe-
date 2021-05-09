import React from 'react'
import {Container,Typography,Button,Grid} from '@material-ui/core'
import useStyles from './styles'
import CartItem from './CartItem/CartItem'

const Cart = ({cart}) => {
    const classes=useStyles()
    const EmptyCart=()=>{
        return <Typography variant="subtitle1" >You have no items in the cart</Typography>
    }
    const FilledCart=()=>{
        return <>
        <Grid container spacing={3}>
            {cart.line_items.map((item)=>(
                <Grid item xs={12} sm={4} key={item.id}>
                    <CartItem item={item}></CartItem>
                </Grid>
            ))}
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant="h4">
                Subtotal:{cart.subtotal.formatted_with_symbol}
            </Typography>
            <Button variant="contained" size="large" color="secondary" type="button" className={classes.emptyButton}>Empty Cart</Button>
            <Button variant="contained" size="large" color="primary" type="button" className={classes.checkoutButton}>Checkout</Button>
        </div>
        </>
    }

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3" gutterBottom >
                Your Shopping Cart 
            </Typography>
            {!cart.line_items.length? <EmptyCart/>:<FilledCart/>}
        </Container>
    )
}

export default Cart

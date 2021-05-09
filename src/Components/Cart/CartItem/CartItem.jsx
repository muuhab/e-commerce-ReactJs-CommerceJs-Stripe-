import React from 'react'
import {Typography,Button,Card,CardActions,CardContent,CardMedia} from '@material-ui/core'
import useStyles from './styles'

const CartItem = ({item}) => {
    const classes=useStyles()
    return (
        <Card>
           <CardMedia className={classes.media} image={item.media.source} alt={item.name} /> 
           <CardContent className={classes.cardContent}>
               <Typography variant="h4">{item.name}</Typography>
               <Typography variant="h4">{item.line_total.formated_with_symbol}</Typography>
           </CardContent>
           <CardActions className={classes.cartActions}>
               <div className={classes.buttons}>
                   <Button tpye="button" size="small">-</Button>
                   <Typography>{item.quantity}</Typography>
                   <Button tpye="button" size="small">+</Button>
               </div>
               <Button variant="contained" color="secondary" type="button">Remove</Button>
           </CardActions>
        </Card>
    )
}

export default CartItem

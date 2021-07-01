import React from 'react'
import {Typography,Button,Divider} from '@material-ui/core'
import {Elements,CardElement,ElementsConsumer} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import Review from './Review'

const PaymentForm = ({checkoutToken,back}) => {
    const stripePromise= loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
    return (
        <>
            <Review checkoutToken={checkoutToken}/>
            <Divider/>
            <Typography variant="h6" gutterBottom style={{margin:'20px 0'}} >Payment method</Typography>
            <Elements stripe={stripePromise} >
                <ElementsConsumer>
                    {({elements,stripe})=>(
                        <form>
                            <CardElement/>
                            <br /><br />
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <Button variant="outlined" onClick={back}>Back</Button>
                                <Button disable={!stripe} variant="contained" color="primary" type="submit" >Pay {checkoutToken.live.subtotal.formatted_with_symbol}</Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm

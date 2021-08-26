import React from 'react'
import { Typography, Button, Divider,CssBaseline } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import Review from './Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({ shippingDetails, checkoutToken, back, onCaptureCheckout, nextStep }) => {

    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

        if (error) {
            console.log('[error]', error);
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: { firstname: shippingDetails.firstName, lastname: shippingDetails.lastName, email: shippingDetails.email },
                shipping: { name: 'International', street: shippingDetails.address1, town_city: shippingDetails.city, county_state: shippingDetails.shippingSubdivision, postal_zip_code: shippingDetails.zip, country: shippingDetails.shippingCountry },
                fulfillment: { shipping_method: shippingDetails.shippingOption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            };

            onCaptureCheckout(checkoutToken.id, orderData);
            nextStep();
        }
    }

    return (
        <>
        <CssBaseline/>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }} >Payment method</Typography>
            <Elements stripe={stripePromise} >
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <br /><br />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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

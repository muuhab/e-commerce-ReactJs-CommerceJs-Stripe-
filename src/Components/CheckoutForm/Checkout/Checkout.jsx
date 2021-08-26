import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core'
import useStyles from './styles'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import { commerce } from '../../../lib/commerce'
import { Link,useHistory  } from 'react-router-dom'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingDetails, setShippingDetails] = useState({})
    const history = useHistory();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                console.log(token);
                setCheckoutToken(token)
            }
            catch (error) {
                if (activeStep !== steps.length) history.push('/');

            }
        }
        generateToken()
    }, [cart])
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const prevStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)


    const next = (data) => {
        setShippingDetails(data)
        nextStep()
    }

    let Confirmation = () => (order.customer ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));
    
      if (error) {
        Confirmation = () => (
          <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
        );
      }

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm shippingDetails={shippingDetails} checkoutToken={checkoutToken} nextStep={nextStep} back={prevStep} onCaptureCheckout={onCaptureCheckout} />

    return (
        <>
        {/* <CssBaseline/> */}
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.Stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
